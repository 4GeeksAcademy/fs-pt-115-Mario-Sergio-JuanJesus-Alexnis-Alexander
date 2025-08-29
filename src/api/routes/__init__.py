from flask import Blueprint

# Importar los blueprints:
from .user_routes import user_bp



api = Blueprint('api', __name__)


# Registrar cada ruta:
api.register_blueprint(user_bp)