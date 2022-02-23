from flask import Blueprint, request
from flask_login import current_user
from app.models import db, User, Post, Comment, Photos, PostLikes


like_routes = Blueprint('likes', __name__)


@like_routes.route('/')
def get_all_likes():
    likes = PostLikes.query.all()
    return {'likes': [like.to_dict() for like in likes]}


@like_routes.route('/<int:post_id>/', methods=['POST'])
def create_like(post_id):
    """
    Creates a like
    """
    post = Post.query.get(post_id)
    if not post:
        return {'errors': 'Post not found'}, 400

    like = PostLikes(user_id=current_user.id, post_id=post_id)
    db.session.add(like)
    db.session.commit()
    return like.to_dict()


@like_routes.route('/<int:id>/', methods=['DELETE'])
def delete_like(id):
    """
    Deletes a like
    """
    like = PostLikes.query.filter_by(user_id=current_user.id, post_id=id).first()
    if not like:
        return {'errors': 'Like not found'}, 400

    db.session.delete(like)
    db.session.commit()
    return like.to_dict()


@like_routes.route('/<int:post_id>/', methods=['GET'])
def get_like(post_id):
    """
    Gets all likes of a post
    """
    likes = PostLikes.query.filter_by(
        post_id=post_id, user_id=current_user.id).all()
    return {'likes': [like.to_dict() for like in likes]}
