"""add roster_position to team_players

Revision ID: 38dcb5a62d26
Revises: 30d9b3a8af33
Create Date: 2025-08-20 16:18:14.000341

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '38dcb5a62d26'
down_revision = '30d9b3a8af33'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('team_players', sa.Column('roster_position', sa.String(length=255), nullable=True))


def downgrade():
    op.drop_column('team_players', 'roster_position')
