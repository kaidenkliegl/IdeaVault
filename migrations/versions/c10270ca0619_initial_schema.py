"""initial schema

Revision ID: c10270ca0619
Revises: 
Create Date: 2025-07-23 19:31:52.322252

"""
from alembic import op
import sqlalchemy as sa

# Define your schema name here
SCHEMA = "ideavault_schema"


# revision identifiers, used by Alembic.
revision = 'c10270ca0619'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # Create schema if it doesn't exist
    op.execute(f"CREATE SCHEMA IF NOT EXISTS {SCHEMA};")

    op.create_table('users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('username', sa.String(length=40), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('hashed_password', sa.String(length=255), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email'),
        sa.UniqueConstraint('username'),
        schema=SCHEMA
    )
    op.create_table('notebooks',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=100), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], [f'{SCHEMA}.users.id']),
        sa.PrimaryKeyConstraint('id'),
        schema=SCHEMA
    )
    op.create_table('tags',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=50), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], [f'{SCHEMA}.users.id']),
        sa.PrimaryKeyConstraint('id'),
        schema=SCHEMA
    )
    op.create_table('notes',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('notebook_id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(length=50), nullable=False),
        sa.Column('content', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['notebook_id'], [f'{SCHEMA}.notebooks.id']),
        sa.PrimaryKeyConstraint('id'),
        schema=SCHEMA
    )
    op.create_table('note_tags',
        sa.Column('note_id', sa.Integer(), nullable=False),
        sa.Column('tag_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['note_id'], [f'{SCHEMA}.notes.id']),
        sa.ForeignKeyConstraint(['tag_id'], [f'{SCHEMA}.tags.id']),
        sa.PrimaryKeyConstraint('note_id', 'tag_id'),
        schema=SCHEMA
    )
    op.create_table('tasks',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('content', sa.String(length=255), nullable=False),
        sa.Column('is_completed', sa.Boolean(), nullable=True),
        sa.Column('note_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['note_id'], [f'{SCHEMA}.notes.id']),
        sa.PrimaryKeyConstraint('id'),
        schema=SCHEMA
    )


def downgrade():
    op.drop_table('tasks', schema=SCHEMA)
    op.drop_table('note_tags', schema=SCHEMA)
    op.drop_table('notes', schema=SCHEMA)
    op.drop_table('tags', schema=SCHEMA)
    op.drop_table('notebooks', schema=SCHEMA)
    op.drop_table('users', schema=SCHEMA)
