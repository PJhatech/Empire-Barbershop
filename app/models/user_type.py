from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash


class User_Type(db.Model, UserMixin):
    __tablename__ = "user_types"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)

    # Relationships
    users = db.relationship('User', back_populates='user_types')
    
    def to_user_type_dict(self):
        return {
            'id': self.id,
            'type': self.type,
        }
