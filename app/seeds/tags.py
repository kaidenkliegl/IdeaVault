from app.models import db, Tags, environment, SCHEMA
from sqlalchemy.sql import text

def seed_notes():
    tag1 = Tag(name="Important", user_id=1)
    tag2 = Tag(name="Work", user_id=1)
    tag3 = Tag(name="Personal", user_id=2)

    db.session.add_all([note1, note2, note3])
    db.session.commit()

def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))

    db.session.commit()
