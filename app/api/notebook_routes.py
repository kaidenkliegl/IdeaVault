# app/api/notebook_routes.py
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..models import Notebook, db
from ..forms.notebook_form import NotebookForm

# This is to create the blueprint for the notebook routes
notebook_routes = Blueprint('notebooks', __name__, url_prefix='/api/notebooks')

# This route will hadnle getting all notebooks for the current user
@notebook_routes.route('/', methods=['GET'])
@login_required
def get_notebooks():
    """Get all notebooks for the current user."""

     # Query all notebooks for the current user
    notebooks = Notebook.query.filter_by(user_id=current_user.id).all()
    # This will convert to list of dictionaries
    return jsonify({'notebooks': [nb.to_dict() for nb in notebooks]})

# This route will handle creating a new notebook
@notebook_routes.route('/', methods=['POST'])
@login_required
def create_notebook():
    """Create a new notebook."""

    # Tyhis create a new form instance
    form = NotebookForm() 
    # This sets the CSRF token for the form
    form['csrf_token'].data = request.cookies.get('csrf_token') 

     # This checks if the form is valid
    if form.validate_on_submit():
        notebook = Notebook(
            # This gets the name from the form data
            name=form.data['name'],
            # This sets the user_id to the current user's id
            user_id=current_user.id
        )

        # This adds the notebook to the session
        db.session.add(notebook)
        # This commits the session to save the notebook to the database
        db.session.commit()
        # This returns the notebook as a dictionary
        return jsonify({'notebook': notebook.to_dict()})
    # If the form is not valid, return the errors
    return jsonify({'errors': form.errors}), 400

# This route will handle getting a specific notebook by ID
@notebook_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_notebook(id):
    """Get a specific notebook by ID."""

    # This queries the notebook by ID, or returns a 404 if not found
    notebook = Notebook.query.get_or_404(id)

    # This checks if the notebook belongs to the current user
    if notebook.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized access'}), 403
    # If the notebook is found and belongs to the user, return it as a dictionary
    return jsonify({'notebook': notebook.to_dict()})

# This route will handle updating a notebook by ID
@notebook_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_notebook(id):
    """Update a notebook."""

    # This queries the notebook by ID, or returns a 404 if not found
    notebook = Notebook.query.get_or_404(id)

    # This checks if the notebook belongs to the current user
    if notebook.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized access'}), 403
    # Thiss will create a new form instance for updating the notebook
    form = NotebookForm()

    # This sets the CSRF token for the form
    form['csrf_token'].data = request.cookies.get('csrf_token')

    # This checks if the form is valid
    if form.validate_on_submit():
        # This updates the notebook's name with the data from the form
        notebook.name = form.data['name']
        # This commits the changes to the database
        db.session.commit()
        # This returns the updated notebook as a dictionary
        return jsonify({'notebook': notebook.to_dict()})
    # If the form is not valid, return the errors
    return jsonify({'errors': form.errors}), 400

# This route will handle deleting a notebook by ID
@notebook_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_notebook(id):
    """Delete a notebook."""

    # This queries the notebook by ID, or returns a 404 if not found
    notebook = Notebook.query.get_or_404(id)

    # This checks if the notebook belongs to the current user
    if notebook.user_id != current_user.id:
        # If the notebook does not belong to the user, return an error
        return jsonify({'error': 'Unauthorized access'}), 403
    # This deletes the notebook from the session
    db.session.delete(notebook)
    # This commits the session to remove the notebook from the database
    db.session.commit()
    # This returns a success message
    return jsonify({'message': 'Notebook deleted successfully.'})