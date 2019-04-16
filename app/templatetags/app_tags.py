from django import template
from django.urls import reverse_lazy
from app.models import *
from app import options

register = template.Library()


@register.filter
def get_profile_tabs(user, other_user):
    return options.get_profile_tabs(user, other_user)

@register.filter
def html_placeholder(field, args=None):
    if args == None:
        return field
    field.field.widget.attrs.update({ "placeholder": args })
    return field

default_options = {
    "Settings" : "/settings",
    "Logout" : "/logout"
}
#reverse_lazy('document',kwargs={'pk':pk,'slug':slug})

def dash_nav_profile_urls(user):
    nav_profile_urls = [
        ("Create a Document", "/document_create/"),
        ("Request a app", "/app_request/"),
        ("Activity", "/activity/"),
        ("Analytics", "/analytics/"),
        ("Settings", "/settings/"),
        ("Logout",reverse_lazy('logout'))]
    return nav_profile_urls

dashboard_resource_fleet_options = [("Manage app", "ssss"),
        ("View usage", "/create_a_app/"),
        ("Activity", "/activity/"),
        ("Analytics", "/analytics/"),
        ("Settings", "/settings/"),
        ("Delete",reverse_lazy('logout'))]

@register.filter
def get_profile_options(user, args=None):
    if args == None:
        return default_options
    field.field.widget.attrs.update({ "placeholder": args })
    return field

@register.filter(name='split')
def split(value, args=None):
    if args == None:
        return value.split()
    else:
        return value.split(args)

@register.filter(name='get_page_title')
def get_page_title(object, args=None):
    if args == None:
        return "app | No Doc Here!!"
    elif args=="document" and object is not None:
        return object.title+" | "+object.author.full_name_+" - app"
    else:
        return "app | Nothing Here!!"


@register.filter(name='user_has_app_of_document')
def user_has_app_of_document(document, user_id):
    if app.objects.filter(document__id=document.id, user__id=user_id).exists():
        app = app.objects.get(document__id=document.id, user__id=user_id)
        return app.id

@register.filter(name='get_flyout_options')
def get_flyout_options(list_type, user=None):
    if list_type=="dashboard-nav-profile":
        return dash_nav_profile_urls(user)
    elif list_type=="dashboard-resource-fleet-options":
        return dashboard_resource_fleet_options

def business_options(business):
    business_urls = [
        ("Manage Business", reverse_lazy("business", kwargs={'pk': business.id})),
        ("Add Employee", reverse_lazy("employee_create", kwargs={'pk': business.id})),
        ("Destroy",reverse_lazy('business_delete', kwargs={'pk':business.id}))
        ]
    return business_urls

@register.filter(name='get_business_options')
def get_business_options(business):
    return business_options(business)
