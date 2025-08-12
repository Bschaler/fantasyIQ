"""create trade scenarios table

Revision ID: 67aa6e91be45
Revises: d0cf862bb0b3
Create Date: 2025-08-11 20:20:09.831770

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '67aa6e91be45'
down_revision = 'd0cf862bb0b3'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('trade_scenarios',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('my_players', sa.Text(), nullable=False),
        sa.Column('target_players', sa.Text(), nullable=False),
        sa.Column('target_team', sa.String(length=255)),
        sa.Column('analysis_notes', sa.Text()),
        sa.Column('confidence', sa.String(length=255), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    op.drop_table('trade_scenarios')
