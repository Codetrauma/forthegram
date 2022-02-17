from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from wtforms.fields import FileField


class CreatePostForm(FlaskForm):
    """
    Form for creating a post
    """
    image = FileField('image', validators=[DataRequired(message='Please upload a photo')])
    caption = StringField('caption', validators=[DataRequired()])

class EditPostForm(FlaskForm):
    """
    Form for editing a post
    """
    caption = StringField('caption', validators=[DataRequired()])
