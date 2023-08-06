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
   zipCode_int = data["zipCode"]
   new_location = Location(
      address=['address'],
      city=['city'],
      state=['state'],
      zipCode=int(zipCode_int),
      country=['country'],
      lat=['lat'],
      lng=['lng'],
      name=["name"]
   )
   print("<---------APIHEREE------->", new_location)
   db.session.add(new_location)
   db.session.commit()
   return jsonify(new_location.to_location_dict()), 201
   return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@location_routes.route('/<int:location_id>', methods=['PUT'])
@login_required
def update_location(location_id):
   data = request.json
   location = Location.query.get(location_id)

   if not location:
      return jsonify({'error': 'location not found'}), 404
   location.address = data.get('address', location.address)
   location.city = data.get('city', location.city)
   location.state = data.get('state', location.state)
   location.zipCode = data.get('zipCode', location.zipCode)
   location.country = data.get('country', location.country)
   location.lat = data.get('lat', location.lat)
   location.lng = data.get('lng', location.lng)
   location.name = data.get('name', location.name)
   db.session.commit()
   return jsonify(location.to_location_dict())


@location_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_location(id):
   location = Location.query.get(id)
   if location:
      db.session.delete(location)
      db.session.commit()
      return jsonify({'message': 'location deleted successfully'}), 204
   return jsonify({'message': 'location not found'}), 404
