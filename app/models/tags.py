from .db import db, environment, SCHEMA

# tags modal

class Tags(db.Modal):
    __tablename__ = "tags"

     if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True),
    name = db.Column(db.String(), nullable=False),
    userId = db.Column(db.Integer, db.ForeignKey(users.id), nullable=False)

    def to_dict(self):
        return {
            id = self.id,
            name = self.name,
            userId = self.userId
        }

    notes = db.relationship('Notes', secondary='note_tags', back_populates='tags')
    users = db.relationship('Users', back_populates='tags')

    