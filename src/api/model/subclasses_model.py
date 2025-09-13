from . import db
from sqlalchemy import Integer, Text, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Optional

class Subclasses(db.Model):
    subclasses_id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    version: Mapped[str] = mapped_column(Text)
    short_description: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(String(255), nullable=False)
    spellcasting_ability: Mapped[str] = mapped_column(String(255))
    can_cast_spells: Mapped[str] = mapped_column(String(255))
    additional_spell_list: Mapped[str] = mapped_column(String(255))
    spell_prepare_type: Mapped[str] = mapped_column(String(255))
    knows_all_spells: Mapped[str] = mapped_column(String(255))
    spell_learning_style: Mapped[str] = mapped_column(String(255))
    additional_specific_spells: Mapped[str] = mapped_column(String(255))
    avatar: Mapped[str] = mapped_column(String(255))
    large_avatar: Mapped[str] = mapped_column(String(255))

    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))

    def serialize(self):
        return {
            "subclasses_id": self.subclasses_id,
            "name": self.name,
            "version": self.version,
            "short_description":self.short_description,
            "description": self.description,
            "spellcasting_ability": self.spellcasting_ability,
            "can_cast_spells": self.can_cast_spells,
            "additional_spell_list":self.additional_spell_list,
            "spell_prepare_type":self.spell_prepare_type,
            "knows_all_spells": self.knows_all_spells,
            "spell_learning_style":self.spell_learning_style,
            "additional_specific_spells": self.additional_specific_spells,
            "avatar": self.avatar,
            "large_avatar": self.large_avatar
        }