from app.schemas.user import UserModel


async def get_user_from_token() -> UserModel:
    return UserModel(id=1)
