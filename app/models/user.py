from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


follows = db.Table(
    "follows",
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("followed_id", db.Integer, db.ForeignKey("users.id"))
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    full_name = db.Column(db.String, nullable=False)
    description = db.Column(db.String(255))
    profile_pic = db.Column(
        db.String, default="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg")

    user_likes = db.relationship('PostLikes', back_populates='user')
    user_posts = db.relationship('Post', back_populates='user')
    user_comments = db.relationship('Comment', back_populates='user')

    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.followed_id == id),
        backref=db.backref("following", lazy="dynamic"),
        lazy="dynamic"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def user_to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
        }

    def post_to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'picture': self.profile_pic,
        }

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'picture': self.profile_pic,
            'fullname': self.full_name,
            'description': self.description,
            'followers': [follower.user_to_dict() for follower in self.following],
            'following': [follow.user_to_dict() for follow in self.followers]
        }
