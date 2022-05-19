from app.db.repositories.auth import AuthRepository
from app.db.repositories.base import BaseRepository
from app.db.repositories.sql_templates.card import FETCH_CARDS_LIST, UPDATE_GRADE


class CardsRepository(BaseRepository):
    async def fetch_cards(self):
        cards = await self.db.fetch_all(query=FETCH_CARDS_LIST)
        return cards

    async def update_grade(self, lang: str, word_id: int, value: int, person_id: int):
        table_name = f"{lang}_grade"
        updated_grade_id = await self.db.fetch_one(
            query=UPDATE_GRADE,
            values={
                "table_name": table_name,
                "person_id": person_id,
                "word_id": word_id,
                "grade": value,
            },
        )
