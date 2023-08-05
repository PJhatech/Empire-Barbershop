from app.models import db, Location, environment, SCHEMA
from sqlalchemy.sql import text


def seed_location():
    concord_location = Location(
         address='114 Sunvalley Mall',
         city='Concord',
         state='California',
         zipCode=94520,
         country='United States',
         lat=123445689,
         lng=987654321,
         name="Concord Location",
    )


    hercules_location = Location(
         address='3700 San Pablo Ave',
         city='Hercules',
         state='California',
         zipCode=94547,
         country='United States',
         lat=987654321,
         lng=123445689,
         name="Hercules Location",
    )


    db.session.add(concord_location)
    db.session.add(hercules_location)
    db.session.commit()


def undo_locations():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.locations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM locations"))

    db.session.commit()
