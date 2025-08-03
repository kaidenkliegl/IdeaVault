from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Tag, Notes
from app.forms import TagForm

tag_routes = Blueprint('tags', __name__)

# all tags for current user
@tag_routes.route("/", methods=["GET"])
@login_required
def get_all_tags():
    tags = Tag.query.filter_by(user_id=current_user.id).all()
    return {'tags': [tag.to_dict() for tag in tags]}

# create a tag
@tag_routes.route("/", methods=["POST"])
@login_required
def create_new_tag():
    form = TagForm()
    form['csrf_token'].data = request.cookies.get('csrf_token')
    form.name.data = request.json.get('name')
    
    if form.validate_on_submit():
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
        return {'tag': new_tag.to_dict()}, 201
    # print("Request JSON:", request.json)
    # print("Form errors:", form.errors)
    # print("Form data:", form.name.data)
    return {'errors': form.errors}, 400


# edit tag
@tag_routes.route("/<int:tag_id>", methods=["PUT"])
@login_required
def edit_tag(tag_id):
    form = TagForm()
    form['csrf_token'].data = request.cookies.get('csrf_token')
    form.name.data = request.json.get('name')

    if form.validate():
        tag = Tag.query.get(tag_id)

        if not tag:
            return {"error": "Tag not found"}, 404

        if tag.user_id != current_user.id:
            return {"error": "Unauthorized"}, 403

        tag.name = form.name.data
        db.session.commit()
        return {"tag": tag.to_dict()}, 200

    return {'errors': form.errors}, 400


# Delete tag
@tag_routes.route("/<int:tag_id>", methods=["DELETE"])
@login_required
def delete_tag(tag_id):
    tag = Tag.query.get(tag_id)

    if not tag:
        return {"error": "Tag not found"}, 404

    if tag.user_id != current_user.id:
        return {"error": "Unauthorized"}, 403

    db.session.delete(tag)
    db.session.commit()

    return {"message": "Tag deleted successfully."}, 200


# filter notes by a tag
@tag_routes.route("/<int:tag_id>/notes", methods=["GET"])
@login_required
def get_notes_from_tag(tag_id):
    tag = Tag.query.get(tag_id)
    if not tag or tag.user_id != current_user.id:
        return {"error": "Tag not found"}

    notes = Notes.query.join(Notes.tags).filter(Tag.id == tag_id).all()
    return {"notes": [note.to_dict() for note in notes]}