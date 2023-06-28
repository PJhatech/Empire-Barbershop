from flask import Flask, Blueprint, jsonify, request
from flask_login import login_required, current_user
from flask_login import current_user, login_required
from app.models import Appointment, Service, db, User

appointment_routes = Blueprint('appointments', __name__)


@appointment_routes.route('/', methods=['GET'])
@login_required
def get_appointments():
    print(current_user)
    appointments = Appointment.query.all()
    # print(appointments)
    return jsonify([appointment.to_appointment_dict() for appointment in appointments])

@appointment_routes.route('/')
@login_required
def handle_appointments():
        barber_appointments = Appointment.query.filter_by(barber_id=current_user.id).first()
        if barber_appointments is None:
            pass
        else:
            return barber_appointments.to_appointment_dict()


@appointment_routes.route('/', methods=['POST'])
@login_required
def post_new_appointment():
    data = request.json

        # if 'barber_id' not in data or 'client_id' not in data or 'service_id' not in data or 'date' not in data or 'time' not in data:
        #     return {"error": "Missing necessary field"}, 400

    barber_appointments = Appointment(
        barber_id=current_user.id,
        client_id=data['client_id'],
        service_id=data['service_id'],
        date=data['date'],
        time=data['time'],
        repeat=data.get('repeat', False)
    )
    db.session.add(barber_appointments)
    db.session.commit()
    return jsonify(barber_appointments.to_appointment_dict()), 201


# @appointment_routes.route('/api/appointments', methods=['POST'])
# def create_appointment():
#     # Extract the JSON data from the request
#     data = request.get_json()

#     # Check that the necessary data is provided
#     if 'barber_id' not in data or 'client_id' not in data or 'service_id' not in data or 'date' not in data or 'time' not in data:
#         return {"error": "Missing necessary field"}, 400

#     # Create a new appointment object
#     appointment = Appointment(
#         barber_id=data['barber_id'],
#         client_id=data['client_id'],
#         service_id=data['service_id'],
#         date=data['date'],
#         time=data['time'],
#         # Optional field; if it's not provided, default to False
#         repeat=data.get('repeat', False)
#     )

#     # Add the appointment to the session and commit it to save it to the database
#     db.session.add(appointment)
#     db.session.commit()
