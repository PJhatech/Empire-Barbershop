from app.models import db, User, User_Type, environment, SCHEMA
from sqlalchemy.sql import text


def seed_user():
    # Create user_types
    barber = User_Type(type='barber')
    client = User_Type(type='client')
    db.session.add(barber)
    db.session.commit()
    db.session.add(client)
    db.session.commit()

    # Barbers
    DemoBarber = User(
        first_name='Demo2',
        last_name='demo2',
        phone_number=123456789,
        username='barber',
        email='barber@example.com',
        user_type=barber.id,
        password='password'
    )
    Christian = User(
        first_name='Chris',
        last_name='Chavez',
        phone_number=123456789,
        username='chaveez',
        email='chavez@example.com',
        user_type=barber.id,
        password='password'
    )
    Aaron = User(
        first_name='Aaron',
        last_name='Smith',
        phone_number=123456789,
        username='ronesmith',
        email='ronesmith@example.com',
        user_type=barber.id,
        password='password'
    )
    # Clients
    Jha = User(
        first_name='Jha',
        last_name='Hutalla',
        phone_number=123456789,
        username='jha123',
        email='client@example.com',
        user_type=client.id,
        password='password'
    )
    Jake = User(
        first_name='Jake',
        last_name='Fumar',
        phone_number=123456789,
        username='jake123',
        email='jake@example.com',
        user_type=client.id,
        password='password'
    )
    Justin = User(
        first_name='Justin',
        last_name='Bondoc',
        phone_number=123456789,
        username='bondoc123',
        email='justin@example.com',
        user_type=client.id,
        password='password'
    )

    # Add users to the session and commit changes to the database
    db.session.add(barber)
    db.session.add(client)
    db.session.add(DemoBarber)
    db.session.add(Christian)
    db.session.add(Aaron)
    db.session.add(Jha)
    db.session.add(Jake)
    db.session.add(Justin)
    db.session.commit()



def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
