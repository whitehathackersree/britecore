from django.utils.translation import gettext as _

SELF_PROFILE_OPTIONS = [
 _("settings"),
 _("messages"),
]

PROFILE_TAB_OPTIONS = [
 _("profile"),
 _("apps"),
 _("documents"),
 _("activity"),
]


DOCUMENT_TABS = [
 _("info"),
 _("activity"),
 _("analytics"),
 _("questions"),
 _("settings"),
]

def get_profile_tabs(user, other_user):
    if user == other_user:
        return PROFILE_TAB_OPTIONS + SELF_PROFILE_OPTIONS
    else:
        return PROFILE_TAB_OPTIONS

def get_document_tabs(user, document):
        return DOCUMENT_TABS
