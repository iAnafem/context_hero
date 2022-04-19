"""create_test_table

Revision ID: ed996040206c
Revises: 
Create Date: 2021-11-11 20:52:29.340187

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic
revision = "32643e230b7f"
down_revision = None
branch_labels = None
depends_on = None

test_table = "test_table"


def create_english_word_table() -> None:
    op.create_table(
        "english_word",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("word", sa.String, nullable=False),
        sa.Column("explanation", sa.String, nullable=False),
        sa.Column("category_id", sa.Integer, nullable=True),
        sa.Column("translation_id", sa.Integer, nullable=False)
    )


def create_translation_table() -> None:
    op.create_table(
        "translation",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("russian_id", sa.Integer, nullable=True),
        sa.Column("english_id", sa.Integer, nullable=True),
    )


def insert_test_word_entry() -> None:
    op.execute(
        """
        INSERT INTO english_word (word, explanation, category_id, translation_id) 
        VALUES ('testword', 'test explanation!', 1, 1)
        """
    )


def upgrade() -> None:
    create_english_word_table()
    create_translation_table()
    insert_test_word_entry()


def downgrade() -> None:
    op.drop_table("test_table")
