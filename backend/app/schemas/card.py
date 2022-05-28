from datetime import datetime

from app.schemas.core import CoreModel
from app.schemas.auth import PersonInDB
from typing import List, Optional


class WordModel(CoreModel):
    id: int
    word: str
    type: str
    translation: str
    explanation: str
    user: PersonInDB


class PhraseModel(CoreModel):
    id: int
    prefix: str
    suffix: str
    translation: str
    word: WordModel
    user: PersonInDB


class CardInDB(CoreModel):
    """Represents a card model"""

    id: int
    person_id: int
    prefix: str
    suffix: str
    phrase_translation: str
    word: str
    word_id: int
    grade: int
    explanation: str
    category: str
    word_translation: List[str]


class GradeToUpdate(CoreModel):
    lang: str
    word_id: int
    grade: int
    person_id: Optional[int]


class GradeInDB(CoreModel):

    person_id: int
    word_id: int
    grade: int
    last_attempt: datetime
