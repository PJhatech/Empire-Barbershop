from flask import Flask, Blueprint, jsonify, request
from flask_login import login_required, current_user
from flask_login import current_user, login_required
from app.models import Appointment, Service, db, User

appointment_routes = Blueprint('appointments', __name__)


@appointment_routes.route('/', methods=['GET'])
# @login_required
def get_appointments():
    print(current_user)
    appointments = Appointment.query.all()
    # print(appointments)
    return jsonify([appointment.to_appointment_dic() for appointment in appointments])

@appointment_routes.route('/', methods=['GET', 'POST'])
@login_required
def handle_appointments():
    if request.method == 'GET':
        barber_appointments = Appointment.query.filter_by(barber_id=User.id).first()
        if barber_appointments is None:
            pass
        else:
            return barber_appointments.to_appointment_dict()

    if request.method == 'POST':
        data = request.json
        barber_appointments = Appointment(
            barber_id=User.id,
            client_id=current_user.id,
            service_id=Service.id,
            date=data['date'],
            time=data['time'],
            repeat=data['false'],
        )
        db.session.add(barber_appointments)
        db.session.commit()
        return jsonify(barber_appointments.to_appointment_dic()), 201
