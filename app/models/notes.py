from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .notes_tags import NoteTag


# notes modal

class Notes(db.Model):
    __tablename__ = 'notes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id=db.Column(db.Integer, primary_key=True)
    notebook_id=db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('notebooks.id')), nullable=False )
    title=db.Column(db.String(50), nullable=False)
    content=db.Column(db.Text, nullable=True )
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    #formatted response 
    def to_dict(self):
        return {
            'id': self.id, 
            'notebook_id': self.notebook_id,
            'title': self.title,
            'content': self.content,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'tasks': [task.to_dict() for task in self.tasks],
            'tags': [tag.to_dict() for tag in self.tags]
        }

    # notes relationships

    notebook = db.relationship('Notebook', back_populates='notes')
    tasks = db.relationship('Task', back_populates='note', cascade='all, delete-orphan')
    tags = db.relationship('Tag', secondary='note_tags', back_populates='notes')





