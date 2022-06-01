from typing import List, Any
from fastapi import APIRouter, Depends, Body
from pydantic import EmailStr

from app.api.dependencies.auth import get_user_from_token
from app.api.dependencies.card import get_grade_from_db
from app.api.dependencies.database import get_repository
from app.db.repositories.auth import AuthRepository
from app.db.repositories.cards import CardsRepository
from app.schemas.card import CardInDB, GradeInDB, GradeToUpdate

router = APIRouter()


@router.get("/stack")
async def fetch_cards_list(
    cards_repo: CardsRepository = Depends(get_repository(CardsRepository)),
    auth_repo: AuthRepository = Depends(get_repository(AuthRepository)),
) -> List[CardInDB]:
    person = await auth_repo.get_person_by_email(email=EmailStr("email@example.com"))
    cards_stack = await cards_repo.fetch_cards(person_id=person.id)
    return [CardInDB(**row) for row in cards_stack]


@router.post(
    "/update-grade",
    name="card:update-grade",
)
async def update_grade(
    data: GradeToUpdate,
    cards_repo: CardsRepository = Depends(get_repository(CardsRepository)),
    auth_repo: AuthRepository = Depends(get_repository(AuthRepository)),
) -> None:
    # this is a temporary crutch. Need to add a dependency
    # for getting a person email from an auth token
    person = await auth_repo.get_person_by_email(email=EmailStr("email@example.com"))
    data.person_id = person.id
    return await cards_repo.update_grade(grade=data)
