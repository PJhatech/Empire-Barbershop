from app.models import db, Service, environment, SCHEMA
from sqlalchemy.sql import text

def seed_service():
    service_1 = Service(
        service_name = "Specialty Cut",
        description = "Service includes a clean up of the top with scissors and the sides with what you prefer. Shampoo and styling included",
        price = 50,
        time_frame = 45
    )
    service_2 = Service(
        service_name = "The Works",
        description="Service includes a full clean up of the top of the hair, sides and beard. Shampoo and styling included.",
        price = 60,
        time_frame = 60
    )
    service_3 = Service(
        service_name = "Empire Experience",
        description = "Service includes a the full clean up of the hair and beard with a hot towel shave included and facial.",
        price = 100,
        time_frame = 90
    )


def undo_service():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.service RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM service"))

    db.session.commit()
