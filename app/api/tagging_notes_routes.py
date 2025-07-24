from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Notes, Tag, NoteTag, db, Notebook
# from app.forms import NotesForm

tagging_notes_routes = Blueprint("tagging_notes", __name__)

@tagging_notes_routes.route('/notes/<int:note_id>/tags/<int:tag_id>', methods=['POST'])
@login_required
def add_tag_to_note(note_id, tag_id):

    tag =Tag.query.filter_by(id=tag_id, user_id=current_user.id).first()
    if not tag:
        return jsonify({'error': 'Tag not found.'}), 404
    
    note = Notes.query.get(note_id)
    if not note:
        return jsonify({'error': 'Note not found.'}), 404

    notebook = Notebook.query.get(note.notebook_id)
    if not notebook or notebook.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403

    # prevent duplicate associations
    if note in tag.notes:
        return jsonify({'error': 'Tag already added to note.'}), 400

    tag.notes.append(note)
    db.session.commit()
    return jsonify({'message': 'Tag added to note.'})

# remove tag from note
@tagging_notes_routes.route('/notes/<int:note_id>/tags/<int:tag_id>', methods=['DELETE'])
@login_required
def remove_tag_from_note(note_id, tag_id):

    tag =Tag.query.filter_by(id=tag_id, user_id=current_user.id).first()
    if not tag:
        return jsonify({'error': 'Tag not found.'}), 404
    
    note = Notes.query.get(note_id)
    if not note:
        return jsonify({'error': 'Note not found.'}), 404

    
    if note not in tag.notes:
        return  jsonify({'error': 'Tag not associated with note.'}), 404
    
    tag.notes.remove(note)
    db.session.commit()
    return jsonify({'message': 'Tag removed from note.'}) 


