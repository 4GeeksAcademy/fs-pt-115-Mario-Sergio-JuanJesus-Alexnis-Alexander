from flask import Blueprint

# IMPORTAR AQUI LAS RUTAS.BP:
from .user_routes import user_bp




api = Blueprint('api', __name__)




# REGISTRAR LAS RUTAS AQUI:
api.register_blueprint(user_bp)