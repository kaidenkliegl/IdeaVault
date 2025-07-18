# app/models/task.py

from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

# This class will show the tasks that a user has created within a note
class Task(db.Model):
    __tablename__ = 'tasks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    is_completed = db.Column(db.Boolean, default=False)
    note_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('notes.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    note = db.relationship('Notes', back_populates='tasks')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'is_completed': self.is_completed,
            'note_id': self.note_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }
        
   
