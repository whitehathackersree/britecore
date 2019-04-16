import itertools
from django.utils.crypto import get_random_string
from string import ascii_lowercase, digits
from .settings import OTP_LENGTH, REFERRAL_CODE_LENGTH, USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH
from .models import *
from .tasks import task_send_confirmation_mail, task_send_welcome_mail
from django.utils.text import slugify
secret_chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)'
chars = ascii_lowercase
referral_chars =  ascii_lowercase + digits
otp_chars = digits

def get_secret_key():
    """
    Return a 50 character random string usable as a SECRET_KEY setting value.
    """
    return get_random_string(50, secret_chars)

def generate_username():
    from app.models import User
    usernames = User.objects.values_list('username', flat=True)
    while True:
        value = get_random_string(USERNAME_MAX_LENGTH, digits)
        if value not in usernames:
            return value

def action_after_new_user_save(user_id):
    user=User.objects.get(pk=user_id)

    if not user.username:
        user.username = generate_username()
        user.save()


    if user.email:
        task_send_confirmation_mail.delay(user.id)
        task_send_welcome_mail.delay(user.id)
