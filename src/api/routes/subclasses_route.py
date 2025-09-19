from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from ..model.user_model import User
from ..model.subclasses_model import Subclasses
from ..model_config import db
from flask_jwt_extended import get_jwt_identity, jwt_required

subclasses_bp = Blueprint ('subclasses', __name__, url_prefix='/subclasses')

CORS(subclasses_bp)

@subclasses_bp.route('/', methods=['POST'])
@jwt_required()
def create_subclasses():
    data = request.get_json()
    user_id = get_jwt_identity()

    subclasses_id = data.get("subclasses_id")
    name = data.get("name")
    version = data.get("version")
    short_description = data.get("short_description")
    description = data.get("description")
    spellcasting_ability = data.get("spellcasting_ability")
    can_cast_spells = data.get("can_cast_spells")
    additional_spell_list = data.get("additional_spell_list")
    spell_prepare_type = data.get("spell_prepare_type")
    knows_all_spells = data.get("knows_all_spells")
    spell_learning_style = data.get("spell_learning_style")
    additional_specific_spells = data.get("additional_specific_spells")
    avatar = data.get("avatar")
    large_avatar = data.get("large_avatar")

    new_subclasses = Subclasses(
        subclasses_id=subclasses_id,
        name=name,
        version=version,
        short_description=short_description,
        description=description,
        spellcasting_ability=spellcasting_ability,
        can_cast_spells=can_cast_spells,
        additional_spell_list=additional_spell_list,
        spell_prepare_type=spell_prepare_type,
        knows_all_spells=knows_all_spells,
        spell_learning_style=spell_learning_style,
        additional_specific_spells=additional_specific_spells,
        avatar=avatar,
        large_avatar=large_avatar,
        user_id=int(user_id)
    )

    db.session.add(new_subclasses)
    db.session.commit()

    return jsonify({'msg': 'Subclasses creada',
                    'subclasses': new_subclasses.serialize()}), 201

@subclasses_bp.route('/<int:subclasses_id>', methods=['GET'])
@jwt_required()
def get_subclasses(subclasses_id):
    subclasses = Subclasses.query.get(subclasses_id)
    if not subclasses:
        return jsonify({'msg': 'Subclasses no encontrado'}), 404
    
    return jsonify(subclasses.serialize()), 200

@subclasses_bp.route('/<int:subclasses_id', methods=['DELETE'])
@jwt_required()
def delete_subclasses(subclasses_id):
    subclasses = Subclasses.query.get(subclasses_id)
    if not subclasses:
        return jsonify ({'msg': 'Subclasses no encontrada'}), 404
    
    db.session.delete(subclasses)
    db.commit()

    return jsonify({'msg': 'Subclasses eliminado'}), 200

@subclasses_bp.route('/<int:subclasses_id', methods=['PUT'])
@jwt_required()
def update_subclasses(subclasses_id):
    subclasses = Subclasses.query.get(subclasses_id)
    data = request.get_json()
    if not subclasses:
        return jsonify({'msg': 'Subclasses no encontrada'}), 404
    
    subclasses.subclasses_id = data.get("subclasses_id", subclasses.subclasses_id)
    subclasses.name = data.get("name", subclasses.name)
    subclasses.version = data.get("version", subclasses.version)
    subclasses.short_description = data.get("short_description", subclasses.short_description)
    subclasses.description = data.get("description", subclasses.description)
    subclasses.spellcasting_ability = data.get("spellcasting_ability", subclasses.spellcasting_ability)
    subclasses.can_cast_spells = data.get("can_cast_spells", subclasses.can_cast_spells)
    subclasses.additional_spell_list = data.get("additional_spell_list", subclasses.additional_spell_list)
    subclasses.spell_prepare_type = data.get("spell_prepare_type", subclasses.spell_prepare_type)
    subclasses.knows_all_spells = data.get("knows_all_spells", subclasses.knows_all_spells)
    subclasses.spell_learning_style = data.get("spell_learning_style", subclasses.spell_learning_style)
    subclasses.additional_specific_spells = data.get("additional_specific_spells", subclasses.additional_specific_spells)
    subclasses.avatar = data.get("avatar", subclasses.avatar)
    subclasses.large_avatar = data.get("large_avatar", subclasses.large_avatar)
    
    db.session.commit()

    return jsonify({'msg': 'Subclasses modificado correctamente',
                        'subclasses': subclasses.serialize()}), 200