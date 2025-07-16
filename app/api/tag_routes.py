from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Tag
from app.forms import TagForm

tag_routes = Blueprint('tags', __name__)

#create a tag
@tag_routes.route('api/tags', methods=['POST'])
@login_required
def create_tag():
    form =TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validation_on_submit():
        #check if tag name exist for this user
        existing_tag = Tag.query.filter_by(user_id=current_user.id, name=form.name.data).first()
        if existing_tag:
            return jsonify({'error': 'Tag name already exists.'}), 400

        new_tag = Tag(
            name=form.name.data,
            user_id=current_user.id
        )
        db.session.add(new_tag)
        db.session.commit()
        return jsonify({'tag': {'id': new_tag.id, 'name': new_tag.name}}), 201

    return jsonify({'errors': form.errors}), 400

# get all tags (remember tag models)
@tag_routes.route('api/tags', method=['GET'])
@login_required
def get_tags():
    tags = Tag.query.filter_by(user_id=current_user.id).order_by(tag.name).all()
    return jsonify({'tags': [tag.to_dict() for tag in tags]}) 

# update a tag
@tag_routes.route('api/tags/<int:id>', methods=['PUT'])
@login_required
def update_tag(id):
    tag = Tag.query.filter_by(id=id, user_id=current_user.id).first()
    if not tag:
        return jsonify({'error': 'Tag not found.'}), 404
    
    data = request.get_json()
    new_name = data.get('name')
    if not new_name:
        return jsonify({'error', 'Name is required.'}), 400

        #check for uniqueness
    existing_tag =Tag.query.filter_by(user_id=current_user.id, name=new_name).first()
    if existing_tag and existing_tag.id != tag.id:
        return jsonify({'error': 'Tag name already exists.'}), 400
    
    tag.name = new_name
    db.session.commit()
    return jsonify({'tag', tag.to_dict()})

# delete tag
@tag_routes.route('/api/tags/<int:id>', methods=['DELETE'])
@login_required
def delete_tag(id):
    tag = Tag.query.filter_by(id=id, user_id=current_user.id).first()
    if not tag:
        return jsonify({'error': 'Tag not found.'}), 404
    
    db.session.delete(tag)
    db.session.commit()
    return jsonify({'message': 'Tag deleted.'})

# add a tag to note
@tag_routes.route('/api/notes/<int:note_id>/tags/<int:tag_id>', methods=['POST'])
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
    db.session.delete(note_tag)
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