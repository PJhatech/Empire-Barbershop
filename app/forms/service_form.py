from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Service



def service_exists(form, field):
    service_name = field.data
    service = Service.query.filter(Service.service_name == service_name).first()
    if service:
        raise ValidationError('Service Name is already in use.')


class ServiceForm(FlaskForm):
    service_name = StringField('Service Name', validators=[DataRequired(), service_exists])
    description = StringField('Description', validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
    time_frame = StringField('Time', validators=[DataRequired()])
