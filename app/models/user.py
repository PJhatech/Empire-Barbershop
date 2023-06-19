from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    phone_number = db.Column(db.Integer, nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    permission = db.Column(db.ForeignKey(add_prefix_for_prod('permissions.id')))
    hashed_password = db.Column(db.String(255), nullable=False)

    # Relationships
    permissions = db.relationship('Permission', back_populates='users')
    appointments = db.relationship('Appointment', back_populates='users')
    wallets = db.relationship('Wallet', back_populates='users', uselist=False)
    cash_register = db.relationship('Cash_Register', back_populates='users')
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
            'permission': self.permission
        }
