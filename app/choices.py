from django.utils.translation import gettext as _

GENDER_MALE ="male"
GENDER_FEMALE = "female"
GENDER_OTHER = "other"


GENDER = (
    (GENDER_MALE, _("male")),
    (GENDER_FEMALE, _("female")),
    (GENDER_OTHER, _("other"))
)


SUPER_ADMIN =1
ACCESS_CHOICES = (
    (1, _("super_admin")),
    (2, _("admin")),
    (3, _("accountant")),
    (4, _("consultant"))
)
REQUEST_CHOICES = (
    (1, _("not viewed")),
    (2, _("viewed")),
    (2, _("approved")),
    (2, _("rejected"))
)
DESCRIPTION_TYPES = (
    (0, _("")),
    (1, _("notice")),
    (2, _("alert")),
    (3, _("rejected"))
)
