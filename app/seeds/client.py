from app.models import db, Client, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_client():
    demo = Client(
        first_name='Demo', last_name='demo',
        phone_number=1234567,  username='demo1',
        email='demo@aa.io', password='password')
    jha = Client(
        first_name='jha', last_name='hutalla',
        phone_number=1234567,  username='jha1',
        email='jha@.io', password='password')
    rue = Client(
        first_name='rue', last_name='ramento',
        phone_number=1234567,  username='rue2',
        email='rue@.io', password='password')

    db.session.add(demo)
    db.session.add(jha)
    db.session.add(rue)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_clients():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.clients RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM clients"))

    db.session.commit()


# Adds a demo user, you can add other users here if you want
# def seed_users():
#     demo = Client(
#         first_name='Demo', email='demo@aa.io', password='password')
#     jha = Client(
#         first_name='jha', email='jha@aa.io', password='password')
#     rue = Client(
#         first_name='rue', email='rue@aa.io', password='password')

#     db.session.add(demo)
#     db.session.add(jha)
#     db.session.add(rue)
#     db.session.commit()


# # Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# # have a built in function to do this. With postgres in production TRUNCATE
# # removes all the data from the table, and RESET IDENTITY resets the auto
# # incrementing primary key, CASCADE deletes any dependent entities.  With
# # sqlite3 in development you need to instead use DELETE to remove all data and
# # it will reset the primary keys for you as well.
# def undo_users():
#     if environment == "production":
#         db.session.execute(
#             f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM users"))

#     db.session.commit()
