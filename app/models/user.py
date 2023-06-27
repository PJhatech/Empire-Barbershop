from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash


class User(UserMixin, db.Model):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    phone_number = db.Column(db.Integer, nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    user_type = db.Column(db.ForeignKey(add_prefix_for_prod('user_types.id')))
    hashed_password = db.Column(db.String(255), nullable=False)

    # Relationships
    user_types = db.relationship('User_Type', back_populates='users')
    appointments_as_barber = db.relationship('Appointment', foreign_keys='Appointment.barber_id', back_populates='barber')
    appointments_as_client = db.relationship('Appointment', foreign_keys='Appointment.client_id', back_populates='client')
    client_wallet = db.relationship('Wallet', foreign_keys='Wallet.client_id', back_populates='client', uselist=False)
    cash_register = db.relationship('Cash_Register', foreign_keys='Cash_Register.barber_id', back_populates='barber')
    locations = db.relationship('Location', back_populates='users')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone_number': self.phone_number,
            'username': self.username,
            'email': self.email,
            'user_type': self.user_type
        }
