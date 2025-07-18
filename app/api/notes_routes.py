from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Notes, Notebook, db
from app.forms import NotesForm

notes_routes = Blueprint('notes', __name__)


# get all notes for a notebook
@notes_routes.route('/notebook/<int:notebook_id>/notes', methods=['GET'])
@login_required
def notes(notebook_id):
    notebook = Notebook.query.get(notebook_id)
    if not notebook:
        return {"error": "Notebook not found"}, 404
    if notebook.user_id != current_user.id:
        return {"error": "Unauthorized"}, 403

    notes = Notes.query.filter_by(notebook_id = notebook_id).all()

    return {"notes": [note.to_dict() for note in notes]}



#create new note in a notebook
@notes_routes.route('/notebook/<int:notebook_id>/notes', methods=['POST'])
@login_required
def new_note(notebook_id):
    form = NotesForm()
    form['csrf_token'].data = request.cookies.get('csrf_token')
    form.title.data = request.json.get('title')
    form.content.data = request.json.get('content')

    notebook = Notebook.query.get(notebook_id)
    if not notebook:
        return {"error": "Notebook does not exist"}, 404

    if notebook.user_id != current_user.id:
        return {"error": "Unauthorized"}, 403

    if form.validate():
        new_note = Notes(
            title=form.title.data,
            content=form.content.data,
            notebook_id=notebook_id,
        )
        db.session.add(new_note)
        db.session.commit()
        return {"note": new_note.to_dict()}, 201

    return {"errors": form.errors}, 400


#get a single note by id. Including the associated tags and tasks.
@notes_routes.route('/<int:id>', methods=["GET"])
@login_required
def get_note(id):
    # query for a note by id
    note = Notes.query.filter_by(id=id).one_or_none()
    # check if a note exists and if the user owns the note
    if note is None or note.notebook.user_id != current_user.id:
        return {"error": "Note not found"}, 404
    return {"note": note.to_dict()}

    
    
#edit a note 
@notes_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_note(id):
    form = NotesForm()
    form['csrf_token'].data = request.cookies.get('csrf_token')
    form.title.data = request.json.get('title')
    form.content.data = request.json.get('content')

    if form.validate_on_submit():
        note = Notes.query.get(id)
        #check if the note exists
        if note is None:
            return {"error": "Note not found"}, 404
    #check if the user owns the note
        if note.notebook.user_id != current_user.id:
            return {"error": "Unauthorized"}, 403

        note.title = form.title.data
        note.content = form.content.data

        db.session.commit()
        return {"note": note.to_dict()}, 200

    return {"errors": form.errors}, 400
    

# Delete a note 
@notes_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_note(id):
    note = Notes.query.filter_by(id = id).one()

    if note is None:
            return {"error": "Note not found"}, 404

    if note.notebook.user_id != current_user.id:
            return {"error": "Unauthorized"}, 403

    db.session.delete(note)
    db.session.commit()

    return { "message": "Note deleted." }, 200

