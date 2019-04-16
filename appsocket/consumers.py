# appsocket/consumers.py
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
import json
from channels.consumer import SyncConsumer
from channels.exceptions import StopConsumer
from django.shortcuts import get_list_or_404, get_object_or_404
from app.models import *
from .settings import *
from .utils import get_user_room, get_bid_room, broadcast_data
from api.serializers import *
from asgiref.sync import async_to_sync
import inspect, sys

class BidDataConsumer(AsyncWebsocketConsumer):
    user = None
    async def connect(self):
        self.user = self.scope["user"]
        if(TokenBlackList.objects.filter(token=self.scope["token"]).exists()):
            self.close()
        self.user_room_name = get_user_room(self.user.id)
        self.bids_room_name = get_bid_room()
        print("connection request received.")

        await self.accept()
        # Join user_room group
        await self.channel_layer.group_add(
            self.user_room_name,
            self.channel_name
        )

        await self.channel_layer.group_add(
            self.bids_room_name,
            self.channel_name
        )

        print("connection accepted.")

    async def disconnect(self, close_code):
        # Leave user_room group
        await self.channel_layer.group_discard(
            self.user_room_name,
            self.channel_name
        )

        await self.channel_layer.group_discard(
            self.bids_room_name,
            self.channel_name
        )
        print("connection disconnected.")
        raise StopConsumer()


    async def receive(self,text_data):
        print("message received.")
        text_data_json = json.loads(text_data)
        event_type = text_data_json['event_type']
        data = text_data_json['data']
        if event_type=="place-bid":
            message = {
            'event_type': event_type,
            'data': None,
            'errors': None
            }
            bidId = data["bidId"]
            data = {
                "bid": bidId,
                "user": self.user.id
            }
            serializer = BidDataPOSTSerializer(data=data)
            bidData=None
            if serializer.is_valid():
                bidData=serializer.save()
                message["event_type"]="user-coins"
                message["data"] = {
                    "coins": self.user.coins
                }
                await self.channel_layer.group_send(
                    self.user_room_name,
                    {
                        'type': "send_notif",
                        'message': message
                    }
                )

            else:
                message["errors"]=serializer.errors
                await self.send(text_data=json.dumps({
                    'message': message
                }))
        else:
            print("notif_type unknown")

    async def send_notif(self, event):
        message =  event['message']
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))
