from app.forms.user_form import UpdateUserForm
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User

user_routes = Blueprint('users', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


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
    form = UpdateUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        user = User.query.get(id)
        user.full_name = data['full_name']
        user.description = data['description']
        db.session.commit()
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@user_routes.route('/<int:id>/follow/', methods=['POST'])
@login_required
def follow_user(id):
    user = User.query.get(id)
    no_go = False
    for each in current_user.followers:
        if each.id == user.id:
            no_go = True
            return {'errors': 'You are already following this user.'}, 401
    if no_go == False:
        current_user.followers.append(user)
        db.session.commit()
        return user.to_dict()
    else:
        return {'errors': 'You are already following this user.'}, 401
    # user = User.query.get(id)
    # user_to_follow = current_user.to_dict()['following']
    # # print('CURRENT USER', user.id, [user['id'] for user in user_to_follow], user.id in [user['id'] for user in user_to_follow])
    # if user in [user['id'] for user in user_to_follow]:
    #     return {'errors': 'You are already following this user'}, 401

    # current_user.followers.append(user)
    # db.session.commit()
    # return user.to_dict()


@user_routes.route('/<int:id>/unfollow/')
@login_required
def unfollow_user(id):
    user = User.query.get(id)
    go = False
    for each in current_user.followers:
        if each.id == user.id:
            go = True
    if go == True:
        current_user.followers.remove(user)
        db.session.commit()
        return user.to_dict()
    else:
        return {'errors': "You either don't follow this user, or you need to stop abusing that button!"}
    # user = User.query.get(id)
    # current_user.followers.remove(user)
    # db.session.commit()
    # return user.to_dict()
