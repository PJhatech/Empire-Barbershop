from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def valid_phone_number(form, field):
    if len(field.data) > 16:
        raise ValidationError('Invalid phone number.')



def first_name(form, field):
    first_name = field.data
    if len(first_name.strip()) == 0:
        raise ValidationError('F
        raise ValidationError('First name is too long.')



def last_name(form, field):
    last_name = field.data
    if len(last_name.strip()) == 0:
        raise ValidationError('Last name is required.')
    elif len(last_name) > 50:
        raise ValidationError('Last name is too long.')


def user_type(form, field):
    user_type = field.data
    valid_types = [1, 2]
    if user_type not in valid_types:
        raise ValidationError('User type is invalid.')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    first_name = StringField('firstName', validators=[DataRequired() first_name])
    last_name = StringField('lastName', validators=[DataRequired(), last_name])
    phone_number = IntegerField('phone number', validators=[DataRequired(), valid_phone_number])
    user_type = IntegerField('user type', validators=[DataRequired(), user_type])
