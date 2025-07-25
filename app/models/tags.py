from .db import db, environment, SCHEMA
from datetime import datetime
from .notes_tags import NoteTag

class Tag(db.Model):
    __tablename__ = 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    # user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    notes = db.relationship( 'Notes', secondary='note_tags', back_populates='tags' )
    user = db.relationship('User', back_populates='tags')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

