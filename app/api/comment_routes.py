from flask import Blueprint, request
from app.models import db, Comment

comments_routes = Blueprint('comments', __name__)


@comments_routes.route('/')
def get_all_comments():
  comments = Comment.query.all()
  return {'comments': [comment.to_dict() for comment in comments]}

@comments_routes.route('/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
  comment = Comment.query.get(comment_id)
  db.session.delete(comment)
  db.session.commit()
  return {'message': 'Comment deleted'}

@comments_routes.route('/<int:comment_id>', methods=['PUT'])
def update_comment(comment_id):
  comment = Comment.query.get(comment_id)
  comment.comment = request.json['text']
  db.session.commit()
  return {'message': 'Comment updated'}
