# app/api/tasks_routes.py

from flask import Blueprint, request, jsonify
from app.models import db, Task, Notes, Notebook
from flask_login import login_required, current_user
from ..forms.tasks_form import TaskForm

tasks_routes = Blueprint('tasks', __name__)

# This route will handle getting all tasks for the current user
@tasks_routes.route('/', methods=['GET'])
@login_required
def get_tasks():
    """Get all tasks for the current user."""
    # Querys all tasks for the current user
    tasks = Task.query.join(Notes).filter(Notes.id == Task.note_id).join(Notebook).filter(Notebook.user_id == current_user.id).all()
     # This will convert to list of dictionaries
    return {'tasks': [task.to_dict() for task in tasks]}

# Create a new task for a specific note
@tasks_routes.route('/notes/<int:note_id>/tasks', methods=['POST'])
@login_required
def create_task(note_id):
    """Create a new task for a specific note."""
    # Gets the JSON data from the request
    data = request.get_json()
    # Ensure content is provided
    content = data.get('content')

    if not content:
        return {'error': 'Content is required'}, 400
    # Creating a new task instance
    new_task = Task(
        content=content,
        is_completed=False,
        note_id=note_id
    )

    # Adds the new task to the session
    db.session.add(new_task)
    # Commits the session to save the task to the database
    db.session.commit()
    # This will get the newly created task as a dictionary
    return {'task': new_task.to_dict()}, 201 

# Updates a task by ID
@tasks_routes.route('/<int:id>', methods=['PUT']) 
@login_required
def update_task(id):
    """Update a task by ID."""
    # This will ensure the task exists
    task = Task.query.get_or_404(id) 
    # This will get the JSON data from the request
    data = request.get_json() 
    # Ensures content is provided
    content = data.get('content') 
    # Ensures is_completed is provided
    is_completed = data.get('is_completed') 

    # Update content if provided
    if content is not None: 
        task.content = content
    # Update is_completed if provided
    if is_completed is not None: 
        task.is_completed = is_completed
    
    db.session.commit()
    return {'task': task.to_dict()}, 200

# Delete a task by ID
@tasks_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_task(id):
    """Delete a task by ID."""
    # Ensures the task exists
    task = Task.query.get_or_404(id)
    
    db.session.delete(task)
    db.session.commit()
    return {'message': 'Task deleted successfully'}, 200