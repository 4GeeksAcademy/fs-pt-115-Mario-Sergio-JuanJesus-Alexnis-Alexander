from flask import Blueprint

# IMPORTAR LAS RUTAS.BP AQUI:
from .user_route import user_bp
from .spell_route import spell_bp



api = Blueprint('api', __name__)





# REGISTRAR AQUI LOS REGISTER.BP:
api.register_blueprint(user_bp)
api.register_blueprint(spell_bp)