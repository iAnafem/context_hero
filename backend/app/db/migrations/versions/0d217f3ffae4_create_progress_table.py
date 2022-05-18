"""create progress table

Revision ID: 0d217f3ffae4
Revises: 8db0650da4dc
Create Date: 2022-05-18 19:57:24.834832

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic
revision = "0d217f3ffae4"
down_revision = "8db0650da4dc"
branch_labels = None
depends_on = None


def get_created_at(custom_name: str = None, indexed: bool = False) -> sa.Column:
    name = "created_at" if custom_name is None else custom_name
    return (
        sa.Column(
            name,
            sa.TIMESTAMP(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
            index=indexed,
        ),
    )


def create_grade_table() -> None:
    op.create_table(
        "english_grade",
        sa.Column("person_id", sa.Integer, sa.ForeignKey("person.id"), nullable=False),
        sa.Column("word_id", sa.Integer, sa.ForeignKey("english_word.id"), nullable=False),
        sa.Column("grade", sa.Integer, nullable=False, default=0),
        *get_created_at(custom_name="first_attempt", indexed=True),
        sa.Column(
            "last_attempt",
            sa.TIMESTAMP(timezone=True),
            server_default=sa.func.now(),
            onupdate=sa.func.now(),
            nullable=False,
            index=True,
        ),
        sa.PrimaryKeyConstraint("person_id", "word_id", name="english_progress_pk")
    )


def add_created_at_cols() -> None:
    op.add_column("english_phrase", *get_created_at(indexed=True))
    op.add_column("category", *get_created_at(indexed=True))
    op.add_column("translation", *get_created_at(indexed=True))
    op.add_column("english_word", *get_created_at(indexed=True))
    op.add_column("russian_word", *get_created_at(indexed=True))
    op.add_column("person", *get_created_at(indexed=True))


def drop_grade_table() -> None:
    op.drop_table("english_grade")


def drop_created_at_cols() -> None:
    op.drop_column("english_phrase", "created_at")
    op.drop_column("category", "created_at")
    op.drop_column("translation", "created_at")
    op.drop_column("english_word", "created_at")
    op.drop_column("russian_word", "created_at")
    op.drop_column("person", "created_at")


def upgrade() -> None:
    create_grade_table()
    add_created_at_cols()


def downgrade() -> None:
    drop_grade_table()
    drop_created_at_cols()
