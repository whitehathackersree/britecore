from rest_framework import serializers
import json
import re
import math
phone_number_regex = re.compile("^[6789]\d{9}$")
from django.utils.translation import ugettext_lazy as _
from django.db import transaction
from django.db.transaction import on_commit
from django.urls import reverse_lazy
from guardian.shortcuts import assign_perm
from decimal import *
from app.models import *
from app.choices import *
from app.tokens import random_string_generator
from app.tasks import task_send_activation_mail, task_send_confirmation_mail
from .custom_fields import Base64ImageField
from app.settings import PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH, BUZZER_MINIMUM_COINS, OTP_LENGTH, OTP_TRIES, OTP_EXPIRY
from django.conf import settings
from django.utils import timezone
import razorpay


class AuthUserSerializer(serializers.ModelSerializer):
    is_authenticated = serializers.BooleanField(default=True)
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'full_name', 'phone_number', 'photo', 'address',
         'is_authenticated', 'email_confirmed', 'profile_photos', 'og_image')

class AuthUserPOSTSerializer(serializers.ModelSerializer):
    is_authenticated = serializers.BooleanField(default=True)
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'full_name', 'phone_number', 'photo', 'address',
         'is_authenticated')


class UserSerializer(serializers.ModelSerializer):
    """province = serializers.CharField(source='province.name')
    country = serializers.CharField(source='country.name')"""
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'full_name', 'city', 'province', 'country',
        'profile_url', 'profile_photos', 'og_image')


class UserDETAILSerializer(serializers.ModelSerializer):
    country = serializers.CharField(source='country.title')
    class Meta:
        model = User
        fields = ('email', 'username', 'full_name',
         'city', 'country', 'profile_photos', 'og_image', 'profile_url')

    """def get_products_won(self, obj):
        return BidSerializer(obj.won_bids, many=True).data"""

class PasswordResetSerializer(serializers.Serializer):
    otp = serializers.CharField(max_length=None, required=True, error_messages={"required": "OTP is required"})
    password = serializers.CharField(max_length=None, required=True,  error_messages={"required": "Password is required"})
    phone_number = serializers.CharField(max_length=None, required=True, error_messages={"required": "Phone Number is required"})


    def validate_otp(self, value):
        if len(value) != OTP_LENGTH :
            raise serializers.ValidationError("OTP is invalid.")
        return value

    def validate_phone_number(self, value):
        pattern = re.compile("^([6789]\d{9})$")
        if not pattern.match(value):
            raise serializers.ValidationError("Phone Number is invalid.")
        if not User.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError("Phone Number is not registered yet.")
        return value

    def validate_password(self, value):
        if len(value)<PASSWORD_MIN_LENGTH :
            raise serializers.ValidationError("password must contain atleast 8 characters..")
        return value

    def validate(self, attrs):
        otp = attrs["otp"]
        phone_number = attrs["phone_number"]
        check_otp(otp, phone_number)
        return attrs


class UserCREATESerializer(serializers.ModelSerializer):
    otp = serializers.CharField(max_length=None, required=True, write_only=True, error_messages={"required": "OTP is required"})
    class Meta:
        model = User
        fields = ('email', 'phone_number', 'otp', 'username', 'password', 'full_name', 'photo', 'address', 'city', 'country')
        extra_kwargs = {
            'email': {"error_messages":{
                "required": "email is required",
                "blank": "email is required",
                "invalid": "email is invalid",
                }
            },
            'phone_number': {"error_messages":{
                "required": "phone no. is required",
                "blank": "phone no. is required",
                "invalid": "phone no. is invalid",
                }
            },
            'otp': {"error_messages":{
                "required": "OTP is required",
                "blank": "OTP is required",
                "invalid": "OTP is invalid",
                }
            },
            'password': {"error_messages":{
                "required": "password is required",
                "blank": "password is required",
                "invalid": "password is invalid",
                }
            }
        }

    def validate_otp(self, value):
        if len(value) != OTP_LENGTH :
            raise serializers.ValidationError("OTP is invalid.")
        return value

    def validate_username(self, value):
        if len(value)!=0 and len(value)<USERNAME_MIN_LENGTH:
            raise serializers.ValidationError("username is invalid. Minimum 5 characters are required..")
        if len(value)!=0 and len(value)>USERNAME_MAX_LENGTH:
            raise serializers.ValidationError("username is invalid. Maximum 12 characters are allowed..")
        return value

    def validate_password(self, value):
        if len(value)<PASSWORD_MIN_LENGTH :
            raise serializers.ValidationError("password must contain atleast 8 characters..")
        return value

    @transaction.atomic
    def create(self, validated_data):
        otp = validated_data.pop("otp")
        phone_number = validated_data["phone_number"]
        q = OTP.objects.filter(phone_number=phone_number)
        #check_otp(otp, phone_number)

        user = super(UserCREATESerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.is_active=True
        user.save()

        return user


class UserUPDATESerializer(serializers.ModelSerializer):
    is_authenticated = serializers.BooleanField(default=True)
    photo = Base64ImageField(
        max_length=None, use_url=True,
    )
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'full_name', 'phone_number', 'photo', 'profile_photos', 'og_image', 'address',
         'coins', 'products_won', 'cart_count', 'products_claimed_count', 'is_authenticated', 'email_confirmed')
        read_only_fields = ('id', 'phone_number', 'profile_photos', 'og_image', 'coins', 'products_won', 'cart_count', 'products_claimed_count', 'is_authenticated', 'email_confirmed')

    def validate_username(self, value):
        if len(value)<=USERNAME_MIN_LENGTH:
            raise serializers.ValidationError("username is invalid. Minimum 5 characters are required..")
        if len(value)!=0 and len(value)>USERNAME_MAX_LENGTH:
            raise serializers.ValidationError("username is invalid. Maximum 12 characters are allowed..")
        return value

    @transaction.atomic
    def update(self, instance, validated_data):
        email_updated=False
        username = validated_data.get('username', instance.username)
        email = validated_data.get('email', instance.email)
        if User.objects.filter(username=username).exclude(email=instance.email).exists():
            raise serializers.ValidationError("username is not available")
        if email!=instance.email:
            if User.objects.filter(email=email, email_confirmed=True).exists():
                raise serializers.ValidationError("An account with the given email already exists.")
            else:
                email_updated=True

        instance.__dict__.update(**validated_data)
        instance.save()
        if email_updated:
            on_commit(lambda:task_send_confirmation_mail.delay(instance.id))
        return instance

class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ('id', 'admin', 'username', 'full_name', 'short_name', 'type',
         'short_description', 'website', 'logo', 'logos', 'headquarters', 'founded')
        read_only_fields=('id', 'date_created')

class RiskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Risk
        fields = ('id', 'insurer', 'title', 'description', 'attrs', 'url', 'date_created', 'date_modified')
        read_only_fields=('id', 'date_created')

class RiskLISTSerializer(RiskSerializer):
    class Meta(RiskSerializer.Meta):
        pass

class RiskDETAILSerializer(RiskSerializer):
    class Meta(RiskSerializer.Meta):
        pass

class RiskPOSTSerializer(RiskSerializer):
    class Meta(RiskSerializer.Meta):
        pass

class RiskPUTSerializer(RiskSerializer):
    class Meta(RiskSerializer.Meta):
        pass
