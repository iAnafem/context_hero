from typing import List, Mapping
from app.db.repositories.auth import AuthRepository
from app.db.repositories.base import BaseRepository
from app.db.repositories.sql_templates.card import FETCH_CARDS_LIST, UPDATE_GRADE
from app.schemas.card import GradeToUpdate, CardInDB
from logging import getLogger

logger = getLogger(__name__)


class CardsRepository(BaseRepository):
    async def fetch_cards(self) -> List[Mapping]:
        cards = await self.db.fetch_all(query=FETCH_CARDS_LIST)
        return cards

    async def update_grade(self, grade: GradeToUpdate):
        table_name = f"{grade.lang}_grade"
        query = UPDATE_GRADE.format_map({"table_name": table_name, **grade.dict()})
        return await self.db.fetch_one(query=query)
