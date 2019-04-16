from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.urls import reverse_lazy
from django.contrib.auth import views as auth_views
from django.contrib import admin
from .forms import *
from app import views as vw

admin.site.site_title = 'app Admin'
admin.site.site_header = 'app Administration'

urlpatterns = [
    path(r'dashboard',vw.UserDashboard.as_view(), name='dashboard'),
    path(r'logout/', vw.ShowLoginMessage.as_view(), name='logout'),
    path(r'ac/login/', vw.angular_test, name='login_'),
    path(r'signup',vw.SignUpView.as_view(), name='signup'),
    path(r'activate/<uidb64>/<token>/',
                vw.ActivateAccountView.as_view(), name='activate'),
    path('reset/done/', vw.ShowLoginMessage.as_view(msg="Password has been reset Successfully!"), name='password_reset_complete'),
    path('password_change/done/', vw.ShowLoginMessage.as_view(msg="Password has been changed Successfully! Please Login."), name='password_change_done'),
    path('password_reset/done/', vw.ShowLoginMessage.as_view(msg="If the email you specified exists in our system, we've sent you a One Time Link to reset your password."), name='password_reset_done'),
    path(r'accounts/', include('django.contrib.auth.urls')),
    #path(r'', vw.index, name='index'),
    path(r'c/<code>', vw.redirect_referral, name="redirect_referral"),
    re_path(r'', vw.angular_test, name='bidbuzzApp'),
]
