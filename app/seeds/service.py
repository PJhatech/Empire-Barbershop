from app.models import db, Service, environment, SCHEMA
from sqlalchemy.sql import text

def seed_service():
    service_1 = Service(
        service_name = "Specialty Cut",
        description = "Service includes a clean up of the top with scissors and the sides with what you prefer. Shampoo and styling included",
        price = 50,
        time_frame = "45 Mins"
    )
    service_2 = Service(
        service_name = "The Works",
        description="Service includes a full clean up of the top of the hair, sides and beard. Shampoo and styling included.",
        price = 60,
        time_frame = "60 Mins"
    )
    service_3 = Service(
        service_name = "Empire Experience",
        description = "Service includes a the full clean up of the hair and beard with a hot towel shave included and facial.",
        price = 100,
        time_frame = "90 Mins"
    )

    db.session.add(service_1)
    db.session.add(service_2)
    db.session.add(service_3)
    db.session.commit()


def undo_services():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.services RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM services"))

    db.session.commit()
