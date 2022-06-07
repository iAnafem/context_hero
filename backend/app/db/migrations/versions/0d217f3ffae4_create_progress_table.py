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


def get_created_column(custom_name: str = None, indexed: bool = False) -> sa.Column:
    name = "created" if custom_name is None else custom_name
    return sa.Column(
        name,
        sa.TIMESTAMP(timezone=True),
        server_default=sa.func.now(),
        nullable=False,
        index=indexed,
    )


def create_updated_trigger() -> None:
    op.execute(
        """
        CREATE OR REPLACE FUNCTION update_updated_column()
            RETURNS TRIGGER AS
        $$
        BEGIN
            NEW.updated = now();
            RETURN NEW;
        END;
        $$ language 'plpgsql';
        """
    )


def create_grade_table() -> None:
    op.create_table(
        "english_grade",
        sa.Column("person_id", sa.Integer, sa.ForeignKey("person.id"), nullable=False),
        sa.Column("word_id", sa.Integer, sa.ForeignKey("english_word.id"), nullable=False),
        sa.Column("grade", sa.Integer, nullable=False, default=0),
        get_created_column(),
        sa.Column(
            "updated",
            sa.TIMESTAMP(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("person_id", "word_id", name="english_progress_pk"),
    )
    op.execute(
        """
        CREATE TRIGGER update_english_grade_modtime
            BEFORE UPDATE
            ON english_grade
            FOR EACH ROW
        EXECUTE PROCEDURE update_updated_column();
        """
    )


def add_created_at_cols() -> None:
    op.add_column("english_phrase", get_created_column())
    op.add_column("category", get_created_column())
    op.add_column("translation", get_created_column())
    op.add_column("english_word", get_created_column())
    op.add_column("russian_word", get_created_column())
    op.add_column("person", get_created_column())


def drop_grade_table() -> None:
    op.drop_table("english_grade")


def drop_created_at_cols() -> None:
    op.drop_column("english_phrase", "created")
    op.drop_column("category", "created")
    op.drop_column("translation", "created")
    op.drop_column("english_word", "created")
    op.drop_column("russian_word", "created")
    op.drop_column("person", "created")


def upgrade() -> None:
    create_updated_trigger()
    create_grade_table()
    add_created_at_cols()


def downgrade() -> None:
    drop_grade_table()
    drop_created_at_cols()
