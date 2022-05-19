from app.schemas.core import CoreModel, DateTimeModelMixin, IDModelMixin
from typing import Optional
from pydantic import EmailStr


class PersonBase(CoreModel):
    """Without credentials"""

    nick_name: Optional[str]
    email: Optional[EmailStr]
    is_active: bool = True
    is_superuser: bool = False


class PersonInDB(PersonBase, DateTimeModelMixin, IDModelMixin):
    email: EmailStr
