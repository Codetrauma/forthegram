from .db import db


class Photos(db.Model):
  __tablename__ = 'photos'

  id = db.Column(db.Integer, primary_key=True)
  photo = db.Column(db.String(500), nullable=False)
  post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)

  post = db.relationship('Posts', back_populates='photos')
