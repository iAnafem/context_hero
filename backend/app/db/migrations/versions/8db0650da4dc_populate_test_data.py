"""populate test data

Revision ID: 8db0650da4dc
Revises: ad5a45ca26e3
Create Date: 2022-04-26 20:24:38.301981

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic
revision = '8db0650da4dc'
down_revision = 'ad5a45ca26e3'
branch_labels = None
depends_on = None


def insert_test_data() -> None:
    op.execute(
        """
        INSERT INTO person (nick_name, email, first_name, last_name)
        values ('iAnafem', 'email@example.com', 'Dmitriy', 'Pronkin')
        """
    )
    op.execute(
        """
        INSERT INTO category (name, language)
        values ('test category', 'English')
        """
    )
    for num in range(1, 51):
        op.execute(
            """
            INSERT INTO translation (eng_w_id, rus_w_id)
            values ({num}, {num})
            """.format(num=num)
        )
        op.execute(
            """
            INSERT INTO english_word (word, explanation, category_id)
            values ('test_word_{num}', 'test explanation of word {num}', 1)
            """.format(num=num)
        )
        op.execute(
            """
            INSERT INTO russian_word (word, explanation, category_id)
            values ('перевод_слова_{num} вариант 1', 'Объяснение слова {num}', 1)
            """.format(num=num)
        )

        op.execute(
            """
            INSERT INTO english_phrase (word_id, person_id, prefix, suffix, translation)
            values ({num}, 1, 'This is the test phrase number {num} and', '- the correct answer', 'Это перевод тестовой фразы номер {num}')
            """.format(num=num)
        )
    for num, rus_num in zip(range(1, 51), range(50, 101)):
        op.execute(
            """
            INSERT INTO translation (eng_w_id, rus_w_id)
            values ({num}, {rus_num})
            """.format(num=num, rus_num=rus_num)
        )
        op.execute(
            """
            INSERT INTO russian_word (word, explanation, category_id)
            values ('перевод_слова_{num} вариант 2', 'Объяснение слова {rus_num}', 1)
            """.format(num=num, rus_num=rus_num )
        )

def upgrade() -> None:
    insert_test_data()


def downgrade() -> None:
    pass

