from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from ..model.magic_items_model import MagicsItems
from ..model_config import db
from flask_jwt_extended import jwt_required, get_jwt_identity

magics_items_bp = Blueprint('magic_items', __name__, url_prefix='/user/magics-items')

CORS(magics_items_bp)


@magics_items_bp.route('/', methods=['GET'])
@jwt_required()
def show_magics_items():
    user_id = get_jwt_identity()
    magics_items = MagicsItems.filter_by(user_id=user_id).all()

    if not magics_items:
        return jsonify({'error': 'No hay ningun item magico'}), 404

    return jsonify([mi.serialize() for mi in magics_items]), 200


@magics_items_bp.route('/<int:magic_item_id>', methods=['GET'])
@jwt_required()
def show_magic_item_id(magic_item_id):
    item_id = MagicsItems.query.get(magic_item_id)

    if not item_id:
        return jsonify({'error':'No hay ningun item magico con esa referencia'}), 400

    return jsonify(item_id.serialize()), 200


@magics_items_bp.route('/', methods=['POST'])
@jwt_required()
def create_magic_item():
    user_id = get_jwt_identity()

    # ***Campos obligatorios***
    data = request.get_json()
    name = data.get('name')
    rarity = data.get('rarity')
    base_item_type = data.get('base_item_type')
    attunement_description = data.get('attunement_description')
    description = data.get('description')

    if not name or not rarity or not base_item_type or not attunement_description or not description:
        return jsonify({'error': 'Rellena los campos obligatorios'}), 400

    # ***Campos opcionales***
    version = data.get('version')
    magic_item_type = data.get('magic_item_type')
    base_armor = data.get('base_armor')
    dex_bonus = data.get('dex_bonus')
    str_requirement = data.get('str_requirement')
    stealth_check = data.get('stealth_check')
    base_weapon = data.get('base_weapon')
    requires_attunement = data.get('requires_attunement', False)

    new_magic_item = MagicsItems(
        name = name,
        rarity = rarity,
        base_item_type = base_item_type,
        attunement_description = attunement_description,
        description = description,
        version = version,
        magic_item_type = magic_item_type,
        base_armor = base_armor,
        dex_bonus = dex_bonus,
        str_requirement = str_requirement,
        stealth_check = stealth_check,
        base_weapon = base_weapon,
        requires_attunement = requires_attunement,
        user_id = user_id
    )

    db.session.add(new_magic_item)
    db.session.commit()

    return jsonify({'msg':'Item magico creado correctamente'}), 200



@magics_items_bp.route('/<int:magic_item_id>', methods=['PUT'])
@jwt_required()
def update_magic_item(magic_item_id):
    item = db.session.get(MagicsItems, magic_item_id)
    data = request.get_json()

    if not item:
        return jsonify({'error':'No hay ningun item magico con esa referencia'}), 404
    
     # ***Campos obligatorios***
    item.name = data.get('name', item.name)
    item.rarity = data.get('rarity', item.rarity)
    item.base_item_type = data.get('base_item_type', item.base_item_type)
    item.attunement_description = data.get('attunement_description', item.attunement_description)
    item.description = data.get('description', item.description)

    if not item.name or not item.rarity or not item.base_item_type or not item.attunement_description or not item.description:
        return jsonify({'error': 'Rellena los campos obligatorios'}), 400

    # ***Campos opcionales***
    item.version = data.get('version', item.version)
    item.magic_item_type = data.get('magic_item_type', item.magic_item_type)
    item.base_armor = data.get('base_armor', item.base_armor)
    item.dex_bonus = data.get('dex_bonus', item.dex_bonus)
    item.str_requirement = data.get('str_requirement', item.str_requirement)
    item.stealth_check = data.get('stealth_check', item.stealth_check)
    item.base_weapon = data.get('base_weapon', item.base_weapon)
    item.requires_attunement = data.get('requires_attunement', item.requires_attunement)

    db.session.commit()

    return jsonify({'msg':'Item magico actualizadp correctamente'}), 200


@magics_items_bp.route('/<int:magic_item_id>', methods=['DELETE'])
@jwt_required()
def delete_magic_item(magic_item_id):
    item = db.session.get(MagicsItems, magic_item_id)

    if not item:
        return jsonify({'error':'No hay ningun item magico con esa referencia'}), 404
    
    db.session.delete(item)
    db.session.commit()

    return jsonify({'msg':'Item magico eliminado correctamente'}), 200
