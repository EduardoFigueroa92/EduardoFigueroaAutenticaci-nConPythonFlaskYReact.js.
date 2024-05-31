"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/users', methods=['GET'])
def handle_users():
    users = User.query.all()
    all_users = list(map(lambda x: x.serialize(), users))
    return jsonify(all_users), 200

@api.route('/users', methods=['POST'])
def add_user():
    request_data = request.get_json()
    if not request_data or 'email' not in request_data or 'password' not in request_data:
        raise APIException('Invalid request body', status_code=400)

    new_user = User(email=request_data['email'])
    new_user.set_password(request_data['password'])
    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.serialize())

@api.route('/login', methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()

    if user is None or not user.check_password(password):
        return jsonify({"msg" : "Invalid email or password"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id})

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.filter.get(current_user_id)
    return jsonify({"id": user.id, "email": user.email}), 200



#Rutas hechas en mentoría
# @api.route('/users', methods=['POST'])
# def add_user():
#     request_data = request.get_json()
#     if not request_data or 'email' not in request_data or 'password' not in request_data:
#         raise APIException('Invalid request body', status_code=400)

#     new_user = User(email=request_data['email'], password=request_data['password'])
#     db.session.add(new_user)
#     db.session.commit()

#     return jsonify(new_user.serialize())

# @api.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     email = data.get("email")
#     password = data.get("password")
#     if not email or not password: 
#         return jsonify({"message":"email and password are requiered"})
#     user = User.query.filter_by(email=email, password=password).first()
#     if not user: 
#         return jsonify({"message":"email or password are not correct"})
#     token = create_access_token(identity = user.id)
#     return jsonify({"message": token})
    
# @api.route('/private', methods=['GET'])
# @jwt_required()
# def validate_token():
#     current_user_id = get_jwt_identity()
#     user = User.query.filter_by(id=current_user_id).first()
#     if not user:
#         raise APIException("user not found", status_code=404)
#     return jsonify("user autenticated"), 200