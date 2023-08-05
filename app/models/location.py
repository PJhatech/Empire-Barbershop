from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey
from flask_login import UserMixin


class Location(db.Model, UserMixin):
    __tablename__ = 'locations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    barber_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    address = db.Column(db.String(100), unique=True, nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    zipCode = db.Column(db.Integer, nullable=False)
    country = db.Column(db.String(50), nullable=False)
    lat = db.Column(db.Integer, nullable=False)
    lng = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(100), nullable=False)

    # Relationships
    users = db.relationship('User', back_populates='locations')

    def to_locations_dict(self):
        return {
            'id': self.id,
            'barber_id': self.barber_id,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zipCode': self.zipCode,
            'country': self.country,
            'lat': self.lat,
            'lng': self.lng,
            'name': self.name,
        }
