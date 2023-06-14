from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User, Client, Barber


def user_exists(form, field):
    # Checking if client exists
    email = field.data
    # client = Client.query.filter(Client.email == email).first()
    barber = Barber.query.filter(Barber.email == email).first()
    # if not client:
    #     raise ValidationError('Email provided not found.')
    if not barber:
        raise ValidationError('Email provided not found.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    # client = Client.query.filter(Client.email == email).first()
    barber = Barber.query.filter(Barber.email == email).first()
    # if not client:
    #     raise ValidationError('No such client exists.')
    if not barber:
        raise ValidationError('No such barber exists.')
    # if not client.check_password(password):
    #     raise ValidationError('Password was incorrect.')
    if not barber.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_matches])
