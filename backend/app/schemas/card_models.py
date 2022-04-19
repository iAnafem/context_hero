from core import CoreModel
from user import UserModel


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


class CardModel(CoreModel):
    """Represents a card model"""
    id: int
    phrase: PhraseModel
