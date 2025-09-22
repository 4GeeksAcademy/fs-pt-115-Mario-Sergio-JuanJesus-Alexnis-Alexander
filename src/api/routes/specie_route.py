from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from ..model.user_model import User
from ..model.specie_model import Specie
from ..extension_config import db
from flask_jwt_extended import get_jwt_identity, jwt_required

specie_bp = Blueprint('specie', __name__, url_prefix='/specie')

CORS(specie_bp)


@specie_bp.route('/', methods=['POST'])
@jwt_required()
def create_specie():
    data = request.get_json()
    user_id = get_jwt_identity()

    short_description = data.get("short_description")
    group = data.get("group")
    description = data.get("description")
    trait_desc = data.get("trait_desc")
    trait = data.get("trait")
    avatar = data.get("avatar")

    new_specie = Specie(
        short_description=short_description,
        group=group,
        description=description,
        trait_desc=trait_desc,
        trait=trait,
        avatar=avatar,
        user_id=int(user_id)
    )

    db.session.add(new_specie)
    db.session.commit()

    return jsonify({'msg': 'Specie creada',
                    'specie': new_specie.serialize()}), 201


@specie_bp.route('/<int:specie_id>', methods=['GET'])
@jwt_required()
def get_specie(specie_id):
    specie = Specie.query.get(specie_id)
    if not specie:
        return jsonify({'msg': 'Specie no encontrada'}), 404

    return jsonify(specie.serialize()), 200


@specie_bp.route('/<int:specie_id>', methods=['DELETE'])
@jwt_required()
def delete_specie(specie_id):
    specie = Specie.query.get(specie_id)
    if not specie:
        return jsonify({'msg': 'Specie no encontrada'}), 404

    db.session.delete(specie)
    db.commit()

    return jsonify({'msg': 'Specie eliminada'}), 200


@specie_bp.route('/<int:specie_id>', methods=['PUT'])
@jwt_required()
def update_specie(specie_id):
    specie = Specie.query.get(specie_id)
    data = request.get_json()
    if not specie:
        return jsonify({'msg': 'Specie no encontrada'}), 404

    specie.specie = data.get("specie", specie.specie)
    specie.short_description = data.get(
        "short_description", specie.short_description)
    specie.group = data.get("group", specie.group)
    specie.description = data.get("description", specie.description)
    specie.trait_desc = data.get("trait_desc", specie.trait_desc)
    specie.trait = data.get("trait", specie.trait)
    specie.avatar = data.get("avatar", specie.avatar)

    db.session.commit()

    return jsonify({'msg': 'Specie modificada correctamente',
                    'specie': specie.serialize()}), 200
