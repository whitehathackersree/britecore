import itertools
from django.conf import settings
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from django.db import transaction
from django.db.models.signals import pre_save, post_save, pre_delete, post_delete
from django.contrib.auth.models import Group
from guardian.shortcuts import assign_perm
from appsocket.utils import broadcast_data, get_user_room, get_bid_room
from api.serializers import *
from .models import *
from .utils import generate_username, action_after_new_user_save
from .tasks import  task_send_transaction_mail, task_send_transaction_sms
from .choices import *
from asgiref.sync import async_to_sync

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def after_user_save(sender, instance, created, **kwargs):
    if created:
        transaction.on_commit(
            lambda: action_after_new_user_save(instance.id)
        )
