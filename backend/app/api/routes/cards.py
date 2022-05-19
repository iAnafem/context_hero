from typing import List
from fastapi import APIRouter, Depends
from pydantic import EmailStr

from app.api.dependencies.auth import get_user_from_token
from app.api.dependencies.card import get_grade_from_db
from app.api.dependencies.database import get_repository
from app.db.repositories.auth import AuthRepository
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
    auth_repo: AuthRepository = Depends(get_repository(AuthRepository)),
) -> CardInDB:
    # this is a temporary crutch. Need to add a dependency
    # for getting a person email from an auth token
    person = await auth_repo.get_person_by_email(email=EmailStr("email@example.com"))
