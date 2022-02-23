from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/', methods=['PUT'])
@login_required
def update_user(id):
    user = User.query.get(id)
    user.full_name = request.json['full_name']
    user.username = request.json['username']
    user.email = request.json['email']
    user.description = request.json['description']
    db.session.commit()
    return user.to_dict()

@user_routes.route('/<int:id>/follow/', methods=['POST'])
@login_required
def follow_user(id):
    user = User.query.get(id)
    current_user.followers.append(user)
    db.session.commit()
    return user.to_dict()


@user_routes.route('/<int:id>/unfollow/')
@login_required
def unfollow_user(id):
    user = User.query.get(id)
    current_user.followers.remove(user)
    db.session.commit()
    return user.to_dict()
