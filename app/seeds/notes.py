from app.models import db, Notes, environment, SCHEMA
from sqlalchemy.sql import text


def seed_notes():
    note1 = Note(
       notebook_id=1, title="", content="")
    note2 = Note(
        notebook_id=3, title="", content=""))
    note3 = NOtes(
        notebook_id=3, title="", content=""))

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