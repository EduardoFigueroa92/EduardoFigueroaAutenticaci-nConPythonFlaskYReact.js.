"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
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

    new_user = User(email=request_data['email'], password=request_data['password'])
    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.serialize())

