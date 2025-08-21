"""create player notes table

Revision ID: d0cf862bb0b3
Revises: 8f4997cc8d8e
Create Date: 2025-08-11 20:10:11.116613

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd0cf862bb0b3'
down_revision = '8f4997cc8d8e'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('player_notes',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('player_name', sa.String(length=255), nullable=False),
        sa.Column('position', sa.String(length=255), nullable=False),
        sa.Column('team_abbr', sa.String(length=255)),
        sa.Column('notes', sa.Text(), nullable=False),
        sa.Column('interest_level', sa.String(length=255), nullable=False),
        sa.Column('is_watchlist', sa.Boolean(), default=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade():
    op.drop_table('player_notes')
