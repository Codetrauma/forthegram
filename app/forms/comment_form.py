from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class CommentForm(FlaskForm):
  comment = StringField('comment', validators=[DataRequired(), Length(max=80, message='Comment must be less than 80 characters')])
