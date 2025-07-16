from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Notes
from app.forms import NotesForm

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
def new_note(notebook_id):
    form = NotesForm()
    form['csrf_token'].data = request.cookies.get('csrf_token')
    form.name.data = request.json.get('name')
    form.content.data = request.json.get('content')

    notebook = Notebooks.query.get(notebook_id)
    if not notebook:
        return {"error": "Notebook does not exist"}, 404

    if form.validate():
        new_note = Notes(
            title=form.name.data,
            content=form.content.data,
            notebook_id=notebook_id,
            user_id=current_user.id  
        )
        db.session.add(new_note)
        db.session.commit()
        return {"note": new_note.to_dict()}, 201

    return {"errors": form.errors}, 400


#get a single note by id. Including the associated tags and tasks.
@note_routes.route('/<int:id>', methods=["GET"])
def get_note(id):
    note = Notes.query.filter_by(id = id).one()
    return {"note": note.to_dict()}

    
    
#edit a note 
@note_routes.route('/<int:id>', methods=["PUT"])
def edit_note(id):
    form = NotesForm()
    form['csrf_token'].data = request.cookies.get('csrf_token')
    form.name.data = request.json.get('name')
    form.content.data = request.json.get('content')

    if form.validate():
        note = Notes.query.get(id)
        if note is None:
            return {"error": "Note not found"}, 404

        if note.user_id != current_user.id:
            return {"error": "Unauthorized"}, 403

        note.title = form.name.data
        note.content = form.content.data

        db.session.commit()
        return {"note": note.to_dict()}, 200

    return {"errors": form.errors}, 400
    

# Delete a note 
@note_routes.route('/<int:id>', methods=["DELETE"])
def delete_note(id):
    note = Note.query.filter_by(id = id).one()

    db.session.delete(note)
    db.session.commit()

    return { "message": "Note deleted." }, 200