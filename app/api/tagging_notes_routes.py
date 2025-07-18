from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Notes, Tag, NoteTag, db
# from app.forms import NotesForm

tagging_notes_routes = Blueprint("tagging_notes", __name__)

@tagging_notes_routes.route('/api/notes/<int:note_id>/tags/<int:tag_id>', methods=['POST'])
@login_required
def add_tag_to_note(note_id, tag_id):
    from app.models import Note, NoteTag 

    tag =Tag.query.filter_by(id=tag_id, user_id=current_user.id).first()
    if not tag:
        return jsonify({'error': 'Tag not found.'}), 404
    
    note = Note.query.filter_by(id=note_id, user_id=current_user.id).first()
    if not note:
        return jsonify({'error': 'Note not found.'}), 404

    # prevent duplicate associations
    exists = NoteTag.query.filter_by(note_id=note_id,tag_id=tag_id).first()
    if exists:
        return jsonify({'error': 'Tag already added to note.'}), 400

    note_tag = NoteTag(note_id=note_id, tag_id=tag_id)
    db.session.add(note_tag)
    db.session.commit()
    return jsonify({'message': 'Tag added to note.'})

# remove tag from note
@tag_routes.route('/api/notes/<int:note_id>/tags/<int:tag_id>', methods=['DELETE'])
@login_required
def remove_tag_from_note(note_id, tag_id):
    from app.models import NoteTag

    note_tag = NoteTag.query.filter_by(note_id=note_id, tag_id=tag_id).first()
    if not note_tag:
        return  jsonify({'error': 'Tag not associated with note.'}), 404
    
    db.session.delete(note_tag)
    db.session.commit()
    return jsonify({'message': 'Tag removed from note.'}) 


