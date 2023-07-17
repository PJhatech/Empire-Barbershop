from app.models import db, Appointment, environment, SCHEMA
from sqlalchemy.sql import text
import random
from datetime import datetime, date, time as dt_time
import time


def seed_appointment():
    userClient1 = Appointment(
        barber_id=1,
        client_id=1,
        date="November 2, 2023",
        time="10:45",
        repeat='1 Week',
        service_id=1
    )


    db.session.add(userClient1)
    db.session.commit()


def undo_appointments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.appointments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM appointments"))

    db.session.commit()
