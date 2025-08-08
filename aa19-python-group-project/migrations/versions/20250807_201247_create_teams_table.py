"""create teams table

Revision ID: b362e6413649
Revises: ffdc0a98111c
Create Date: 2025-08-07 20:12:47.890165

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b362e6413649'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
        op.create_table('teams',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('platform', sa.String(length=255), nullable=False),
        sa.Column('league_name', sa.String(length=255), nullable=False),
        sa.Column('league_size', sa.Integer(), nullable=False),
        sa.Column('scoring_format', sa.String(length=255), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    op.drop_table('teams')

