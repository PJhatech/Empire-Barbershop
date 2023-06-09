from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from flask_login import UserMixin
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey




class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    # user_type = db.Column(Enum(UserTy), nullable=False)
    # barber_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('barbers.id')))
    # client_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('clients.id')))
    user_type = db.Column(Enum('barbers', 'clients', name='user_type_enum'))

    # Relationships
    barbers = db.relationship('Barber', back_populates='users')
    clients = db.relationship('Client', back_populates='users')

    def to_dict(self):
        return {
            'id': self.id,
            'user_type': self.user_type.value
        }

            # 'barber_id': self.barber_id,
            # 'client_id': self.client_id,
