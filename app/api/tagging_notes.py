from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Notes, Tag
# from app.forms import NotesForm

taggin_notes_routes = Blueprint('tagging_notes', __name__)

@tagging_notes.route("/", ["POST"])