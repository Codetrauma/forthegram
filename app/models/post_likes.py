from .db import db



class PostLikes(db.Model):
    __tablename__ = 'posts_likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)

    user = db.relationship('User', back_populates='user_likes')
    post = db.relationship('Post', back_populates='likes')

    def to_dict(self):
      return {
        'id': self.id,
        'liked': self.liked,
        'user_id': self.user_id,
        'post_id': self.post_id
      }
