from django.utils.translation import gettext as _

CHAR = 'C'
TEXT = 'T'
INT = 'I'
DECIMAL = 'D'
BOOLEAN = 'B'
CHOICE = 'C'
RADIO = 'R'
ENUM = 'E'
FOREIGN = 'F'
DATE = 'DT',

DATA_TYPES = (
    (CHAR, 'Character'),
    (TEXT, 'Text'),
    (INT, 'Integer'),
    (DECIMAL, 'Decimal'),
    (BOOLEAN, 'Boolean'),
    (CHOICE, 'Choice'),
    (RADIO, 'Radio'),
    (ENUM, 'enum'),
    (DATE, 'Date'),
)
