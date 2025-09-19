from flask import Blueprint, request, jsonify
from flask_cors import CORS
from ..model.campaign_model import Campaign
from ..model_config import db
from flask_jwt_extended import get_jwt_identity, jwt_required

campaign_bp = Blueprint('campaign', __name__, url_prefix='/user/campaigns')

CORS(
    campaign_bp,
    resources={r"/*": {"origins": "https://psychic-yodel-*-3000.app.github.dev"}},
    allow_headers=["Content-Type", "Authorization"],
    expose_headers=["Content-Type"],
    methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
)

@campaign_bp.route('/', methods=['POST']) 
@jwt_required()
def create_campaign():
    data = request.get_json() or {}
    user_id = get_jwt_identity()

    name = (data.get("name") or "").strip()
    if not name:
        return jsonify({"error": "El campo 'name' es obligatorio"}), 400

    level = data.get("level")
    players = data.get("players")
    try:
        level = int(level) if level not in (None, "") else None
        players = int(players) if players not in (None, "") else None
    except ValueError:
        return jsonify({"error": "level y players deben ser numéricos"}), 400

    new_campaign = Campaign(
        user_id=int(user_id),
        name=name,
        description=data.get("description"),
        setting=data.get("setting"),
        level=level,
        players=players
    )
    try:
        db.session.add(new_campaign)
        db.session.commit()
        return jsonify(new_campaign.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al crear campaña"}), 500


@campaign_bp.route('/', methods=['GET'])  
@jwt_required()
def get_campaigns():
    user_id = get_jwt_identity()
    qs = Campaign.query.filter_by(user_id=user_id).order_by(Campaign.id.desc())
    campaigns = [c.serialize() for c in qs.all()]
    return jsonify(campaigns), 200
