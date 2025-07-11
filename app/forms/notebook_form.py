# app/forms/notbook_form.py

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

# this is the class that uis used to create a form for the notebook
class NotebookForm(FlaskForm):
    name = StringField('Notebook Name', validators=[DataRequired(), Length(max=100)])
