from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from ..model.user_model import User
from ..model.feats_model import Feats
from ..model_config import db
from flask_jwt_extended import get_jwt_identity, jwt_required

feats_bp = Blueprint('feats', __name__, url_prefix='feats')

CORS(feats_bp)

@feats_bp.route('/', methods=['POST'])
@jwt_required()
def create_feats():
    data = request.get_json()
    user_id = get_jwt_identity()

    feats_id = data.get("feats_id")
    name = data.get("name")
    version = data.get("version")
    description = data.get("description")
    snippet = data.get("snippet")
    feats_tags = data.get("feats_tags")

    new_feats = Feats(
        feats_id=feats_id,
        name=name,
        version=version,
        description=description,
        snippet=snippet,
        feats_tags=feats_tags,
        user_id=int(user_id)
    )

    db.session.add(new_feats)
    db.session.commit()

    return jsonify({'msg': 'Feats creada',
                    'feats': new_feats.serialize()}), 201

@feats_bp.route('/<int:feats_id>', methods=['GET'])
@jwt_required()
def get_feats(feats_id):
    feats = Feats.query.get(feats_id)
    if not feats:
        return jsonify({'msg': 'Feats no encontrado'}), 404
    
    return jsonify(feats.serialize()), 200

@feats_bp.route('/<int:feats_id', methods=['DELETE'])
@jwt_required()
def delete_feats(feats_id):
    feats = Feats.query.get(feats_id)
    if not feats:
        return jsonify({'msg': 'Feats no encontrado'}), 404
    
    db.session.delete(feats)
    db.commit()

    return jsonify({'msg': 'Feats eliminado'}), 200

@feats_bp.route('/<int:feats_id', methods=['PUT'])
@jwt_required()
def update_feats(feats_id):
    feats = Feats.query.get(feats_id)
    data = request.get_json()
    if not feats:
        return jsonify({'msg': 'Feats no encontrado'}), 404
    
    feats.feats_id = data.get("feats_id", feats.feats_id)
    feats.name = data.get("name", feats.name)
    feats.version = data.get("version", feats.version)
    feats.description = data.get("description", feats.description)
    feats.snippet = data.get("snippet", feats.snippet)
    feats.feats_tags = data.get("feats_tags", feats.feats_tags)

    db.session.commit()

    return jsonify({'msg': 'Feats modificado correctamente',
                    'feats': feats.serialize()}), 200