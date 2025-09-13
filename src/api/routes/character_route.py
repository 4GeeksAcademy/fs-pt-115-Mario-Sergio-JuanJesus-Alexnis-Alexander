from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from ..model.character_model import *
from ..model_config import db
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

character_bp = Blueprint('character', __name__,url_prefix='/character')

CORS(character_bp)

@character_bp.route('/',methods=["GET"])
@jwt_required()
def get_characters():
    data = request.get_json()
    user_id = get_jwt_identity()