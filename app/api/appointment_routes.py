from flask import Flask, Blueprint, jsonify, request
from flask_login import login_required, current_user
from flask_login import current_user, login_required
from app.models import Appointment, db, User, Service

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
        barber_appointments = Appointment.query.filter_by(
            barber=current_user.id).first()
        if barber_appointments is None:
            pass
        else:
            return barber_appointments.to_appointment_dict()


@appointment_routes.route('/<int:id>')
@login_required
def get_appointment_by_id(id):
#     appointment = Appointment.query.get(id)
#     return appointment.to_appointment_dict()
    barber = User.query.get(id)

    if barber is None or barber.user_type != 'barber':
        return jsonify({'error': 'Barber not found'}), 404

    appointments = Appointment.query.filter_by(barber_id=barber.id).all()

    appointments_dict = {appointment.id: appointment.to_appointment_dict() for appointment in appointments}
    return jsonify(appointments_dict), 200

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


@appointment_routes.route('/<int:appointment_id>', methods=['PUT'])
@login_required
def update_appointment(appointment_id):
    data = request.json
    appointment = Appointment.query.get(appointment_id)

    if not appointment:
        return jsonify({'error': 'Appointment not found'}), 404

    appointment.barber_id = data.get('barber_id', appointment.barber_id)
    appointment.client_id = data.get('client_id', appointment.client_id)
    appointment.service_id = data.get('service_id', appointment.service_id)
    appointment.date = data.get('date', appointment.date)
    appointment.time = data.get('time', appointment.time)
    appointment.repeat = data.get('repeat', appointment.repeat)

    db.session.commit()

    return jsonify(appointment.to_appointment_dict())

@appointment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_appointment(id):
    appointment = Appointment.query.get(id)
    if appointment:
        db.session.delete(appointment)
        db.session.commit()
        return jsonify({'message': 'Appointment deleted successfully'}), 204
    return jsonify({'message': 'Appointment not found'}), 404


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
