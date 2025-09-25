from . import db
from sqlalchemy import Integer, Text, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship


class Character(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    class_name: Mapped[str] = mapped_column(String(120), nullable=False)
    race_name: Mapped[str] = mapped_column(String(120), nullable=False)
    background_name: Mapped[str] = mapped_column(String(120), nullable=False)

    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "class_name": self.class_name,
            "race_name": self.race_name,
            "background_name": self.background_name
        }
