from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)

    user = db.relationship('User', back_populates='user_comments')
    post = db.relationship('Post', back_populates='comments')
  
    def to_dict(self):
      return {
        'id': self.id,
        'comment': self.comment,
        'user_id': self.user_id,
        'post_id': self.post_id
      }
