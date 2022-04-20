"""create phrase, user_word tables

Revision ID: ad5a45ca26e3
Revises: 32643e230b7f
Create Date: 2022-04-20 20:28:07.292863

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic
revision = 'ad5a45ca26e3'
down_revision = '32643e230b7f'
branch_labels = None
depends_on = None


def create_user_table() -> None:
    pass

def create_phrase_table() -> None:
    op.create_table(
        "english_phrase",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("word_id", sa.Integer, nullable=False),
        sa.Column("user_id", sa.Integer, nullable=False),
        sa.Column("prefix", sa.String(length=255), nullable=True),
        sa.Column("suffix", sa.String(length=255), nullable=True),
        sa.Column("translation", sa.String, nullable=False),
        sa.ForeignKeyConstraint(["user_id", "user.id"], ["word_id", "english_word.id"], ),
    )
    op.create_index("english_phrase__user", "english_phrase", "user_id")


def upgrade() -> None:
    create_phrase_table()
    op.drop_table("test_table")


def downgrade() -> None:
    op.drop_table("english_phrase")
    op.drop_table("user")
