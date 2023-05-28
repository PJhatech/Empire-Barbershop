# from flask import Blueprint, jsonify, request
# from flask_login import login_required, current_user
# from app.models import Appointment

# appointment_routes = Blueprint('appointments', __name__)

# @appointment_routes.route('')
# @login_required
# def get_all_appointments():
#     print(current_user)
#     appointments = Appointment.query.all()
#     return [appointment.to_appointment_dic() for appointment in appointments]
