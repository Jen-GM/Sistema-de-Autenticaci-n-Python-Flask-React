"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


# Create a Flask app
api = Blueprint('api', __name__)


# Create the token
@api.route('/token', methods=['POST'])
def handle_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "admin" or password != "admin":
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200


@api.route('/hello', methods=['GET'])
@jwt_required()
def hello_world():
    result = {
        "message" : "Hello World"
    }
    return jsonify(result), 200
