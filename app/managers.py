from django.contrib.auth.base_user import BaseUserManager
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.template.loader import render_to_string
import random
from django.db.models.aggregates import Count
from random import randint
from django.db import models
from .tokens import account_activation_token

class RandomQuerySet(models.QuerySet):
    def random(self):
        count = self.aggregate(count=Count('id'))['count']
        random_index = randint(0, count - 1)
        return self.all()[random_index]

class UserManager(BaseUserManager):
    use_in_migrations = True

    def get_queryset(self):
        return RandomQuerySet(self.model, using=self._db)  # Important!

    def _create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given username, email and password.
        """
        try:
            validate_email(email)
            valid_email = True
        except ValidationError:
            valid_email = False
        if not valid_email:
            raise ValueError('Valid Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)



class ItemManager(models.Manager):
    use_in_migrations = True
    user_count = 0
    user = None
    user_id_list = None
    title = None
    is_private = None
    def get_or_create(self, user, user_id_list,  title=None, is_private=False):
        user_id_list.append(user.id)
        self.user_id_list = list(set(user_id_list))
        self.user = user
        self.title = title
        self.is_private = is_private
        self.user_count = len(self.user_id_list)
        self.validate_room_users()
        if self.is_private == True and self.user.rooms.filter(users__in=self.user_id_list, is_private=True).exists():
            return self.user.rooms.get(users__in=self.user_id_list, is_private=True)
        return self.create_room()

    def create_room(self):
        room = self.create(title=self.title, is_private=self.is_private)
        room.save()
        room.users.add(*self.user_id_list)
        return room

    def validate_room_users(self):
        from app.models import User
        if self.user_count < 2:
            raise ValueError('A Room must have atleast two users.')
        if self.user_count > 2 and is_private == True:
            raise ValueError('A Room with multiple users must have is_private=False.')

        for usr_id in self.user_id_list:
            if not User.objects.filter(pk=usr_id).exists():
                raise ValueError('Invalid user_ids in the list.')


class BuzzerQuerySet(models.QuerySet):
    def random(self):
        count = self.aggregate(count=Count('id'))['count']
        random_index = randint(0, count - 1)
        return self.all()[random_index]


class BuzzerManager(models.Manager):
    def get_queryset(self):
        return BuzzerQuerySet(self.model, using=self._db)  # Important!

    def random(self):
        count = self.aggregate(count=Count('id'))['count']
        random_index = randint(0, count - 1)
        return self.all()[random_index]
