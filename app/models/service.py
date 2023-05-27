from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
from sqlalchemy.orm import Column
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey
from flask_login import UserMixin

class Service(db.Model, UserMixin):
    __tablename__ = 'services'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    servce_name = db.Column(db.String(50), unique=True, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    time_frame = db.Column(db.String(50), nullable=False)

    # Relationships
    appointments = db.relationship('Appointment', back_populates='services')
    cash_register = db.relationship('Cash_Register', back_populates='services')

    def to_service_dict(self):
        return {
            'id': self.id,
            'service_name': self.servce_name,
            'price': self.price,
            'time_frame': self.time_frame
        }
