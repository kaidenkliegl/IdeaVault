# app/seeds/notebooks.py

from app.models import db, Notebook, User, environment, SCHEMA
from sqlalchemy.sql import text

# This function will seed the notebooks table
def seed_notebooks():
    
    nb1 = Notebook(name='Work', user_id=1)
    nb2 = Notebook(name='Personal', user_id=2)
    nb3 = Notebook(name='Ideas', user_id=3)

    db.session.add(nb1)
    db.session.add(nb2)
    db.session.add(nb3)
    db.session.commit()

# adding this undo_notebooks() so it resests  the notebooks table and resets the ids,
# so you can reseed data or run tests that expect an empty table.
def undo_notebooks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SHEMA}.notebooks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notebooks"))
    db.session.commit()