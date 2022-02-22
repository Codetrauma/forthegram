from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from wtforms.fields import FileField


class CreatePostForm(FlaskForm):
    """
    Form for creating a post
    """
    image = FileField('image', validators=[DataRequired(message='Please upload a photo')])
    caption = StringField('caption', validators=[Length(max=100, message='Caption must be less than 100 characters')])

class EditPostForm(FlaskForm):
    """
    Form for editing a post
    """
    caption = StringField('caption', validators=[DataRequired()])
