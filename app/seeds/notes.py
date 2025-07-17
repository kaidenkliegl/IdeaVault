from app.models import db, Notes, environment, SCHEMA
from sqlalchemy.sql import text


def seed_notes():
    note1 = User(
       notebook_id=1, title="Meeting notes", content="Try to motivate the workers. Discuss the tardiness.")
    note2 = User(
        notebook_id=3, title="Grocery List", content="Bread, Corn, Milk, Steak")
    note3 = User(
        notebook_id=3, title="New Project", content="Create a book organizing app where you can see what books you have read and what books you would Like to read.")

    db.session.add(note1)
    db.session.add(note2)
    db.session.add(note3)
    db.session.commit()


def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))
        
    db.session.commit()