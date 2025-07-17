from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Notes

notes_routes = Blueprint('notes', __name__)


# get all notes for a notebook
@notes_routes.route('/notebook/<int:notebook_id>/notes', methods=['GET'])
@login_required
def notes(notebook_id):
    notes = Notes.query.filter_by(notebook_id = notebook_id).all()
    return {"notes": [notes.to_dict() for note in notes]}


#create new note in a notebook
@notes_routes.route('notebooks/<int:notebookId>/notes', methods=['POST'])
@login_required
def new_note(notebook_id):
    data = request.get_json()
    title = data.get("title")
    content = data.get("content")

    new_note = Notes(
        notebook_id = notebook_id,
        title = title, 
        content = content
    )

    db.session.add(new_note)
    db.session.commit()

    return {'note': new_note.to_dict()}, 201

#get a single note by id. Including the associated tags and tasks.
@notes_routes.route('/<int:id>', methods=["GET"])
def get_note(id):
    note = Notes.query.filter_by(id = id).one()
    return {"note": note.to_dict()}
    
#edit a note 
@notes_routes.route('/<int:id>', methods=["PUT"])
def edit_note(id):
    note = Notes.query.filter_by(id=id).one()

    data = request.get_json()
    title = data.get("title")
    content = data.get("content")

    if title is not None:
        note.title = title
    if content is not None:
        note.content = content

    db.session.commit()
    
    return {note: note.to_dict()}, 200
    

# Delete a note 
@notes_routes.route('/<int:id>', methods=["DELETE"])
def delete_note(id):
    note = Note.query.filter_by(id = id).one()

    db.session.delete(note)
    db.session.commit()

    return { "message": "Note deleted." }, 200