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

    name = data.get("name")
    version = data.get("version")
    size = data.get("size")
    speed_walking = data.get("speed_walking")
    speed_burrowing = data.get("speed_burrowing")
    speed_flying = data.get("speed_flying")
    speed_swimming = data.get("speed_swimming")
    short_description = data.get("short_description")
    group = data.get("group")
    description = data.get("description")
    hide_trait = data.get("hide_trait")
    specie_trait = data.get("specie_trait")
    will_have_species = data.get("will_have_species")
    large_avatar = data.get("large_avatar")
    portrait_avatar = data.get("portrait_avatar")

    if not name or not size or not description:
        return jsonify({"msg": "Error al crear Specie" }), 404

    new_specie = Specie(
        name=name,
        version=version,
        size=size,
        speed_walking=speed_walking,
        speed_burrowing=speed_burrowing,
        speed_flying=speed_flying,
        speed_swimming=speed_swimming,
        short_description=short_description,
        group=group,
        description=description,
        hide_trait=hide_trait,
        specie_trait=specie_trait,
        will_have_species=will_have_species,
        large_avatar=large_avatar,
        portrait_avatar=portrait_avatar,

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

    specie.name=data.get("name", specie.name)
    specie.version=data.get("version", specie.version)
    specie.size=data.get("size", specie.size)
    specie.speed_walking=data.get("speed_walking", specie.speed_walking)
    specie.speed_burrowing=data.get("speed_burrowing", specie.speed_burrowing)
    specie.speed_flying=data.get("speed_flying", specie.speed_flying)
    specie.speed_swimming=data.get("speed_swimming", specie.speed_swimming)
    specie.short_description=data.get("short_description", specie.short_description)
    specie.group=data.get("group", specie.group)
    specie.description=data.get("description", specie.description)
    specie.hide_trait=data.get("hide_trait", specie.hide_trait)
    specie.specie_trait=data.get("specie_trait", specie.specie_trait)
    specie.will_have_species=data.get("will_have_species", specie.will_have_species)
    specie.large_avatar=data.get("large_avatar", specie.large_avatar)
    specie.portrait_avatar=data.get("portrait_avatar", specie.portrait_avatar)

    db.session.commit()

    return jsonify({'msg': 'Specie modificada correctamente',
                    'specie': specie.serialize()}), 200
