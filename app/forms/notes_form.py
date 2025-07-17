from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length

class NotesForm(FlaskForm):
    title = StringField(
        "Title", 
        validators=[
            DataRequired(message="Name must be included."),
            Length(max=50, message="Name must be under 50 characters.")
        ]
    )
    content = StringField("Content")
    submit = SubmitField('Create Note Page')