from datetime import datetime

from app.schemas.core import CoreModel
from app.schemas.user import UserModel
from typing import List


class WordModel(CoreModel):
    id: int
    word: str
    type: str
    translation: str
    explanation: str
    user: UserModel


class PhraseModel(CoreModel):
    id: int
    prefix: str
    suffix: str
    translation: str
    word: WordModel
    user: UserModel


class CardInDB(CoreModel):
    """Represents a card model"""

    id: int
    person_id: int
    prefix: str
    suffix: str
    phrase_translation: str
    word: str
    explanation: str
    category: str
    word_translation: List[str]


class GradeInDB(CoreModel):

    person_id: int
    word_id: int
    grade: int
    last_attempt: datetime
