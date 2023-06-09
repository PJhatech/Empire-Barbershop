from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Barber, db, Client

barber_routes = Blueprint('barbers', __name__)

@barber_routes.route('/')
@login_required
def barbers():
    """
    Query for all barbers and returns them in a list of barber dictionaries
    """
    barbers = Barber.query.all()
    # if current_user not
        # return jsonify([barber.to_barber_dic() for barber in barbers])

    return {'barbers': [barber.to_barber_dict() for barber in barbers]}

# @barber_routes.route('/', methods=['GET'])
# # @login_required
# def get_barbers():
#     print(current_user)
#     barbers = Barber.query.all()
#     return jsonify([barber.to_barber_dic() for barber in barbers])


@barber_routes.route('/<int:id>')
@login_required
def barber(id):
    """
    Query for a barber by id and returns that barber in a dictionary
    """
    barbers = Barber.query.get(id)
    return barber.to_barber_dict()

def get_barbers():
    print(current_user)
    barbers = Barber.query.all()
    return [barber.to_barber_dic() for barber in barbers]

@barber_routes.route('/<int:id>')
@login_required
def get_barber_by_id(id):
    barber = Barber.query.get(id)
    return barber.to_barber_dict()
