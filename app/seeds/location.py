from app.models import db, Location, environment, SCHEMA
from sqlalchemy.sql import text


def seed_location():
    locationSeeder = Location(
         barber_id=1,
         address='114 Sunvalley Mall',
         city='Concord',
         state='California',
         zipCode=94520,
         country='United States',
         lat=123445689,
         lng=987654321,
         name="Concord Location",
    )


    db.session.add(locationSeeder)
    db.session.commit()


def undo_locations():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.locations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM locations"))

    db.session.commit()
