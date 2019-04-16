from django.contrib.auth import get_user_model
User = get_user_model()
from django import forms
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import AuthenticationForm
from django.forms.widgets import PasswordInput, TextInput
from .tasks import task_send_activation_mail
from .models import *
from .choices import *
from .tokens import random_string_generator

class CustomUserCreationForm(forms.ModelForm):
    email = forms.EmailField(label='Enter email', widget=forms.EmailInput(attrs={'placeholder': 'Email Address', 'spellcheck':'False', 'autofocus':'True'}))
    password = forms.CharField(label='Enter password', min_length=8, widget=forms.PasswordInput(attrs={'placeholder': 'Password'}))

    class Meta:
        model = User
        fields = ('email', 'password')

    def clean_email(self):
        email = self.cleaned_data['email'].lower()
        r = User.objects.filter(email=email)
        if r.count():
            if r[0].is_active is not True:
                task_send_activation_mail.delay(r[0].id)
                raise ValidationError("Email already registered. We have sent another verification email.")
            raise  ValidationError("Email already exists")
        return email

    def clean_password(self):
        password = self.cleaned_data.get('password')
        return password

    def save(self, commit=True):
        user = super(CustomUserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user
        '''user = User.objects.create_user(
            self.cleaned_data['email'],
            self.cleaned_data['password']
        )
        return user'''


class CustomAuthForm(AuthenticationForm):
    username = forms.CharField(widget=TextInput(attrs={'class':'validate','placeholder': 'Email or Phone or UserID', 'spellcheck':'False', 'autofocus':'True'}))
    password = forms.CharField(widget=PasswordInput(attrs={'placeholder':'Password'}))
