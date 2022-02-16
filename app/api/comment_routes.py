from flask import Blueprint
from app.models import db, Comment

comments_routes = Blueprint('comments', __name__)


@comments_routes.route('/')
def get_all_comments():
  comments = Comment.query.all()
  return {'comments': [comment.to_dict() for comment in comments]}
