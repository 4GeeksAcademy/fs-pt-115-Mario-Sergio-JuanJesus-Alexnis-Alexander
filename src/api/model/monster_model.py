from . import db
from typing import Optional
from sqlalchemy import Integer, Text, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship


class Monster(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    type: Mapped[str] = mapped_column(String(120), nullable=False)
    subtype: Mapped[[Optional[str]]] = mapped_column(String(120))
    size: Mapped[str] = mapped_column(String(120), nullable=False)
    challenge: Mapped[str] = mapped_column(String(120), nullable=False)

    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "subtype": self.subtype,
            "size": self.size,
            "challenge": self.challenge
        }
