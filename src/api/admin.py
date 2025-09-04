  
import os
from flask_admin import Admin
from .model_config import db
from .model.user_model import User
from .model.spell_model import Spell
from .model.magic_items_model import MagicsItems
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(MagicsItems, db.session))

    # You can duplicate that line to add mew models
    admin.add_view(ModelView(Spell, db.session))