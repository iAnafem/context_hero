from app.schemas.core import CoreModel, DateTimeModelMixin, IDModelMixin
from typing import Optional
from pydantic import EmailStr


class BaseUser(CoreModel):
    """Without credentials"""
    email: EmailStr
    is_active: bool = True
    is_superuser: bool = False

class UserModel(BaseUser):
    pass