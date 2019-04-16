import json
import asyncio
from celery import shared_task
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
loop = asyncio.get_event_loop()

from celery import shared_task

def get_user_room(id):
    return 'user_room_'+ str(id)

def get_bid_room():
    return 'bid_room'


@shared_task(queue="broadcaster")
def broadcast_data(group_name, event_type=None, data=None, errors=None, event='broadcast_data'):
    channel_layer = get_channel_layer()
    #actual_message = json.dumps({'data': data, 'errors': errors})
    actual_message = {}
    actual_message["event_type"] = event_type
    actual_message["errors"] = errors
    actual_message["data"] = data
    actual_message["errors"] = errors
    broadcast_msg = {
        'type': event,
        'message': actual_message
    }
    #loop=None
    #loop = asyncio.get_event_loop()
    #loop.create_task(channel_layer.group_send(group_name, broadcast_data))
    try:
        loop.run_until_complete(channel_layer.group_send(group_name, broadcast_msg))
        loop.run_until_complete(asyncio.sleep(0))
        #loop.close()
    except:
        loop.create_task(channel_layer.group_send(group_name, broadcast_msg))
    #asyncio.ensure_future(channel_layer.group_send(group_name, broadcast_data))
    #async_to_sync(channel_layer.group_send)(group_name, broadcast_data)
    #await channel_layer.group_send(group_name, broadcast_data)
    print(broadcast_msg)

@shared_task(queue="broadcaster")
def broadcast_coins(user_id):
    from app.models import User
    user = User.objects.get(pk=user_id)
    data = {
        "coins": user.coins
    }
    broadcast_data(group_name=get_user_room(user.id), data=data, event_type="user-coins", event="send_notif")
