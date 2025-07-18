from app.models import db, Tag, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tags():
    tag1 = Tag(name="Important", user_id=1)
    tag2 = Tag(name="Work", user_id=1)
    tag3 = Tag(name="Personal", user_id=2)

    db.session.add_all([tag1, tag2, tag3])
    db.session.commit()

def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))

    db.session.commit()

