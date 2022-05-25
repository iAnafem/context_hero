from typing import List, Mapping
from app.db.repositories.auth import AuthRepository
from app.db.repositories.base import BaseRepository
from app.db.repositories.sql_templates.card import FETCH_CARDS_LIST, UPDATE_GRADE
from app.schemas.card import GradeToUpdate, CardInDB


class CardsRepository(BaseRepository):
    async def fetch_cards(self) -> List[Mapping]:
        cards = await self.db.fetch_all(query=FETCH_CARDS_LIST)
        return cards

    async def update_grade(self, grade: GradeToUpdate):
        table_name = f"{grade.lang}_grade"
        return await self.db.fetch_one(
            query=UPDATE_GRADE,
            values={
                "table_name": table_name,
                "person_id": grade.person_id,
                "word_id": grade.word_id,
                "grade": grade.value,
            },
        )
