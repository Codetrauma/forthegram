from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from wtforms.fields import FileField


class UpdateUserForm(FlaskForm):

  image = FileField('image', validators=[DataRequired(message='Please upload a photo')])
  username = StringField('username')
  full_name = StringField('full_name')
  email = StringField('email')
