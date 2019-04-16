from __future__ import unicode_literals
import os
import datetime
import random
from itertools import groupby
from operator import attrgetter, itemgetter
from rest_framework.authtoken.models import Token
from django.urls import reverse_lazy
from django.db import models
from django_mysql.models import JSONField, Model
from django.db.models import Sum, Avg, Max, F, Q
from django.db.models.functions import Coalesce
from django.conf import settings
from django.contrib.auth.models import AbstractUser
import json, itertools, jsonfield
from django.core.validators import RegexValidator
from django.utils.text import slugify
from django.utils import timezone
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from sorl.thumbnail import ImageField, get_thumbnail
from decimal import *
from .managers import UserManager, BuzzerManager
from .settings import *
from .choices import *
from .custom import *

class AppModel(Model):
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


def get_default_profile_photo():
    return 'default/profile/'+str(random.randint(1,100))+'.png'

def get_profile_photo_upload_path(instance, filename):
    return os.path.join('images/profile/', timezone.localtime().date().strftime("%Y/%m/%d"), filename)


class User(AppModel,AbstractUser):
    #username = None
    username_regex = RegexValidator(regex=r'^(?=.{5,15}$)[a-zA-Z0-9_.]*$', message="Username is invalid.")
    username = models.CharField(validators=[username_regex], max_length = 255, blank=True, null=True, default=None, unique=True)
    email = models.EmailField(max_length=255, default=None, null=True, blank=True)
    full_name = models.CharField(max_length=255,blank=True, null=True, default=None)
    first_name = models.CharField(max_length=255,blank=True, null=True, default=None)
    middle_name = models.CharField(max_length=255,blank=True, null=True, default=None)
    last_name = models.CharField(max_length=255,blank=True, null=True, default=None)
    gender = models.CharField(max_length=255, choices=GENDER, default=GENDER_MALE)
    father = models.ForeignKey(
		'self',
		related_name='fchildren',
		on_delete = models.SET_NULL,
        blank=True,
        null=True)
    mother = models.ForeignKey(
		'self',
		related_name='mchildren',
		on_delete = models.SET_NULL,
        blank=True,
        null=True)
    photo = ImageField(upload_to=get_profile_photo_upload_path,default=get_default_profile_photo)
    date_of_birth = models.DateField(default=None, blank=True, null=True)
    place_of_birth = models.CharField(max_length=255,default=None, blank=True, null=True)
    date_of_death = models.DateField(default=None, blank=True, null=True)
    place_of_death = models.CharField(max_length=255,default=None, blank=True, null=True)
    phone_regex = RegexValidator(regex=r'^([16789]\d{9}|AnonymousUser)$', message="Mobile No. is invalid.")
    phone_number = models.CharField(validators=[phone_regex], max_length=15, unique=True)
    address = models.TextField(default=None, blank=True, null=True)
    city = models.CharField(max_length=255,blank=True, null=True, default=None)
    province = models.ForeignKey(
        'Province',
        related_name='users',
        default=None,
        blank=True,
        null=True,
        on_delete=models.CASCADE)
    country = models.ForeignKey(
        'Country',
        related_name='users',
        default=None,
        blank=True,
        null=True,
        on_delete=models.CASCADE)
    email_confirmed = models.BooleanField(default=False)
    is_dummy = models.BooleanField(default=False)

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = []
    objects = UserManager()

    @property
    def username_(self):
        return self.id

    @property
    def profile_photos(self):
        return {
            'full_size': self.photo.url,
            '400x400': get_thumbnail(self.photo, '400x400', crop='center', quality=99).url,
            '200x200': get_thumbnail(self.photo, '200x200', crop='center', quality=99).url,
            '100x100': get_thumbnail(self.photo, '100x100', crop='center', quality=99).url,
            '50x50': get_thumbnail(self.photo, '50x50', crop='center', quality=99).url,
            '30x30': get_thumbnail(self.photo, '30x30', crop='center', quality=99).url,
        }

    @property
    def og_image(self):
        return  get_thumbnail(self.photo, '630x1200',padding=True, quality=99).url

    @property
    def profile_url(self):
        return "/ac/"+str(self.username)+"/"

    @property
    def url(self):
        return "/ac/"+str(self.username)+"/"

    def get_absolute_url(self):
        return self.url

    def __str__(self):
        return self.phone_number

class Organization(AppModel):
    admin = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='organizations',
        on_delete=models.CASCADE)
    username = models.CharField(max_length=255, default=None, blank=True, null=True)
    full_name = models.CharField(max_length=255, default=None, blank=True, null=True)
    short_name = models.CharField(max_length=255, default=None, blank=True, null=True)
    type = models.CharField(max_length=255, default=None, blank=True, null=True)
    short_description = models.TextField(default=None, blank=True, null=True)
    website = models.URLField(default=None, blank=True, null=True)
    logo = ImageField(upload_to=get_profile_photo_upload_path,default=get_default_profile_photo)
    headquarters = models.CharField(max_length=255, default=None, blank=True, null=True)
    founded = models.DateField(default=None, blank=True, null=True)

    @property
    def logos(self):
        return {
            'full_size': self.logo.url,
            '400x400': get_thumbnail(self.logo, '400x400', crop='noop', quality=99).url,
            '200x200': get_thumbnail(self.logo, '200x200', crop='noop', quality=99).url,
            '150x150': get_thumbnail(self.logo, '150x150', crop='noop', quality=99).url,
            '100x100': get_thumbnail(self.logo, '100x100', crop='noop', quality=99).url,
            '50x50': get_thumbnail(self.logo, '50x50', crop='noop', quality=99).url,
            '30x30': get_thumbnail(self.logo, '30x30', crop='noop', quality=99).url,
        }

    @property
    def url(self):
        return "/"+self.username+"/"

    def get_absolute_url(self):
        return self.url

    def __str__(self):
        return self.full_name

class Continent(AppModel):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Country(AppModel):
    continent = models.ForeignKey(
        'Continent',
        related_name='countries',
        on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Province(AppModel):
    country = models.ForeignKey(
        'Country',
        related_name='provinces',
        on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Risk(AppModel):
    insurer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='risks',
        on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(default=None, blank=True, null=True)
    attrs = JSONField()

    @property
    def url(self):
        return "/"+self.insurer.username+"/"+self.id+"/"

    def get_absolute_url(self):
        return self.url

    def __str__(self):
        return self.title

class Transaction(AppModel):
    user = models.ForeignKey(
        "User",
        related_name='transactions',
        on_delete=models.CASCADE)
    platform = models.CharField(max_length=255, default="razorpay")
    payment_id = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    status = models.CharField(max_length=255, choices=TRANSACTION_STATUS, default="CREATED")
    method = models.CharField(max_length=255, choices=TRANSACTION_METHOD)
    fee = models.DecimalField(max_digits=15, decimal_places=2)
    amount_refunded = models.DecimalField(max_digits=15, decimal_places=2)
    refund_status = models.CharField(max_length=255, choices=TRANSACTION_REFUND_STATUS, default="NULL", null=True)
    error_code = models.CharField(max_length=255, default=None, blank=True, null=True)
    error_description = models.TextField(default=None, blank=True, null=True)
    notes = models.TextField(default=None, blank=True, null=True)
    test = models.BooleanField(default=False)

class TokenBlackList(AppModel):
    token = models.TextField()
