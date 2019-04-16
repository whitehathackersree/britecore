from __future__ import absolute_import, unicode_literals
from .mailer import *
from .smser import *
from .models import *
import functools
from django.core.cache import cache
from celery import shared_task
from celery.task import task
from celery.exceptions import SoftTimeLimitExceeded
import random




@shared_task
def task_send_activation_mail(user_id):
    pass#return send_activation_mail(user_id)

@shared_task
def task_send_welcome_mail(user_id):
    pass#return send_welcome_mail(user_id)

@shared_task
def task_send_confirmation_mail(user_id):
    pass#return send_confirmation_mail(user_id)

@shared_task
def task_send_otp_sms(phone_number, code):
	message = code+" is your OTP for bidbuzz India. Please do not share your OTP with anyone. https://bidbuzz.in"
	return sendSMS(phone_number, message)

@shared_task
def task_send_transaction_sms(transaction_id):
    from app.models import Transaction
    t = Transaction.objects.get(pk=transaction_id)
    message = "Order Reference: #"+str(t.id)+". The payment of Rs."+str(t.amount)+" was successful with payment id: "+t.payment_id+". Thankyou for being with us."
    return sendSMS(t.user.phone_number, message)

@shared_task
def task_send_transaction_mail(transaction_id):
    pass#return send_transaction_mail(transaction_id)
