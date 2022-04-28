from app.db.repositories.base import BaseRepository
from app.db.repositories.sql_templates.card import FETCH_CARDS


class CardRepository(BaseRepository):

    async def fetch_cards(self):
        cards = self.db.fetch_one(query=FETCH_CARDS)
        return cards
