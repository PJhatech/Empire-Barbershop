from app.models import db, User, User_Type, environment, SCHEMA
from sqlalchemy.sql import text


def seed_user():
    # Create user_types
    barber = User_Type(type='barber')
    client = User_Type(type='client')

    # Barbers
    DemoBarber = User(
        first_name='Demo2',
        last_name='demo2',
        phone_number='1234567890',
        username='barber',
        email='barber@example.com',
        user_type=barber,
        password='password'
    )
    Christian = User(
        first_name='Chris',
        last_name='Chavez',
        phone_number='1234567890',
        username='chaveez',
        email='chavez@example.com',
        user_type=barber,
        password='password'
    )
    Aaron = User(
        first_name='Aaron',
        last_name='Smith',
        phone_number='1234567890',
        username='ronesmith',
        email='ronesmith@example.com',
        user_type=barber,
        password='password'
    )
    # Clients
    Jha = User(
        first_name='Jha',
        last_name='Hutalla',
        phone_number='9876543210',
        username='jha123',
        email='client@example.com',
        user_type=client,
        password='password'
    )
    Jake = User(
        first_name='Jake',
        last_name='Fumar',
        phone_number='9876543210',
        username='jake123',
        email='jake@example.com',
        user_type=client,
        password='password'
    )
    Justin = User(
        first_name='Justin',
        last_name='Bondoc',
        phone_number='9876543210',
        username='bondoc123',
        email='justin@example.com',
        user_type=client,
        password='password'
    )

    # Add user_types to users
    DemoBarber.user_types.append(barber)
    Jha.user_types.append(client)

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
