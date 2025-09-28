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

    spell_name = data.get("spell_name")
    spell_level = data.get("spell_level")
    spell_school = data.get("spell_school")
    casting_time = data.get("casting_time")
    casting_time_select = data.get("casting_time_select")
    reaction_casting_time = data.get("reaction_casting_time")
    components = data.get("components")
    material_components = data.get("material_components")
    spell_range = data.get("spell_range")
    range_distance = data.get("range_distance")
    duration_type = data.get("duration_type")
    duration = data.get("duration")
    duration_select = data.get("duration_select")
    description = data.get("description")
    ritual_spell = data.get("ritual_spell")
    at_higher_levels = data.get("at_higher_levels")
    higher_level_scaling = data.get("higher_level_scaling")
    available_for_classes = data.get("available_for_classes")

    if not spell_name or not spell_level or not spell_school or not casting_time or not reaction_casting_time or not material_components or not spell_range or not range_distance or not duration_type or not duration or not duration_select or not description or not available_for_classes:
        return jsonify({'msg': 'Spell y Level son requeridos'}), 400

    new_spell = Spell(
        spell_name=spell_name,
        spell_level=spell_level,
        spell_school=spell_school,
        casting_time=casting_time,
        casting_time_select=casting_time_select,
        reaction_casting_time=reaction_casting_time,
        components=components,
        material_components=material_components,
        spell_range=spell_range,
        range_distance=range_distance,
        duration_type=duration_type,
        duration=duration,
        duration_select=duration_select,
        description=description,
        ritual_spell=ritual_spell,
        at_higher_levels=at_higher_levels,
        higher_level_scaling=higher_level_scaling,
        available_for_classes=available_for_classes,

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
    db.session.commit()

    return jsonify({'msg': 'Spell eliminado'}), 200


@spell_bp.route('/<int:spell_id>', methods=['PUT'])
@jwt_required()
def update_spell(spell_id):
    spell = Spell.query.get(spell_id)
    data = request.get_json()
    if not spell:
        return jsonify({'msg': 'Spell no encontrado'}), 404

    spell.spell = data.get("spell", spell.spell)
    spell.spell_name= data.get("spell_name", spell.spell_name)
    spell.spell_level= data.get("spell_level", spell.spell_level)
    spell.spell_school= data.get("spell_school", spell.spell_school)
    spell.casting_time= data.get("casting_time", spell.casting_time)
    spell.casting_time_select= data.get("casting_time_select", spell.casting_time_select)
    spell.reaction_casting_time= data.get("reaction_casting_time", spell.reaction_casting_time)
    spell.components= data.get("components", spell.components)
    spell.material_components= data.get("material_components", spell.material_components)
    spell.spell_range= data.get("spell_range", spell.spell_range)
    spell.range_distance= data.get("range_distance", spell.range_distance)
    spell.duration_type= data.get("duration_type", spell.duration_type)
    spell.duration= data.get("duration", spell.duration)
    spell.duration_select= data.get("duration_select", spell.duration_select)
    spell.description= data.get("description", spell.description)
    spell.ritual_spell= data.get("ritual_spell", spell.ritual_spell)
    spell.at_higher_levels= data.get("at_higher_levels", spell.at_higher_levels)
    spell.higher_level_scaling= data.get("higher_level_scaling", spell.higher_level_scaling)
    spell.available_for_classes= data.get("available_for_classes", spell.available_for_classes)


    db.session.commit()

    return jsonify({'msg': 'Spell modificado correctamente',
                    'spell': spell.serialize()}), 200
