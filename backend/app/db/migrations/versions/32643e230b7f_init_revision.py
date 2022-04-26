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


def create_category_table() -> None:
    op.create_table(
        "category",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("name", sa.String),
        sa.Column("language", sa.String)
    )


def create_translation_table() -> None:
    op.create_table(
        "translation",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("eng_w_id", sa.String),
        sa.Column("rus_w_id", sa.String)
    )


def create_english_word_table() -> None:
    op.create_table(
        "english_word",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("word", sa.String, nullable=False),
        sa.Column("explanation", sa.String, nullable=False),
        sa.Column("category_id", sa.Integer, nullable=True),
        sa.Column("translation_id", sa.Integer, nullable=False),
        sa.ForeignKeyConstraint(["category_id"], ["category.id"]),
        sa.ForeignKeyConstraint(["translation_id"], ["translation.id"]),
    )


def create_russian_word_table() -> None:
    op.create_table(
        "russian_word",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("word", sa.String, nullable=False),
        sa.Column("explanation", sa.String, nullable=False),
        sa.Column("category_id", sa.Integer, nullable=True),
        sa.Column("translation_id", sa.Integer, nullable=False),
        sa.ForeignKeyConstraint(["category_id"], ["category.id"]),
        sa.ForeignKeyConstraint(["translation_id"], ["translation.id"]),
    )


def upgrade() -> None:
    create_category_table()
    create_translation_table()
    create_english_word_table()
    create_russian_word_table()


def downgrade() -> None:
    op.drop_table('russian_word')
    op.drop_table('english_word')
    op.drop_table('translation')
    op.drop_table('category')
