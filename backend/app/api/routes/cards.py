from fastapi import APIRouter, Depends
from app.api.dependencies.database import get_repository
from app.db.repositories.cards import CardsRepository
from app.schemas.card import CardInDB
router = APIRouter()


@router.get("/list")
async def fetch_cards_list(
        cards_repo: CardsRepository = Depends(get_repository(CardsRepository))
) -> str:
    cards_list = await cards_repo.fetch_cards()
    return [CardInDB(**row) for row in cards_list]
