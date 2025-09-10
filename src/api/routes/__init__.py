from flask import Blueprint

# IMPORTAR LAS RUTAS.BP AQUI:
from .user_route import user_bp
from .magic_items_routes import magics_items_bp
from .spell_route import spell_bp
from .specie_route import specie_bp


api = Blueprint('api', __name__)





# REGISTRAR AQUI LOS REGISTER_BP:
api.register_blueprint(user_bp)
api.register_blueprint(magics_items_bp)
api.register_blueprint(spell_bp)
api.register_blueprint(specie_bp)
