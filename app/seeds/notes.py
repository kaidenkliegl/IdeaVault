from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a note to notebook
def seed_notes():
    note1 = User(
       notebook_id=1, title="", content="")
    note2 = User(
        notebook_id=3, title="", content=""))
    note3 = User(
        notebook_id=3, title="", content=""))

    db.session.add(note1)
    db.session.add(note2)
    db.session.add(note3)
    db.session.commit()


    def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()