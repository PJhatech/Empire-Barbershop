from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Client, db

client_routes = Blueprint('clients', __name__)


@client_routes.route('/')
# @login_required
def clients():
    """
    Query for all clients and returns them in a list of client dictionaries
    """
    clients = Client.query.all()
    return [client.to_client_dict() for client in clients]

    # original code
    # return {'clients': [client.to_client_dict() for client in clients]}


@client_routes.route('/<int:id>')
@login_required
def client(id):
    """
    Query for a client by id and returns that client in a dictionary
    """
    client = Client.query.get(id)
    return client.to_barber_dict()


def get_clients():
    print(current_user)
    clients = Client.query.all()
    return [client.to_client_dic() for client in clients]


@client_routes.route('/<int:id>')
@login_required
def get_client_by_id(id):
    client = Client.query.get(id)
    return client.to_client_dict()
