"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Campaign
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

# ==========================
#   RUTAS DE CAMPAIGN

@api.route('/campaigns', methods=['POST'])
def create_campaign():
    data = request.get_json() or {}
    name = (data.get("name") or "").strip()

    if not name:
        return jsonify({"error": "El campo 'name' es obligatorio"}), 400

    new_campaign = Campaign(
        name=name,
        description=data.get("description"),
        setting=data.get("setting"),
        level=data.get("level"),
        players=data.get("players")
    )

    try:
        db.session.add(new_campaign)
        db.session.commit()
        return jsonify(new_campaign.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al crear campaña"}), 500


@api.route('/campaigns', methods=['GET'])
def get_campaigns():
    campaigns = Campaign.query.all()
    return jsonify([c.serialize() for c in campaigns]), 200