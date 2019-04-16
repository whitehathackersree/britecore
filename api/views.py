from django.utils.translation import gettext as _
from rest_framework import viewsets, status
from rest_framework import permissions
from rest_framework import filters
from django.http import Http404
from django.contrib.auth import authenticate, get_user_model, login
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.decorators import detail_route, action
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.core.exceptions import ValidationError
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_list_or_404, get_object_or_404
from django.db import transaction
from django.db.models import Q
from django.utils import timezone
from datetime import timedelta
from app.models import *
from .serializers import *
from .permissions import *
from .filters import *
from .utils import appBasicAuthentication, CustomPagination

from rest_framework import serializers
from rest_framework import exceptions
from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer
from rest_framework.pagination import PageNumberPagination

class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        data = request.data
        request.session.flush()
        username = data.get('username', None)
        password = data.get('password', None)

        if not username or not password:
            raise exceptions.AuthenticationFailed(_('No credentials provided.'))

        user = authenticate(username=username, password=password)

        if not user:
            raise exceptions.AuthenticationFailed(_('Invalid username/password.'))

        if not user.is_active:
            raise exceptions.AuthenticationFailed(_('User inactive or deleted.'))

        login(request, user)
        return Response("Logged In")

class AuthenticationView(APIView):
    authentication_classes = (SessionAuthentication, appBasicAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        content = {
            'user': request.user,
            'auth': request.auth,  # None
        }
        return Response(AuthUserSerializer(request.user).data)

class DeleteTokenView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        if request.user.is_authenticated:
            token = request.META['HTTP_AUTHORIZATION'].split(" ")[1]
            if token is not None:
                TokenBlackList.objects.create(token=token)
                return Response(True)
        return Response(False)

class AuthUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        if request.user.is_authenticated:
            return Response(AuthUserSerializer(request.user).data)
        return Response(False)

class AuthUserReferralDataView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None):
        if request.user.is_authenticated:
            return Response(ReferralDataSerializer(request.user.referral_data).data)
        raise Http404

class BaseActionsModelViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter,)

    class Meta:
        abstract = True

    def paginate_queryset(self, queryset):
        if 'no_page' in self.request.query_params:
            return None
        return super().paginate_queryset(queryset)

    @transaction.atomic
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if hasattr(self.__class__, 'before_update') and callable(getattr(self.__class__, 'before_update')):
            self.before_update(request, instance, *args, **kwargs)
        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def get_serializer_context(self):
        data = super().get_serializer_context()
        data['user'] = self.request.user
        data['view'] = self
        return data

    def get_serializer_class(self):
        assert self.serializer_class is not None, (
            "'%s' should either include a `serializer_class` attribute, "
            "or override the `get_serializer_class()` method."
            % self.__class__.__name__
        )
        if hasattr(self, 'admin_action_serializers') and self.request.user.is_superuser:
            if self.action in self.admin_action_serializers:
                return self.admin_action_serializers[self.action]

        if hasattr(self, 'self_action_serializers') and self.request.user.is_authenticated:
            if self.action in self.self_action_serializers:
                obj=self.get_object()
                if isinstance(obj, User):
                    if obj == self.request.user:
                        return self.self_action_serializers[self.action]

        if hasattr(self, 'auth_action_serializers') and self.request.user.is_authenticated:
            if self.action in self.auth_action_serializers:
                return self.auth_action_serializers[self.action]

        if hasattr(self, 'action_serializers'):
            if self.action in self.action_serializers:
                return self.action_serializers[self.action]
        return self.serializer_class

    def get_permissions(self):
        assert self.permission_classes is not None, (
            "'%s' should either include a `permission_classes` attribute, "
            "or override the `get_permissions()` method."
            % self.__class__.__name__
        )
        if hasattr(self, 'action_permissions'):
            if self.action in self.action_permissions:
                return [permission() for permission in self.action_permissions[self.action]]
        return [permission() for permission in self.permission_classes]

class PasswordResetView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        print(request.data)
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.get(phone_number=serializer.data['phone_number'])
            user.set_password(serializer.data['password'])
            user.is_active=True
            user.save()
            return Response(True)
        raise serializers.ValidationError(serializer.errors)
        #return Response(serializer.errors)


class UserViewSet(BaseActionsModelViewSet):
    queryset = User.objects.all().exclude(username=None).order_by('-username')
    serializer_class = UserSerializer
    permission_classes = (UserViewPermission,)
    pagination_class = CustomPagination
    filter_fields = ('id', 'username', 'phone_number', 'email', 'city', 'address', 'is_dummy', 'date_created')
    search_fields =  ('id', 'username', 'phone_number', 'email', 'city', 'address', 'is_dummy',  'date_created')
    ordering_fields = ('id', 'username', 'phone_number', 'email', 'city', 'address', 'is_dummy',  'date_created')
    pagination_class.page_size = 5
    action_serializers = {
        'list': UserSerializer,
        'retrieve': UserDETAILSerializer,
        'create': UserCREATESerializer,
        'update': UserUPDATESerializer,
        'partial_update': UserUPDATESerializer
    }
    self_action_serializers = {
        'retrieve': AuthUserSerializer,
    }

class OrganizationViewSet(BaseActionsModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    permission_classes = (permissions.AllowAny,)
    pagination_class = CustomPagination
    pagination_class.page_size = 5
    action_serializers = {
        'list': OrganizationSerializer,
        'retrieve': OrganizationSerializer,
        'create': OrganizationSerializer,
        'update': OrganizationSerializer,
        'partial_update': OrganizationSerializer
    }
    self_action_serializers = {
        'retrieve': OrganizationSerializer,
    }
    lookup_field='username'
