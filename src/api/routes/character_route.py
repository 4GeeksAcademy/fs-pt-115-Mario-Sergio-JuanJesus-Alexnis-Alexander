from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from ..model.character_model import Character
from ..model_config import db
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_cors import CORS


character_bp = Blueprint('character', __name__, url_prefix='/user/characters')

CORS(character_bp,
    resources={r"/*": {"origins": "https://psychic-yodel-45w4x56vgg9hq976-3000.app.github.dev"}},
    allow_headers=["Content-Type", "Authorization"],
    expose_headers=["Content-Type"],
    methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
     )


@character_bp.route('/', methods=["POST"])
@jwt_required()
def create_character():
    data = request.get_json() or {}
    user_id = get_jwt_identity()

    required = ["name", "class_name", "race_name", "background_name"]
    missing = [i for i in required if data.get(i) in (None, "")]
    if missing:
        return jsonify({"msg": "Faltan campos obligatorios", "fields": missing}), 400

    new_character = Character(
        user_id=int(user_id),
        name=data.get("name"),
        class_name=data.get("class_name"),
        race_name=data.get("race_name"),
        background_name=data.get("background_name")
    )

    db.session.add(new_character)
    db.session.commit()

    return jsonify({'msg': 'Personaje creado',
                    'character': new_character.serialize()}), 201



@character_bp.route('/', methods=['GET'])
@jwt_required()
def show_characters():
    user_id = get_jwt_identity()
    character_list = Character.query.filter_by(user_id=user_id).all()

    return jsonify([mi.serialize() for mi in character_list]), 200


@character_bp.route('/<int:character_id>', methods=['GET'])
@jwt_required()
def show_character_id(character_id):
    item_id = db.session.get(character_id)

    if not item_id:
        return jsonify({'error': 'No hay ningun personaje con esa identificación'}), 400

    return jsonify(item_id.serialize()), 200

@character_bp.route('/<int:character_id>', methods=['PUT'])
@jwt_required()
def update_character(character_id):
    item = db.session.get(Character, character_id)
    data = request.get_json()

    if not item:
        return jsonify({'error': 'No hay ningun personaje con esa referencia'}), 404
    

    if not item.name or not item.class_name or not item.race_name or not item.background_name:
        return jsonify({'error': 'Rellena los campos obligatorios'}), 400

    db.session.commit()

    return jsonify({'msg': 'Personaje actualizado correctamente'}), 200


@character_bp.route('/<int:character_id>', methods=['DELETE'])
@jwt_required()
def delete_character(character_id):
    item = db.session.get(Character, character_id)

    if not item:
        return jsonify({'error': 'No hay ningun personaje con esa identificación'}), 404

    db.session.delete(item)
    db.session.commit()

    return jsonify({'msg': 'Personaje eliminado correctamente'}), 200
