from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token, ObtainJSONWebToken
from .views import *
from .jwt_utils import CustomJWTSerializer

router = DefaultRouter()
router.register('user', UserViewSet, base_name='users')
router.register('organization', OrganizationViewSet, base_name='organizations')
router.register('risk', RiskViewSet, base_name='risks')

urlpatterns = router.urls

urlpatterns+=[
    path(r'login/', LoginView.as_view()),
    path(r'auth/token/', ObtainJSONWebToken.as_view(serializer_class=CustomJWTSerializer)),
    path(r'auth/deleteToken/', DeleteTokenView.as_view()),
    path(r'auth/isAuthenticated/', AuthUserView.as_view()),
    path(r'auth/register/', ObtainJSONWebToken.as_view(serializer_class=CustomJWTSerializer)),
    path(r'auth/password_reset/', PasswordResetView.as_view()),
    path(r'auth/referralData/', AuthUserReferralDataView.as_view()),
]
