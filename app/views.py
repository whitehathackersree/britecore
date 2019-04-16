from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views import View
from django.http import Http404
from django.contrib import messages
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth import login, logout, authenticate
from django.core.exceptions import ValidationError
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.views.generic import DetailView, ListView, CreateView, FormView, UpdateView, DeleteView
from django.shortcuts import get_list_or_404, get_object_or_404
from django.forms import formset_factory
from django.forms import inlineformset_factory
from django.db import transaction
from rest_framework import generics
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from .models import *
from .forms import *
from .options import *
from .mixins import *

def index(request):
    form = CustomUserCreationForm()
    return render(request, 'index.html', {'form': form})

def angular_test(request):
    return render(request, 'angular_test.html')

def redirect_referral(request, code):
    referral = Referral.objects.filter(code=code)
    print(code)
    if referral.exists():
        referral.update(clicks=referral[0].clicks + 1)
        return redirect("https://bidbuzz.in/signup/?referral="+code)
    return redirect("https://bidbuzz.in/signup/")

class ShowLoginMessage(View):
    msg = "Successfully Signed Out!"
    logout = True
    def get(self, request):
        if self.logout: logout(request)
        messages.success(request, self.msg)
        return redirect('login')

class SignUpView(View):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect(reverse_lazy('dashboard'))
        form = CustomUserCreationForm()
        return render(request, 'registration/signup.html', {'form': form})

    def post(self,request):
        form = CustomUserCreationForm(request.POST or None, request.FILES or None)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()
            messages.success(request, "If the email is valid, we've sent you a verification mail. After verification, you may go ahead and sign in.")
            return redirect('login')
            #return render(request, 'registration/account_activation_sent.html')
        return render(request, 'registration/signup.html', {'form': form})

class ActivateAccountView(View):
    def get(self, request, uidb64, token):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and account_activation_token.check_token(user, token):
            user.is_active = True
            user.email_confirmed = True
            user.save()
            same_email_users = User.objects.filter(email=user.email).exclude(id=user.id)
            for u in same_email_users:
                u.email_confirmed=False
                u.save()
            return redirect(reverse_lazy('login_')+'?activated=true')
        else:
            raise Http404

class UserDashboard(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, 'dashboard/dashboard-main.html')

    def post(self,request):
        form = CustomUserCreationForm(request.POST or None, request.FILES or None)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()
            return render(request, 'registration/account_activation_sent.html')
        return render(request, 'dashboard/dashboard-main.html', {'form': form})
