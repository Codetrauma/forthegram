from flask import Blueprint, request
from flask_login import current_user
from app.models import db, User, Post, Comment, Photos, PostLikes
from app.forms import CreatePostForm
from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)

posts_routes = Blueprint('posts', __name__)


@posts_routes.route('/')
def get_all_posts():
    """
    Gets all the posts and posts photos put together in JSON format
    """
    # posts = Post.query.all()
    # photos = Photos.query.all()

    # posts_photos = []
    # for post in posts:
    #     for photo in photos:
    #         if post.id == photo.post_id:
    #             posts_photos.append({
    #                 'post_id': post.id,
    #                 'photo': photo.photo
    #             })
    # return {
    #     'posts': [post.to_dict() for post in posts],
    #     'posts_photos': posts_photos
    # }


    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}

@posts_routes.route('/<int:post_id>')
def get_post(post_id):
    """
    Gets a post by id
    """
    post = Post.query.get(post_id)
    return {'post': post.to_dict()}

@posts_routes.route('/new', methods=['POST'])
def create_post():
    """
    Creates a post
    """
    form = CreatePostForm()
    print('IM IN THE ROUTE')
    # print('ERRRRRRRRRRRRRRRORS', form.errors)
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
    # if "image" not in request.files:
    #     return {'error': 'Please upload an image'}, 400

    # image = request.files["image"]

    # if not allowed_file(image.filename):
    #     return {'error': 'File type not permitted'}, 400
        print('IN THE ROUTE')
        if form.validate_on_submit():
            data = form.data
            post = Post(user_id=current_user.id, caption=data['caption'])
            db.session.add(post)
            db.session.commit()
            print('FORM IS VALIDATED')
            # image.filename = get_unique_filename(image.filename)
            # upload = upload_file_to_s3(image)

            # if "url" not in upload:
                # return upload, 400

        # url = upload["url"]
            photo = Photos(photo=url, post_id=post.id)
            db.session.add(photo)
            db.session.commit()
            print('SUCCESS!')
            return post.to_dict()
        print('ERRRRRRRRRRRRRRRORS', form.errors)
        return {'errors': form.errors}
    # if "image" not in request.files:
    #     return {"errors": "image required"}, 400

    # image = request.files["image"]

    # if not allowed_file(image.filename):
    #     return {"errors": "file type not permitted"}, 400

    # image.filename = get_unique_filename(image.filename)

    # upload = upload_file_to_s3(image)

    # if "url" not in upload:
    #     # if the dictionary doesn't have a url key
    #     # it means that there was an error when we tried to upload
    #     # so we send back that error message
    #     return upload, 400

    # url = upload["url"]
    # # flask_login allows us to get the current user from the request
    # new_image = Photos(user=current_user, url=url)
    # db.session.add(new_image)
    # db.session.commit()
    # return {"url": url}

@posts_routes.route('/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    """
    Deletes a post
    """
    post = Post.query.get(post_id)
    data = post.to_dict()
    db.session.delete(post)
    db.session.commit()
    return data

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


@posts_routes.route('/<int:post_id>/comments/<int:comment_id>', methods=['PUT'])
def update_comment(post_id, comment_id):
    """
    Updates a comment
    """
    comment = Comment.query.get(comment_id)
    comment.comment = request.json.get('comment')
    db.session.commit()
    return {'comment': comment.to_dict()}

