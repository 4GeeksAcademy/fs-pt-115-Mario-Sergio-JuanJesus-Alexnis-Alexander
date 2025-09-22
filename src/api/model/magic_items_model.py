from typing import Optional
from . import db
from sqlalchemy import String, Boolean, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column


class MagicsItems(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    rarity: Mapped[str] = mapped_column(String(50), nullable=False)
    base_item_type: Mapped[str] = mapped_column(String(50), nullable=False)
    attunement_description: Mapped[Optional[str]] = mapped_column(Text)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    version: Mapped[Optional[str]] = mapped_column(String(50))
    magic_item_type: Mapped[Optional[str]] = mapped_column(String(50))
    base_armor: Mapped[Optional[str]] = mapped_column(String(50))
    dex_bonus: Mapped[Optional[str]] = mapped_column(String(20))
    str_requirement: Mapped[Optional[str]] = mapped_column(String(20))
    stealth_check: Mapped[Optional[str]] = mapped_column(String(50))
    base_weapon: Mapped[Optional[str]] = mapped_column(String(50))
    requires_attunement: Mapped[bool] = mapped_column(Boolean)

    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    

    def serialize(self):
        return {
        "id": self.id,
        "name": self.name,
        "rarity": self.rarity,
        "base_item_type": self.base_item_type,
        "attunement_description": self.attunement_description,
        "description": self.description,
        "version": self.version,
        "magic_item_type": self.magic_item_type,
        "base_armor": self.base_armor,
        "dex_bonus": self.dex_bonus,
        "str_requirement": self.str_requirement,
        "stealth_check": self.stealth_check,
        "base_weapon": self.base_weapon,
        "requires_attunement": self.requires_attunement
    }