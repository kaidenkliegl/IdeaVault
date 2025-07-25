"""initial schema

Revision ID: c10270ca0619
Revises: 
Create Date: 2025-07-23 19:31:52.322252

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'c10270ca0619'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('username', sa.String(length=40), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('hashed_password', sa.String(length=255), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email'),
        sa.UniqueConstraint('username')
    )
    op.create_table('notebooks',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=100), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id']),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tags',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=50), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id']),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table('notes',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('notebook_id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(length=50), nullable=False),
        sa.Column('content', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['notebook_id'], ['notebooks.id']),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table('note_tags',
        sa.Column('note_id', sa.Integer(), nullable=False),
        sa.Column('tag_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['note_id'], ['notes.id']),
        sa.ForeignKeyConstraint(['tag_id'], ['tags.id']),
        sa.PrimaryKeyConstraint('note_id', 'tag_id')
    )
    op.create_table('tasks',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('content', sa.String(length=255), nullable=False),
        sa.Column('is_completed', sa.Boolean(), nullable=True),
        sa.Column('note_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['note_id'], ['notes.id']),
        sa.PrimaryKeyConstraint('id')
    )


 
if environment == "production":
    op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
    op.execute(f"ALTER TABLE notebooks SET SCHEMA {SCHEMA};")
    op.execute(f"ALTER TABLE tags SET SCHEMA {SCHEMA};")
    op.execute(f"ALTER TABLE notes SET SCHEMA {SCHEMA};")
    op.execute(f"ALTER TABLE note_tags SET SCHEMA {SCHEMA};")
    op.execute(f"ALTER TABLE tasks SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('tasks')
    op.drop_table('note_tags')
    op.drop_table('notes')
    op.drop_table('tags')
    op.drop_table('notebooks')
    op.drop_table('users')
