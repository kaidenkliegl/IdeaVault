from flask.cli import AppGroup
from .users import seed_users, undo_users
from .notes import seed_notes, undo_notes
from .notebooks import seed_notebooks, undo_notebooks
from .tags import seed_tags, undo_tags
from .tasks import seed_tasks, undo_tasks

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_tasks()
        undo_tags()
        undo_notes()
        undo_notebooks()
        undo_users()
    seed_users()
    seed_notebooks()
    seed_notes()
    seed_tags()
    seed_tasks()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_notebooks()
    undo_notes()
    undo_tags()
    undo_tasks()
    # Add other undo functions here
