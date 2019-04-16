# -*- coding: utf-8 -*-
#from django.test import TestCase

# Create your tests here.

from django.db.models import F
from django.db.models import Count, Sum
from django.contrib.auth.models import Group
from guardian.shortcuts import assign_perm
from api.serializers import *
from app.models import *
from app.choices import *
from django.utils.text import slugify
import itertools
import json
from random import randint
from pprint import pprint
from itertools import islice, groupby

from datetime import datetime
from datetime import timedelta
set_time = datetime.now()

for b in Bid.objects.all():
    if b.id > 150:
        b.delete()
    print(b.id)

"""
users = User.objects.all().exclude(username=None)
items = Item.objects.all()
for i in items:
    set_time = set_time + timedelta(minutes=1)
    b = Bid.objects.create(
        item = i,
        is_active = True,
        start_amount=0,
        disallow_amount=10,
        start_date_time= set_time,
        duration=10,
    )
    for u in users:
        data={
            "user": u.id,
            "bid": b.id,
            "coins": randint(50, 1000)
        }
        serializer = BuzzerPOSTSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)
    print(i)
"""
print("on")
