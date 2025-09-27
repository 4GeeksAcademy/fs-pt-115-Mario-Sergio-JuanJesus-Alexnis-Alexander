from flask import Flask, request, jsonify, Blueprint
from ..model.monster_model import Monster
from ..extension_config import db
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity

monster_bp = Blueprint('monster', __name__, url_prefix='/user/monster')

CORS(monster_bp)

@monster_bp.route('/', methods=["POST"])
@jwt_required()
def create_monster():
    data = request.get_json() or {}
    user_id = get_jwt_identity()

    required = ["name", "type", "size", "challenge"]
    missing = [i for i in required if data.get(i) in (None, "")]
    if missing:
        return jsonify({"msg": "Faltan campos obligatorios", "fields": missing}), 400

    new_monster = Monster(
        user_id=int(user_id),
        name=data.get("name"),
        type=data.get("type"),
        subtype=data.get("subtype"),
        size=data.get("size"),
        challenge=data.get("challenge")
    )

    db.session.add(new_monster)
    db.session.commit()

    return jsonify({'msg': 'Monstruo creado',
                    'monster': new_monster.serialize()}), 201


@monster_bp.route('/', methods=['GET'])
@jwt_required()
def show_monsters():
    user_id = get_jwt_identity()
    monster_list = Monster.query.filter_by(user_id=user_id).all()

    return jsonify([mi.serialize() for mi in monster_list]), 200


@monster_bp.route('/<int:monster_id>', methods=['GET'])
@jwt_required()
def show_monster_id(monster_id):
    item_id = db.session.get(monster_id)

    if not item_id:
        return jsonify({'error': 'No hay ningun Monstruo con esa identificación'}), 400

    return jsonify(item_id.serialize()), 200


@monster_bp.route('/<int:monster_id>', methods=['PUT'])
@jwt_required()
def update_monster(monster_id):
    item = db.session.get(Monster, monster_id)
    data = request.get_json()

    if not item:
        return jsonify({'error': 'No hay ningun Monstruo con esa referencia'}), 404

    if not item.name or not item.class_name or not item.race_name or not item.background_name:
        return jsonify({'error': 'Rellena los campos obligatorios'}), 400

    db.session.commit()

    return jsonify({'msg': 'Monstruo actualizado correctamente'}), 200


@monster_bp.route('/<int:monster_id>', methods=['DELETE'])
@jwt_required()
def delete_monster(monster_id):
    item = db.session.get(Monster, monster_id)

    if not item:
        return jsonify({'error': 'No hay ningun Monstruo con esa identificación'}), 404

    db.session.delete(item)
    db.session.commit()

    return jsonify({'msg': 'Monstruo eliminado correctamente'}), 200
