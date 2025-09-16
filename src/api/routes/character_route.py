from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from ..model.character_model import Character
from ..model_config import db
from flask_jwt_extended import get_jwt_identity, jwt_required

character_bp = Blueprint('character', __name__,url_prefix='/character')

CORS(character_bp)

@character_bp.route('/',methods=["POST"])
@jwt_required()
def create_character():
    data = request.get_json() or {}
    user_id = get_jwt_identity()
    
    required = ["name", "lvl", "proffesion_id", "specie_id", "background_id"]
    missing = [i for i in required if data.get(i) in (None, "")]
    if missing:
        return jsonify({"msg": "Faltan campos obligatorios", "fields": missing}), 400

    new_character = Character(
        user_id = int(user_id),
        name = data.get("name"),
        lvl = int(data.get("lvl",1)),
        xp = int(data.get("xp",0)),
        proffesion_id=data.get("proffesion_id"),
        subproffesion_id=data.get("subproffesion_id"),
        specie_id=data.get("specie_id"),
        subspecie_id=data.get("subspecie_id"),
        background_id=data.get("background_id"),
        alignment=str(data.get("alignment","neutral")),
        ca=int(data.get("ca",10)),
        speed=int(data.get("speed",30)),
        initiative=int(data.get("initiative",0)),
        hp_max=int(data.get("hp_max",10)),
        hp_current=int(data.get("hp_current",10)),
        language=data.get("language",[]),
        profficiencies=data.get("profficiencies", {}),
    )

    db.session.add(new_character)
    db.session.commit()

    return jsonify({'msg': 'Personaje creado',
                    'character': new_character.serialize()}), 201

@character_bp.route('/integrations/dnd5e/proffesion:import',methods=["POST"])
@jwt_required
def import_proffesions():
    user_id = get_jwt_identity()
    data = request.get_json() or []
    if not isinstance(data, list):
        return jsonify({'msg': 'migrations must be a list'}), 400