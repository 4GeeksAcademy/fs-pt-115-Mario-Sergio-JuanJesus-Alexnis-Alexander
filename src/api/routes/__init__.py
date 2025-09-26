from flask import Blueprint

# IMPORTAR LAS RUTAS.BP AQUI:
from .user_route import user_bp
from .magic_items_routes import magics_items_bp
from .spell_route import spell_bp
from .specie_route import specie_bp
from .character_route import character_bp
from .campaign_route import campaign_bp
from .feats_route import feats_bp
from .subclasses_route import subclasses_bp
from .background_route import background_bp
from .monster_route import monster_bp


api = Blueprint('api', __name__)





# REGISTRAR AQUI LOS REGISTER_BP:
api.register_blueprint(user_bp)
api.register_blueprint(magics_items_bp)
api.register_blueprint(spell_bp)
api.register_blueprint(specie_bp)
api.register_blueprint(character_bp)
api.register_blueprint(campaign_bp)
api.register_blueprint(feats_bp)
api.register_blueprint(subclasses_bp)
api.register_blueprint(background_bp)
api.register_blueprint(monster_bp)

