from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey
from flask_login import UserMixin

class Appointment(db.Model, UserMixin):
    __tablename__ = 'appointments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    barber_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('barber.id')))
    client_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('client.id')))
    service_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('service.id')))
    date = db.Column(db.Date, unique=True, nullable=False)
    time = db.Column(db.DateTime, unique=True,  nullable=False)
    repeat = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.Date, default=datetime.datetime.now())
    updated_at = db.Column(db.Date, default=datetime.datetime.now())

    #Relationships
    barbers = db.relationship('Barber', back_populates='appointments')
    clients = db.relationship('Client', back_populates='appointments')
    services = db.relationship('Service', back_populates='appointments')


    def to_appointment_dic(self):
        return {
            'id': self.id,
            'barber_id': self.barber_id,
            'client_id': self.client_id,
            'service_id': self.service_id,
            'date': self.date,
            'time': self.time,
            'repeat': self.repeat,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
