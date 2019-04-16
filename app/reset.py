from app.models import *
from api.serializers import BuzzerPOSTSerializer
from django.conf import settings
from django.db.models import Count, Sum, Q, F
from appsocket.utils import broadcast_data, get_bid_room
from random import randint
from datetime import datetime
from datetime import timedelta
from django.utils import timezone
from app.utils import generate_dummy_user_phone
current_time = datetime.now()


#broadcast_data(group_name=get_bid_room(), data={"sree":"latha"}, event_type="product-won", event="send_notif")
def delete_bids():
    from django.utils import timezone
    global timezone
    from datetime import datetime
    global datetime
    from random import randint
    global randint
    from datetime import timedelta
    global timedelta
    from app.utils import generate_dummy_user_phone
    from api.serializers import BidDataPOSTSerializer, BuzzerPOSTSerializer, BonusCoinsTransactionSerializer
    global delete_winner_data, randint, timedelta, datetime, BidDataPOSTSerializer, BuzzerPOSTSerializer, BonusCoinsTransactionSerializer
    from app.models import Item, Bid, BidData, User, WinnerData, Buzzer, CoinsTransaction, BonusCoinsTransaction, Transaction
    global Item, Bid, BidData, User, Buzzer, CoinsTransaction, WinnerData, BonusCoinsTransaction, Transaction
    Bid.objects.all().delete()

def create_bids():
    items = Item.objects.all()
    for item in items[:2]:
        Bid.objects.create(
            item=item,
            is_active=True,
            start_amount=0,
            disallow_amount=100,
            start_date_time=timezone.localtime()+timedelta(seconds=60),
            minimum_buzzer_coins=5,
        )

def delete_users():
    users=User.objects.all().exclude(pk__in=[2,17])
    users.delete()

def create_users(n):
    from app.utils import generate_dummy_user_phone
    for i in range(0,n):
        ph = generate_dummy_user_phone()
        User.objects.create(
            phone_number="1"+str(ph),
            password="1"+str(ph),
            is_dummy=True,
        )

def delete_buzzers():
    Buzzer.objects.all().delete()

def delete_winner_data():
    WinnerData.objects.all().delete()

def reset_bids():
    bids = Bid.objects.all()
    for bid in bids:
        bid.bid_data.all().delete()
    delete_winner_data()


def set_bids_timing(set_time):
    bids = Bid.objects.all()
    for bid in bids:
        bid.start_date_time = set_time
        set_time = set_time + timedelta(seconds=6)
        bid.is_active = True
        bid.is_won = False
        bid.save()

def add_coins():
    users = User.objects.all().exclude(username=None)
    for u in users:
        data={
            "user": u.id,
            "coins": 1000,
            "description": "aa"
        }
        serializer = BonusCoinsTransactionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)
    return None

def reset_coin_transactions():
    CoinsTransaction.objects.all().delete()

def reset_bonus_coin_transactions():
    BonusCoinsTransaction.objects.all().delete()

def reset_transactions():
    Transaction.objects.all().delete()

def create_buzzers():
    users = User.objects.all().exclude(username=None)
    bids = Bid.objects.filter(is_active=True, is_won=False)
    print(users.count())
    for u in users:
        print(u)
        for b in bids:
            data={
                "user": u.id,
                "bid": b.id,
                "coins": randint(5, 6)
            }
            serializer = BuzzerPOSTSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
            else:
                print(serializer.errors)
    return None


set_time = timezone.localtime() + timedelta(seconds=30)

#Bid.objects.all().delete()
delete_bids()
Ticket.objects.all().delete()
reset_coin_transactions()
reset_bonus_coin_transactions()
reset_transactions()
#delete_users()
#create_users(100)
#create_bids()
set_bids_timing(set_time)
reset_bids()
#delete_buzzers()
#add_coins()
#add_coins()
#create_buzzers()
#create_buzzers()
print("--done -")
