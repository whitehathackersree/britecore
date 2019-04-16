from django.utils.translation import gettext as _
from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from rest_framework_jwt.settings import api_settings
from rest_framework import authentication, exceptions, serializers
User = get_user_model()
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
jwt_get_username_from_payload = api_settings.JWT_PAYLOAD_GET_USERNAME_HANDLER
from .serializers import AuthUserSerializer
from app.tasks import task_send_activation_mail, task_send_welcome_mail

def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': AuthUserSerializer(user, context={'request': request}).data
    }


class CustomJWTSerializer(JSONWebTokenSerializer):
    username_field = 'username_or_email_or_mobile'

    def validate(self, attrs):

        password = attrs.get("password")
        user_obj = User.objects.filter(email=attrs.get("username_or_email_or_mobile"), email_confirmed=True).first() or User.objects.filter(username=attrs.get("username_or_email_or_mobile")).first() or User.objects.filter(phone_number=attrs.get("username_or_email_or_mobile")).first()
        if user_obj is not None:
            credentials = {
                'username':user_obj.phone_number,
                'password': password
            }
            if all(credentials.values()):
                user = authenticate(**credentials)
                if user:
                    if not user.is_active:
                        msg = _('Account is disabled')
                        raise serializers.ValidationError(msg)

                    payload = jwt_payload_handler(user)

                    return {
                        'token': jwt_encode_handler(payload),
                        'user': user
                    }
                else:
                    msg = _('Invalid Credentials')
                    raise serializers.ValidationError(msg)

            else:
                msg = _('Must include "{username_field}" and "password"')
                msg = msg.format(username_field=self.username_field)
                raise serializers.ValidationError(msg)

        else:
            msg = _('Account does not exist')
            raise serializers.ValidationError(msg)

from rest_framework.authentication import get_authorization_header
from django.contrib.auth.models import AnonymousUser
import jwt

class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request): # it will return user object
        try:
            token = request.META['HTTP_AUTHORIZATION'].split(" ")[1] #get_authorization_header(request).decode('utf-8')
            if token is None or token == "null" or token.strip() == "":
                raise exceptions.AuthenticationFailed('Authorization Header or Token is missing on Request Headers')
            decoded = jwt.decode(token, settings.SECRET_KEY)
            username = decoded['username']
            user_obj = User.objects.filter(username=username).first() or User.objects.filter(email=username).first() or User.objects.filter(phone_number=username).first()
        except:
            user_obj = AnonymousUser()

        return (user_obj, None)
        """except jwt.ExpiredSignature :
            raise exceptions.AuthenticationFailed('Token Expired, Please Login')
        except jwt.DecodeError :
            raise exceptions.AuthenticationFailed('Token Modified by thirdparty')
        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed('Invalid Token')
        except Exception as e:
            raise exceptions.AuthenticationFailed(e)
        return (user_obj, None)"""

    def get_user(self, userid):
        try:
            return User.objects.get(pk=userid)
        except Exception as e:
            return None
