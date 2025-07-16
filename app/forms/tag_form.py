from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length

class TagForm(FlaskForm):
    name = StringField(
        "Tag name", 
        validators=[DataRequired(message="Name must be included."),
                    Length(max=50, message="Name must be under 50 characters.")]
    )
    submit = SubmitField('Create Tag')