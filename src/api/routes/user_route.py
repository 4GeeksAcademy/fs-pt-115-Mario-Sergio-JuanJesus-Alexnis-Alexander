from flask import Flask, request, jsonify, Blueprint, render_template
from flask_cors import CORS
from ..model.user_model import User
from ..extension_config import db, mail
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_mail import Message
import cloudinary
import cloudinary.uploader
from cloudinary import CloudinaryImage

user_bp = Blueprint('user', __name__, url_prefix='/user', template_folder='../templates')

CORS(user_bp)

@user_bp.route('/signup', methods=['POST'])
def sign_up():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({
            'success': False,
            'msg': 'Rellene todos los campos por favor'}), 400
    
    user_exist = db.session.execute(db.select(User).where(
        User.email == data['email']
    )).scalar_one_or_none()

    if user_exist:
        return jsonify({
            'success': False,
            'message': 'El usuario ya existe'}), 400
    
    new_user = User(email= email, username= username)
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()
    token = create_access_token(str(new_user.id))

    html_body = render_template('welcome.html', username= username)

    message = Message(
        subject = 'Welcome message',
        sender = ('Master Of Infinity', 'team.masterofinfinity@gmail.com'),
        recipients = [email],
        html = html_body
    )

    mail.send(message)

    return jsonify({
        'success': True,
        'msg': 'Usuario creado',
        'token': token,
        'user': new_user.serialize()}), 200

@user_bp.route('/signup-google', methods=['POST'])
def sign_up_google():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    avatar = data.get('image')
    full_name = data.get('full_name')

    
    user_exist = db.session.execute(db.select(User).where(
        User.email == data['email']
    )).scalar_one_or_none()

    if user_exist:
        token = create_access_token(str(user_exist.id))
        return jsonify({
        'success': True,
        'msg': 'Usuario existe',
        'token': token,
        'user': user_exist.serialize()}), 200
    
    new_user = User(email= email, username= username, password= '', avatar= avatar, full_name= full_name)
    db.session.add(new_user)
    db.session.commit()
    token = create_access_token(str(new_user.id))

    html_body = render_template('welcome.html', username= username)

    message = Message(
        subject = 'Welcome message',
        sender = ('Master Of Infinity', 'team.masterofinfinity@gmail.com'),
        recipients = [email],
        html = html_body
    )

    mail.send(message)

    return jsonify({
        'success': True,
        'msg': 'Usuario creado',
        'token': token,
        'user': new_user.serialize()}), 200


@user_bp.route('/login', methods=['POST'])
def user_login():
    data = request.get_json()
    email_or_username = data.get('emailOrUsername')
    password = data.get('password')

    is_email = '@' in email_or_username

    if not email_or_username or not password:
        return jsonify({
            'success': False,
            'msg': 'Rellene todos los campos por favor'}), 400
    
    if is_email:
        user = db.session.execute(db.select(User).where(
            User.email == email_or_username
        )).scalar_one_or_none()
    else:
        user = db.session.execute(db.select(User).where(
            User.username == email_or_username
        )).scalar_one_or_none()

    if not user:
        return jsonify({
            'success': False,
            'msg': 'Email o contraseña invalidos'}), 400
    
    if user.check_password(password):
        token = create_access_token(identity= str(user.id))
        return jsonify({
            'success': True,
            'msg': 'Inicio de sesión correcto',
            'user': user.serialize(),
            'token': token
            })
    else:
        return jsonify({'msg': 'Email o contraseña invalidos'}), 400
    
    
@user_bp.route('/profile', methods=['GET'])
@jwt_required()
def show_user():
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))
     
    if not user:
        return jsonify({
            'success': False,
            'msg': 'Usuario no encontrado'}), 404
    
    return jsonify({
        'success': True,
        'user': user.serialize()}),200


@user_bp.route('/', methods=['PUT'])
@jwt_required()
def upgrade_user():
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))
    data = request.get_json()

    if not user:
        return jsonify({
            'success': False,
            'msg': 'Usuario no encontrado'}), 404
    
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    user.full_name = data.get('full_name', user.full_name)
    user.phone = data.get('phone', user.phone)
    user.gender = data.get('gender', user.gender)
    user.birthdate = data.get('birthdate', user.birthdate)

    db.session.commit()

    return jsonify({
        'success': True,
        'msg': 'Usuario modificado correctamente',
        'user': user.serialize()}), 200


@user_bp.route('/', methods=['DELETE'])
@jwt_required()
def delete_user():
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))

    if not user:
        return jsonify({'msg': 'Usuario no encontrado'}), 404
    
    db.session.delete(user)
    db.commit()

    return jsonify({'msg': 'Usuario eliminado'}), 200

@user_bp.route('/upload-img', methods=['POST'])
@jwt_required()
def upload_image():
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))
    file = request.files.get('file')

    if file:
        upload_result = cloudinary.uploader.upload(file)
        url_image = upload_result['secure_url']
        user.avatar = url_image
        db.session.commit()
        return jsonify(url_image), 201
    return jsonify({'msg': 'Image not found'}), 404

@user_bp.route('/', methods=['GET'])
def all_user():
    users = User.query.all()

    if not users:
        return jsonify({'msg': 'No hay ningun usuario registrado'}), 400
    
    db.session.commit()

    return jsonify([u.serialize() for u in users]), 200


