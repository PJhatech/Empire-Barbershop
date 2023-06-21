from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash


class Wallet(db.Model, UserMixin):
    __tablename__ = "wallet"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    credit_card = db.Column(db.Integer, nullable=False)
    gift_card = db.Column(db.Integer)

    # Relationships
    client = db.relationship('User', foreign_keys=[client_id], back_populates='client_wallet')

    def to_wallet_dict(self):
        return {
            'id': self.id,
            'client_id': self.client_id,
            'credit_card': self.credit_card,
            'gift_card': self.gift_card
        }
