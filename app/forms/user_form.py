from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from wtforms.fields import FileField
from app.models import User

def user_exists(form, field):
  username = field.data
  user = User.query.filter(User.username == username).first()
  if user:
    raise ValidationError('Username is already in use.')

class UpdateUserForm(FlaskForm):

  # image = FileField('image', validators=[DataRequired(message='Please upload a photo')])
  full_name = StringField('full_name')
  description = StringField('description')
