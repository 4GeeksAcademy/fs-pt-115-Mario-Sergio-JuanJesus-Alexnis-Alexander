from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from ..model.campaign_model import Campaign
from ..model_config import db
from flask_jwt_extended import get_jwt_identity, jwt_required

campaign_bp = Blueprint('campaigns', __name__, url_prefix='/campaigns')

CORS(campaign_bp)

# Crear campaña
@campaign_bp.route('/', methods=['POST'])
@jwt_required()
def create_campaign():
    data = request.get_json() or {}
    name = (data.get("name") or "").strip()
    user_id = get_jwt_identity()

    if not name:
        return jsonify({"error": "El campo 'name' es obligatorio"}), 400

    new_campaign = Campaign(
        name=name,
        description=data.get("description"),
        setting=data.get("setting"),
        level=data.get("level"),
        players=data.get("players"),
        user_id=int(user_id)
    )

    try:
        db.session.add(new_campaign)
        db.session.commit()
        return jsonify(new_campaign.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Obtener todas las campañas
@campaign_bp.route('/', methods=['GET'])
@jwt_required()
def get_campaigns():
    user_id = get_jwt_identity()
    campaigns = Campaign.query.filter_by(user_id=int(user_id)).all()
    print(campaigns)
    return jsonify([c.serialize() for c in campaigns]), 200