from app.schemas.auth import PersonInDB


async def get_user_from_token() -> PersonInDB:
    return PersonInDB(id=1)
