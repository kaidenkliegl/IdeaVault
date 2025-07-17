from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Notes, Tasks

# This is the validator to check if a note exists
def note_exists(form, field):
    """Validator to check if a note exists."""
    note_id = field.data
    note = Notes.query.get(note_id)
    if not note:
        raise ValidationError('Note does not exist.')

# And this is the foorm for creating and updating tasks
class TaskForm(FlaskForm):
    content = StringField('Content', validators=[DataRequired(), Length(max=255)])
    note_id = IntegerField('Note ID', validators=[DataRequired(), note_exists])
    is_completed = BooleanField('Is Completed', default=False)