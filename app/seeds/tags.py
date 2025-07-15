from app.models import db, Tags, environment, SCHEMA
from sqlalchemy.sql import text


def seed_tags():
    tag1 = Tags(name="", user_id=1)
    tag2 = Tags(name="", user_id=1)
    tag3 = Tags(name="", user_id=2)
    tag4 = Tags(name="", user_id=2)
    tag5 = Tags(name="", user_id=3)

    db.session.add_all([tag1, tag2, tag3, tag4, tag5])
    db.session.commit()

    def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tags"))
        
    db.session.commit()