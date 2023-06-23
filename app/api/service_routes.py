from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from flask_login import current_user, login_required
from app.models import Service, db


service_routes = Blueprint('services', __name__)



@service_routes.route('')
# @login_required
def get_services():
    print(current_user)
    services = Service.query.all()
    return [service.to_service_dic() for service in services]


@service_routes.route('/<int:id>')
# @login_required
def get_service_by_id(id):
    service = Service.query.get(id)
    return service.to_service_dict()


@service_routes.route('/', methods=['POST'])
# @login_required
def post_new_service():
    data = request.json()
    service = Service(
        service_name=data['service_name'],
        description=data['description'],
        price=data['price'],
        time_frame=data['time_frame']
    )
    db.session.add(service)
    db.session.commit()
    return jsonify(service.to_service_dic()), 201


@service_routes.route('/<int:service_id>', methods=['PUT'])
# @login_required
def update_service(service_id):
    data = request.json
    service = Service.query.get(service_id)

    if not service:
        return jsonify({'error': 'Service not found'}), 404
    service.service_name = data.get('service_name', service.service_name)
    service.description = data.get('description', service.description)
    service.price = data.get('price', service.price)
    service.time_frame = data.get('time_frame', service.time_frame)
    db.session.commit()
    return jsonify(service.to_service_dict())


@service_routes.route('/<int:service_id>', methods=['DELETE'])
# @login_required
def delete_service(service_id):
    service = Service.query.get(service_id)
    if not service:
        return jsonify({'error': 'Service not found'}), 404
    db.session.delete(service)
    db.session.commit()
    return jsonify({'message': 'Service deleted successfully'}), 204
