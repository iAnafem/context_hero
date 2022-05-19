from databases import Database
from fastapi import HTTPException
from pydantic import EmailStr
from starlette.status import HTTP_404_NOT_FOUND

from app.db.repositories.base import BaseRepository
from app.schemas.auth import PersonInDB

GET_PERSON_BY_EMAIL_QUERY = """
    SELECT id, nick_name, email, first_name, last_name
    FROM person
    WHERE email = :email;
"""


class AuthRepository(BaseRepository):
    def __init__(self, db: Database) -> None:
        super().__init__(db)

    async def get_person_by_email(self, email: EmailStr) -> PersonInDB:
        person_record = await self.db.fetch_one(
            query=GET_PERSON_BY_EMAIL_QUERY, values={"email": email}
        )
        if person_record:
            person = PersonInDB(**person_record)
            return person
        else:
            raise HTTPException(
                status_code=HTTP_404_NOT_FOUND,
                detail="Person with the specified email does not exists",
            )
