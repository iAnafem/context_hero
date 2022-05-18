from typing import List
from fastapi import APIRouter, Depends

from app.api.dependencies.auth import get_user_from_token
from app.api.dependencies.card import get_grade_from_db
from app.api.dependencies.database import get_repository
from app.db.repositories.cards import CardsRepository
from app.schemas.card import CardInDB, GradeInDB

router = APIRouter()


@router.get("/stack")
async def fetch_cards_list(
    cards_repo: CardsRepository = Depends(get_repository(CardsRepository)),
) -> List[CardInDB]:
    cards_stack = await cards_repo.fetch_cards()
    return [CardInDB(**row) for row in cards_stack]


@router.patch(
    "/{lang}/{word_id}",
    response_model=CardInDB,
    name="card:update-grade",
)
async def update_grade(
    cards_repo: CardsRepository = Depends(get_repository(CardsRepository)),
) -> CardInDB:
    pass
