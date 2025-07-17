from app.models import db, Task, environment, SCHEMA
from sqlalchemy.sql import text

# Adds tasks to the database
def seed_tasks():
    # Creating some example tasks
    task1 = Task(
        content='Complete project report', is_completed=False, note_id=1)
    task2 = Task(
        content='Grocery shopping', is_completed=False, note_id=2)
    task3 = Task(
        content='Workout', is_completed=False, note_id=3)

    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.commit()

# adding this undo_notebooks() so it resests  the notebooks table and resets the ids,
# so you can reseed data or run tests that expect an empty table.
def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))
    db.session.commit()