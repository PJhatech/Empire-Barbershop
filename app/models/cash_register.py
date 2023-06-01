from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey
from flask_login import UserMixin


class Cash_Register(db.Model, UserMixin):
    __tablename__ = 'cash_register'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    barber_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('barber.id')))
    service_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('service.id')))
    charge = db.Column(Enum('charge', name='transaction_type_enum'))
    total_items = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.Date, default=datetime.datetime.now())
    updated_at = db.Column(db.Date, default=datetime.datetime.now())

    #Relationships
    barbers = db.relationship('Barber', back_populates='cash_register')
    services = db.relationship('services', back_populates='cash_register')


    def to_cash_register_dict(self):
        return {
            'id': self.id,
            'barber_id': self.barber_id,
            'service_id': self.service_id,
            'charge': self.charge,
            'total_items': self.total_items,
            'total_price': self.total_price,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
