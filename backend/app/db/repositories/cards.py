from app.db.repositories.base import BaseRepository
from app.db.repositories.sql_templates.card import FETCH_CARDS_LIST


class CardsRepository(BaseRepository):
    async def fetch_cards(self):
        cards = await self.db.fetch_all(query=FETCH_CARDS_LIST)
        return cards

    async def update_grade(self, word):
        pass
