from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from ..model.user_model import User
from ..model.spell_model import Spell
from ..model.specie_model import Specie
from ..model.background_model import Background
from ..model_config import db
from flask_jwt_extended import get_jwt_identity, jwt_required

background_bp = Blueprint('background', __name__, url_prefix='/background')

CORS(background_bp)


@background_bp.route('/', methods=['POST'])
@jwt_required()
def create_background():
    data = request.get_json()
    user_id = get_jwt_identity()

    background_name = data.get("background_name")
    base_description = data.get("base_description")
    habilities_description = data.get("habilities_description")
    feats_description = data.get("feats_description")
    skill_proficiencies_description = data.get("skill_proficiencies_description")
    tool_proficiencies_description = data.get("tool_proficiencies_description")
    languages_description = data.get("languages_description")
    equipment_description = data.get("equipment_description")
    specific_table_name = data.get("specific_table_name")
    specific_tabla_desc = data.get("specific_tabla_desc")
    feature = data.get("feature")
    feature_desc = data.get("feature_desc")
    variant = data.get("variant")
    variant_desc = data.get("variant_desc")
    variant_feature = data.get("variant_feature")
    variant_feature_desc = data.get("variant_feature_desc")
    suggested_characteristics = data.get("suggested_characteristics")
    spell_list_introduction = data.get("spell_list_introduction")
    spell_list_extended = data.get("spell_list_extended")
    contacts_list = data.get("contacts_list")

    new_background = Background(
        background_name=background_name,
        base_description=base_description,
        habilities_description=habilities_description,
        feats_description=feats_description,
        skill_proficiencies_description=skill_proficiencies_description,
        tool_proficiencies_description=tool_proficiencies_description,
        languages_description=languages_description,
        equipment_description=equipment_description,
        specific_table_name=specific_table_name,
        specific_tabla_desc=specific_tabla_desc,
        feature=feature,
        feature_desc=feature_desc,
        variant=variant,
        variant_desc=variant_desc,
        variant_feature=variant_feature,
        variant_feature_desc=variant_feature_desc,
        suggested_characteristics=suggested_characteristics,
        spell_list_introduction=spell_list_introduction,
        spell_list_extended=spell_list_extended,
        contacts_list=contacts_list,
        user_id=int(user_id)
    )

    db.session.add(new_background)
    db.session.commit()

    return jsonify({'msg': 'Background creado',
                    'background': new_background.serialize()}), 201

@background_bp.route('/<int:background_id>', methods=['GET'])
@jwt_required()
def get_background(background_id):
    backgrond = Background.query.get(background_id)
    if not backgrond:
        return jsonify({'msg': 'Background no encontrado'}), 404
    
    return jsonify(backgrond.serialize()), 200

@background_bp.route('/<int:background_id', methods=['DELETE'])
@jwt_required()
def delete_background(background_id):
    background = Background.query.get(background_id)
    if not background:
        return jsonify ({'msg': 'Background no encontrado'}), 404
    
    db.session.delete(background)
    db.commit()

    return jsonify({'msg': 'Background eliminado'}), 200

@background_bp.route('/<int:background_id', methods=['PUT'])
@jwt_required()
def update_background(background_id):
    background = Background.query.get(background_id)
    data = request.get_json()
    if not background:
        return jsonify({'msg': 'Background no encontrado'}), 404
    
    background.background_name = data.get("background_name", background.background_name)
    background.base_description = data.get("base_description", background.base_description)
    background.habilities_description = data.get("habilities_description", background.habilities_description)
    background.feats_description = data.get("feats_description", background.feats_description)
    background.skill_proficiencies_description = data.get("skill_proficiencies_description", background.skill_proficiencies_description)
    background.tool_proficiencies_description = data.get("tool_proficiencies_description", background.tool_proficiencies_description)
    background.languages_description = data.get("languages_description", background.languages_description)
    background.equipment_description = data.get("equipment_description", background.equipment_description)
    background.specific_table_name = data.get("specific_table_name", background.specific_table_name)
    background.specific_tabla_desc = data.get("specific_tabla_desc", background.specific_tabla_desc)
    background.feature = data.get("feature", background.feature)
    background.feature_desc = data.get("feature_des", background.feature_desc)
    background.variant = data.get("variant", background.variant)
    background.variant_desc = data.get("variant_desc", background.variant_desc)
    background.variant_feature = data.get("variant_feature", background.variant_feature)
    background.variant_feature_desc = data.get("variant_feature_desc", background.variant_feature_desc)
    background.suggested_characteristics = data.get("suggested_characteristics", background.suggested_characteristics)
    background.spell_list_introduction = data.get("spell_list_introduction", background.spell_list_introduction)
    background.spell_list_extended = data.get("spell_list_extended", background.spell_list_extended)
    background.contacts_list = data.get("contacts_list", background.contacts_list)

    db.session.commit()

    return jsonify({'msg': 'Background modificado correctamente',
                        'background': background.serialize()}), 200
    