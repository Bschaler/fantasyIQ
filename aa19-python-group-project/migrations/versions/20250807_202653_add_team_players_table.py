"""add team players table

Revision ID: 8f4997cc8d8e
Revises: b362e6413649
Create Date: 2025-08-07 20:26:53.829305

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8f4997cc8d8e'
down_revision = 'b362e6413649'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('team_players',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('team_id', sa.Integer(), nullable=False),
        sa.Column('player_name', sa.String(length=255), nullable=False),
        sa.Column('position', sa.String(length=255), nullable=False),
        sa.Column('nfl_team', sa.String(length=255)),
        sa.ForeignKeyConstraint(['team_id'], ['teams.id'], ),
        sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    op.drop_table('team_players')
