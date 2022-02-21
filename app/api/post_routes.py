from flask import Blueprint, request
from flask_login import current_user
from app.models import db, User, Post, Comment, Photos, PostLikes
from app.forms import CreatePostForm
from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)
from sqlalchemy import desc

posts_routes = Blueprint('posts', __name__)


@posts_routes.route('/')
def get_all_posts():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}

@posts_routes.route('/<int:post_id>/')
def get_post(post_id):
    """
    Gets a post by id
    """
    post = Post.query.get(post_id)
    return {'post': post.to_dict()}

@posts_routes.route('/new/', methods=['POST'])
def create_post():
    """
    Creates a post
    """
    form = CreatePostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form['image'].data:
        image = form['image'].data
        if not allowed_file(image.filename):
            return {'errors': 'Filetype not allowed'}, 400
        image.filename = get_unique_filename(image.filename)


        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return upload, 400
        url = upload['url']


        if form.validate_on_submit():
            data = form.data
            post = Post(user_id=current_user.id, caption=data['caption'])
            db.session.add(post)
            db.session.commit()


            photo = Photos(photo=url, post_id=post.id)
            db.session.add(photo)
            db.session.commit()
            return post.to_dict()

        return {'errors': form.errors}

@posts_routes.route('/<int:post_id>/', methods=['DELETE'])
def delete_post(post_id):
    """
    Deletes a post
    """
    post = Post.query.get(post_id)
    data = post.to_dict()
    db.session.delete(post)
    db.session.commit()
    return data

@posts_routes.route('/<int:post_id>/', methods=['PUT'])
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

@posts_routes.route('/<int:post_id>/comments/', methods=['POST'])
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

@posts_routes.route('/<int:post_id>/comments/<int:comment_id>/', methods=['DELETE'])
def delete_comment(post_id, comment_id):
    """
    Deletes a comment
    """
    comment = Comment.query.get(comment_id)
    post = Post.query.get(post_id)
    post.comments.remove(comment)
    db.session.commit()
    return {'message': 'Comment deleted'}


@posts_routes.route('/<int:post_id>/comments/<int:comment_id>/', methods=['PUT'])
def update_comment(post_id, comment_id):
    """
    Updates a comment
    """
    comment = Comment.query.get(comment_id)
    comment.comment = request.json.get('comment')
    db.session.commit()
    return {'comment': comment.to_dict()}
