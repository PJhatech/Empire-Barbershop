from .db import db, environment, SCHEMA, add_prefix_for_prod

from flask_login import UserMixin
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    barber_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('barber.id')))
    client_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('client.id')))
    user_type = db.Column(Enum('barber', 'client', name='user_type_enum'))
    # Relationships
    barber = db.relationship('Barber', back_populates='users')
    client = db.relationship('Client', back_populates='users')

    def to_dict(self):
        return {
            'id': self.id,
            'barber_id': self.barber_id,
            'client_id': self.client_id,
            'user_type': self.user_type
        }
