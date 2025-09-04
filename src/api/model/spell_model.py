from . import db
from sqlalchemy import String, Boolean, Integer, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Optional

class Spell(db.Model):
    spell_id: Mapped[int] = mapped_column(primary_key=True)
    spell: Mapped[str] = mapped_column(String(255), nullable=False)
    level: Mapped[str] = mapped_column(String(255), nullable=False)
    casting_time: Mapped[Optional[int]] = mapped_column(Integer)
    reaction_condition: Mapped[Optional[str]]= mapped_column(Text)
    components_material: Mapped[Optional[str]] = mapped_column(String(255))
    range_distance: Mapped[Optional[int]] = mapped_column(Integer)
    duration: Mapped[Optional[int]] = mapped_column(Integer)
    is_ritual: Mapped[Optional[bool]] = mapped_column(Boolean)
    has_scaling: Mapped[Optional[bool]] = mapped_column(Boolean)
    scaling_type: Mapped[Optional[str]] = mapped_column(String(255))

    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))

    def serialize (self):
        return {
            "spell_id": self.spell_id,
            "spell": self.spell,
            "level": self.level,
            "casting_time": self.casting_time,
            "reaction_condition": self.reaction_condition,
            "components_material": self.components_material,
            "range_distance": self.range_distance,
            "duration": self.duration,
            "is_ritual": self.is_ritual,
            "has_scaling": self.has_scaling,
            "scaling_type": self.scaling_type,
            "user_id": self.user_id
        }

