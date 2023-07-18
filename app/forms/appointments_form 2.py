from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Appointment



class AppointmentForm(FlaskForm):
    service_id = IntegerField('Service', validators=[DataRequired()])
    client_id = IntegerField('Client', validators=[DataRequired()])
    date = StringField('Date', validators=[DataRequired()])
    time = StringField('Time', validators=[DataRequired()])
