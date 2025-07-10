from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Notes

notes_routes = Blueprint('notes', __name__)


# get all notes for a notebook
@notes_routes.route('/notebook/<int:notebook_id>/notes', methods=['GET'])
@login_required
def notes(notebook_id):
    notes = Notes.query.filter_by(notebook_id = notebook_id).all()
    return {notes: [notes.to_dict() for note in notes]}


#create new note in a notebook
@notes_routes.route('notebooks/<int:notebookId>/notes', methods=['POST'])
@login_required
def notes(notebook_id):
    data = request.get_json()
    tite = data.get("title")
    content = content.get("content")

    new_note = Notes(
        notebook_id = notebook_id,
        title = title, 
        content = content
    )

    db.session.create(new_note)
    db.session.commit()

    return {'note': new_note.to_dict()}, 201

# Delete a note 
@note_routes.route('/<id>', methods=["PUT"])