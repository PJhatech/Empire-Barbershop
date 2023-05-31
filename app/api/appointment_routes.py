from flask import Blueprint, jsonify, request, db
from flask_login import login_required, current_user
from flask_login import current_user, login_required
from app.models import Appointment, barber_id, service_id

appointment_routes = Blueprint('appointments', __name__)

@appointment_routes.route('')
@login_required
def get_available_appointments():
    print(current_user)
    appointments = Appointment.query.all()
    return [appointment.to_appointment_dic() for appointment in appointments]

@appointment_routes.routes('/', methods=['GET', 'POST'])
@login_required
def handle_appointments():
    if request.method == 'GET':
        barber_appointments = Appointment.query.filter_by(barber_id.id).first()
        if barber_appointments is None:
            pass
        else:
            return barber_appointments.to_appointment_dict()

    if request.method == 'POST':
        data = request.json
        barber_appointments = Appointment(
            barber_id=barber_id.id,
            client_id=current_user.id,
            service_id=service_id.id,
            date=data['date'],
            time=data['time'],
            repeat=data['repeat'],
            created_at=data['created_at'],
            updated_at=data['updated_at'],
        )
        db.session.add(barber_appointments)
        db.session.commit()
        return jsonify(barber_appointments.to_appointment_dic()), 201
