from flask import Blueprint, request
from app.models import db, User, Post, Comment, Photos, PostLikes


posts_routes = Blueprint('posts', __name__)


@posts_routes.route('/')
def get_all_posts():
    """
    Gets all the posts
    """
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}

@posts_routes.route('/<int:post_id>')
def get_post(post_id):
    """
    Gets a post by id
    """
    post = Post.query.get(post_id)
    return {'post': post.to_dict()}
