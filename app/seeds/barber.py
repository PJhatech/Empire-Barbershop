from app.models import db, Barber, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_barber():
    demo = Barber(
        first_name='Demo2', last_name='demo2',
        phone_number=1234567,  username='demo2',
        email='demo2@aa.io', password='password', instagram='example')
    chris = Barber(
        first_name='chris', last_name='Chavez',
        phone_number=1234567,  username='chavez1',
        email='chris@.io', password='password', instagram='examplee')
    aaron = Barber(
        first_name='aaron', last_name='Smith',
        phone_number=1234567,  username='smith2',
        email='aaron@.io', password='password', instagram='exampleee')

    db.session.add(demo)
    db.session.add(chris)
    db.session.add(aaron)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_barbers():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.barbers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM barbers"))

    db.session.commit()
