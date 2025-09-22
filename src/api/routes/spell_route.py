from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from ..model.user_model import User
from ..model.spell_model import Spell
from ..extension_config import db
from flask_jwt_extended import get_jwt_identity, jwt_required

spell_bp = Blueprint('spell', __name__, url_prefix='/spells')

CORS(spell_bp)

@spell_bp.route('/', methods=['POST'])
@jwt_required()
def create_spell():
    data = request.get_json()
    user_id = get_jwt_identity()

    spell = data.get("spell")
    level = data.get("level")
    casting_time = data.get("casting_time")
    reaction_condition = data.get("reaction_condition")
    components_material = data.get("components_material")
    range_distance = data.get("range_distance")
    duration = data.get("duration")
    is_ritual = data.get("is_ritual")
    has_scaling = data.get("has_scaling")
    scaling_type = data.get("scaling_type")

    if not spell or not level:
        return jsonify({'msg': 'Spell y Level son requeridos'}), 400

    new_spell = Spell(
        spell=spell,
        level=level,
        casting_time=casting_time,
        reaction_condition=reaction_condition,
        components_material=components_material,
        range_distance=range_distance,
        duration=duration,
        is_ritual=is_ritual,
        has_scaling=has_scaling,
        scaling_type=scaling_type,
        user_id=int(user_id)
    )

    db.session.add(new_spell)
    db.session.commit()

    return jsonify({'msg': 'Spell creado',
                    'spell': new_spell.serialize()}), 201


@spell_bp.route('/<int:spell_id>', methods=['GET'])
@jwt_required()
def get_spell(spell_id):
    spell = Spell.query.get(spell_id)

    if not spell:
        return jsonify({'msg': 'Spell no encontrado'}), 404

    return jsonify(spell.serialize()), 200


@spell_bp.route('/', methods=['GET'])
@jwt_required()
def all_spell():
    spells = Spell.query.all()
    return jsonify([spell.serialize() for spell in spells]), 200


@spell_bp.route('/<int:spell_id>', methods=['DELETE'])
@jwt_required()
def delete_spell(spell_id):
    spell = Spell.query.get(spell_id)
    if not spell:
        return jsonify({'msg': 'Spell no encontrado'}), 404

    db.session.delete(spell)
    db.commit()

    return jsonify({'msg': 'Spell eliminado'}), 200


@spell_bp.route('/<int:spell_id>', methods=['PUT'])
@jwt_required()
def update_spell(spell_id):
    spell = Spell.query.get(spell_id)
    data = request.get_json()
    if not spell:
        return jsonify({'msg': 'Spell no encontrado'}), 404

    spell.spell = data.get("spell", spell.spell)
    spell.level = data.get("level", spell.level)
    spell.casting_time = data.get ("casting_time", spell.casting_time)
    spell.reaction_condition = data.get ("reaction_condition", spell.reaction_condition)
    spell.components_material = data.get ("components_material", spell.components_material)
    spell.range_distance = data.get ("range_distance", spell.range_distance)
    spell.duration = data.get ("duration", spell.duration)
    spell.is_ritual = data.get ("is_ritual", spell.is_ritual)
    spell.has_scaling = data.get ("has_scaling", spell.has_scaling)
    spell.scaling_type = data.get ("scaling_type", spell.scaling_type)

    db.session.commit()

    return jsonify({'msg': 'Spell modificado correctamente',
                    'spell': spell.serialize()}), 200