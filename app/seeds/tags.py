from app.models import db, Notes, environment, SCHEMA
from sqlalchemy.sql import text

def seed_notes():
    note1 = Notes(
        notebook_id=1, title="First Note", content="Content for the first note")
    note2 = Notes(
        notebook_id=3, title="Second Note", content="Content for the second note")
    note3 = Notes(
        notebook_id=3, title="Third Note", content="Another bit of content")

    db.session.add_all([note1, note2, note3])
    db.session.commit()

def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))

    db.session.commit()
