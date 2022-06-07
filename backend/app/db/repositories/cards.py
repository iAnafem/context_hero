from typing import List, Mapping
from app.db.repositories.auth import AuthRepository
from app.db.repositories.base import BaseRepository
from app.db.repositories.sql_templates.card import (
    FETCH_CARDS_LIST,
    UPDATE_GRADE,
    SELECT_WORDS_TO_REVISE,
    SELECT_NEW_WORDS,
)
from app.schemas.card import GradeToUpdate, CardInDB
from logging import getLogger

logger = getLogger(__name__)


class CardsRepository(BaseRepository):
    async def fetch_cards(self, person_id: int) -> List[Mapping]:
        query_params = {"words_to_learn": SELECT_WORDS_TO_REVISE.format(person_id=person_id)}
        cards_to_revise_query = FETCH_CARDS_LIST.format_map(query_params)
        logger.warning(cards_to_revise_query)
        cards = await self.db.fetch_all(query=cards_to_revise_query)
        if len(cards) < 50:
            query_params = {"words_to_learn": SELECT_NEW_WORDS.format(person_id=person_id)}
            query = FETCH_CARDS_LIST.format_map(query_params)
            new_cards = await self.db.fetch_all(query=query)
            cards += new_cards
        return cards[:51]

    async def update_grade(self, grade: GradeToUpdate):
        table_name = f"{grade.lang}_grade"
        query = UPDATE_GRADE.format_map({"table_name": table_name, **grade.dict()})
        return await self.db.fetch_one(query=query)
