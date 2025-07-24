
"""initial schema

Revision ID: 55b6e9fff88f
Revises: 
Create Date: 2025-07-23 19:11:19.664950

"""
revision = '55b6e9fff88f'
down_revision = None
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa
from app.models.db import SCHEMA, environment

def upgrade():
    schema = SCHEMA if environment == "production" else None

    if environment == "production":
        op.execute(f"CREATE SCHEMA IF NOT EXISTS {SCHEMA};")

    op.create_table('users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('username', sa.String(length=40), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('hashed_password', sa.String(length=255), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email'),
        sa.UniqueConstraint('username'),
        schema=schema
    )

    op.create_table('notebooks',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=100), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], [f"{schema}.users.id"] if schema else ['users.id']),
        sa.PrimaryKeyConstraint('id'),
        schema=schema
    )

    op.create_table('tags',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=50), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], [f"{schema}.users.id"] if schema else ['users.id']),
        sa.PrimaryKeyConstraint('id'),
        schema=schema
    )

    op.create_table('notes',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('notebook_id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(length=50), nullable=False),
        sa.Column('content', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['notebook_id'], [f"{schema}.notebooks.id"] if schema else ['notebooks.id']),
        sa.PrimaryKeyConstraint('id'),
        schema=schema
    )

    op.create_table('note_tags',
        sa.Column('note_id', sa.Integer(), nullable=False),
        sa.Column('tag_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['note_id'], [f"{schema}.notes.id"] if schema else ['notes.id']),
        sa.ForeignKeyConstraint(['tag_id'], [f"{schema}.tags.id"] if schema else ['tags.id']),
        sa.PrimaryKeyConstraint('note_id', 'tag_id'),
        schema=schema
    )

    op.create_table('tasks',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('content', sa.String(length=255), nullable=False),
        sa.Column('is_completed', sa.Boolean(), nullable=True),
        sa.Column('note_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['note_id'], [f"{schema}.notes.id"] if schema else ['notes.id']),
        sa.PrimaryKeyConstraint('id'),
        schema=schema
    )

    # ### end Alembic commands ###


def downgrade():
    schema = SCHEMA if environment == "production" else None

    op.drop_table('tasks', schema=schema)
    op.drop_table('note_tags', schema=schema)
    op.drop_table('notes', schema=schema)
    op.drop_table('tags', schema=schema)
    op.drop_table('notebooks', schema=schema)
    op.drop_table('users', schema=schema)

    if environment == "production":
        op.execute(f"DROP SCHEMA IF EXISTS {SCHEMA} CASCADE;")

    # ### end Alembic commands ###
