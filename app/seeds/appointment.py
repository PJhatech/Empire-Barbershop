from app.models import db, Appointment, environment, SCHEMA
from sqlalchemy.sql import text
import random
from datetime import datetime
import time


def seed_appointment():
    userClient1 = Appointment(
        barber_id=1,  client_id=1,  service_id=1,
        date=random.seed(datetime.now().timestamp()),
        time=random.seed(time.time()),
        repeat=True
    )

    db.session.add(userClient1)
    db.session.commit()


def undo_appointment():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.appointment RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM appointment"))

    db.session.commit()
