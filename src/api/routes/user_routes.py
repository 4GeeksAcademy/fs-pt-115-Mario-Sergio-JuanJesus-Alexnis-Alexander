from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from ..models import User, db
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

user_bp = Blueprint('user', __name__, url_prefix='/user')

CORS(user_bp)

@user_bp.route('/signup', methods=['POST'])
def sign_up():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'msg': 'Rellene todos los campos por favor'}), 400
    
    user_exist = db.session.execute(db.select(User).where(
        User.email == data['email']
    )).scalar_one_or_none()

    if user_exist:
        return jsonify({'message': 'El usuario ya existe'}), 400
    
    new_user = User(email= data['email'], username= data['username'])
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'msg': 'Usuario creado'}), 200

@user_bp.route('/login', methods=['POST'])
def user_login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'msg': 'Rellene todos los campos por favor'}), 400
    
    user = db.session.execute(db.select(User).where(
        User.email == data['email']
    )).scalar_one_or_none()

    if not user:
        return jsonify({'msg': 'Email o contraseña invalidos'}), 400
    
    if user.check_password(data['password']):
        token = create_access_token(identity= str(user.id))
        return jsonify({'msg': 'Inicio de sesión correcto', 'token': token})
    else:
        return jsonify({'msg': 'Email o contraseña invalidos'}), 400
    



    