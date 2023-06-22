from flask import Blueprint, jsonify, request
from flask_login import login_required, login_manager
from app.models import User, User_Type, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# Fetch All Barbers
@user_routes.route('/barbers')
def get_user_types():
    barbers = User.query.filter_by(user_type='barber').all()
    return jsonify([user.to_dict() for user in barbers])


@user_routes.route('/user-types/<int:user_type_id>')
def get_user_type(user_type_id):
    user_type = User_Type.query.get(user_type_id)
    if user_type:
        return jsonify(user_type.to_user_type_dict())
    else:
        return jsonify({'error': 'User type not found'}), 404


@user_routes.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()


    first_name = data.get('first_name')
    last_name = data.get('last_name')
    phone_number = data.get('phone_number')
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    user_type_id = data.get('user_type_id')


    user_type = User_Type.query.get(user_type_id)
    if not user_type:
        return jsonify({'error': 'Invalid user type'}), 400

    user = User(
        first_name=first_name,
        last_name=last_name,
        phone_number=phone_number,
        username=username,
        email=email,
        password=password,
        user_type=user_type
    )


    user.password = password

    # Add the user to the database
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201
