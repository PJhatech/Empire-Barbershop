from app.models import db, Appointment, environment, SCHEMA
from sqlalchemy.sql import text
import random
from datetime import datetime, date, time as dt_time
import time


def seed_appointment():
    userClient1 = Appointment(
        barber_id=1,
        client_id=1,
        date=datetime.now(),
        time=datetime.combine(date.today(), dt_time(17, 7, 25)),
        repeat=True,
        service_id=1
    )


    db.session.add(userClient1)
    db.session.commit()


def undo_appointments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.appointment RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM appointment"))

    db.session.commit()
