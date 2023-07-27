from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from flask_login import current_user, login_required
from app.models import Cash_Register, db


cash_register_routes = Blueprint('cash_register',__name__)

# Get all cash_register
@cash_register_routes.route('', methods=['GET'])
@login_required
def get_register():
    register = Cash_Register.query.filter_by(user_id=current_user.id).first()
    return register.to_cash_register_dict

# Create a new transaction
# @cash_register_routes.route('', methods=['POST'])
# @login_required
# def create_transaction():
#     data = request.get_json()
#     register = Cash_Register(
#         stock_id=data['stock_id'],
#         user_id=data['user_id'],
#         portfolio_id=data['portfolio_id'],
#         transaction_type=data['transaction_type'],
#         total_shares=data['total_shares'],
#         total_price=data['total_price']
#     )
#     db.session.add(register)
#     db.session.commit()
#     return jsonify(register.to_transaction_dict()), 201
