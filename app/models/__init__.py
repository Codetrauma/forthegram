from .db import db
from .user import User

class Comments(db.Model):
  __tablename__ = 'comments'

  id = db.Column(db.Integer, primary_key=True)
  comment = db.Column(db.String(500), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)

  def to_dict(self):
    return {
      'id': self.id,
      'comment': self.comment,
      'user_id': self.user_id,
      'post_id': self.post_id
    }
