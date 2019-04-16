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

from datetime import timedelta

from django.utils.timezone import get_current_timezone
from datetime import datetime
tz = get_current_timezone()
ds = '2019-02-25T21:00:00'
dt = tz.localize(datetime.strptime(ds, '%Y-%m-%dT%H:%M:%S'))
bids = Bid.objects.all().order_by('start_date_time')
i=0
for bid in bids:
    i=i+1
    bid.start_date_time=dt
    if i%7==0:
        dt = dt+timedelta(hours=22)
    else:
        dt = dt+timedelta(minutes=20)
    bid.save()


print("on")
