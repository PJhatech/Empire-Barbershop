from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from flask_login import current_user, login_required
from app.models import Location, db



location_routes = Blueprint('locations', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@location_routes.route('/')
@login_required
def get_locations():
    # print(current_user)
    locations = Location.query.all()
    return [location.to_location_dict() for location in locations]


@location_routes.route('/<int:id>')
@login_required
def get_location_by_id(id):
    location = Location.query.get(id)
    return location.to_location_dict()


@location_routes.route('/', methods=['POST'])
@login_required
def post_new_location():
   data = request.json
   new_location = Location(
      address='114 Sunvalley Mall',
      city='Concord',
      state='California',
      zipCode=94520,
      country='United States',
      lat=123445689,
      lng=987654321,
      name="Concord Location",
   )
   db.session.add(location)
   db.session.commit()
   return jsonify(location.to_location_dict()), 201
   return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@location_routes.route('/<int:location_id>', methods=['PUT'])
@login_required
def update_location(location_id):
    data = request.json
    location = location.query.get(location_id)

    if not location:
        return jsonify({'error': 'location not found'}), 404
    location.location_name = data.get('location_name', location.location_name)
    location.description = data.get('description', location.description)
    location.price = data.get('price', location.price)
    location.time_frame = data.get('time_frame', location.time_frame)
    db.session.commit()
    return jsonify(location.to_location_dict())


@location_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_location(id):
    location = location.query.get(id)
    if location:
        db.session.delete(location)
        db.session.commit()
        return jsonify({'message': 'location deleted successfully'}), 204
    return jsonify({'message': 'location not found'}), 404
