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

@posts_routes.route('/', methods=['POST'])
def create_post():
    """
    Creates a post
    """
    user_id = request.json.get('user_id')
    caption = request.json.get('caption')
    post = Post(user_id=user_id, caption=caption)
    db.session.add(post)
    db.session.commit()
    return {'post': post.to_dict()}

@posts_routes.route('/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    """
    Deletes a post
    """
    post = Post.query.get(post_id)
    db.session.delete(post)
    db.session.commit()
    return {'message': 'Post deleted'}

@posts_routes.route('/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    """
    Updates a post
    """
    post = Post.query.get(post_id)
    post.caption = request.json.get('caption')
    db.session.commit()
    return {'post': post.to_dict()}


@posts_routes.route('/<int:post_id>/comments')
def get_post_comments(post_id):
    """
    Gets all the comments for a post
    """
    post = Post.query.get(post_id)
    return {'comments': [comment.to_dict() for comment in post.comments]}

@posts_routes.route('/<int:post_id>/comments', methods=['POST'])
def create_comment(post_id):
    """
    Creates a comment
    """
    user_id = request.json.get('user_id')
    comment = request.json.get('comment')
    comment = Comment(user_id=user_id, comment=comment)
    post = Post.query.get(post_id)
    post.comments.append(comment)
    db.session.commit()
    return {'comment': comment.to_dict()}

@posts_routes.route('/<int:post_id>/comments/<int:comment_id>', methods=['DELETE'])
def delete_comment(post_id, comment_id):
    """
    Deletes a comment
    """
    comment = Comment.query.get(comment_id)
    post = Post.query.get(post_id)
    post.comments.remove(comment)
    db.session.commit()
    return {'message': 'Comment deleted'}
