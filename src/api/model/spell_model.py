from . import db
from sqlalchemy import String, Boolean, Integer, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Optional

class Spell(db.Model):
    spell_id: Mapped[int] = mapped_column(primary_key=True)
    spell_name: Mapped[str] = mapped_column(String(255), nullable=False)
    spell_level: Mapped[str] = mapped_column(String(255), nullable=False)
    spell_school: Mapped[str] = mapped_column(String(255), nullable=False)
    casting_time: Mapped[str] = mapped_column(String(255), nullable=False)
    casting_time_select: Mapped[Optional[str]] = mapped_column(String(255))
    reaction_casting_time: Mapped[str] = mapped_column(String(255), nullable=False)
    components: Mapped[Optional[bool]] = mapped_column(Boolean)
    material_components: Mapped[str] = mapped_column(String(255), nullable=False)
    spell_range: Mapped[str] = mapped_column(String(255), nullable=False)
    range_distance: Mapped[str] = mapped_column(String(255), nullable=False)
    duration_type: Mapped[str] = mapped_column(String(255), nullable=False)
    duration: Mapped[str] = mapped_column(String(255), nullable=False)
    duration_select: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(String(255), nullable=False)
    ritual_spell: Mapped[Optional[bool]] = mapped_column(Boolean)
    at_higher_levels: Mapped[Optional[bool]] = mapped_column(Boolean)
    higher_level_scaling: Mapped[str] = mapped_column(String(255))
    available_for_classes: Mapped[str] = mapped_column(String(255), nullable=False)

    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))

    def serialize (self):
        return {
            "spell_id": self.spell_id,
            "spell_name": self.spell_name,
            "spell_level": self.spell_level,
            "spell_school": self.spell_school,
            "casting_time": self.casting_time,
            "casting_time_select": self.casting_time_select,
            "reaction_casting_time": self.reaction_casting_time,
            "components": self.components,
            "material_components": self.material_components,
            "spell_range": self.spell_range,
            "range_distance": self.range_distance,
            "duration_type": self.duration_type,
            "duration": self.duration,
            "duration_select": self.duration_select,
            "description": self.description,
            "ritual_spell": self.ritual_spell,
            "at_higher_levels": self.at_higher_levels,
            "higher_level_scaling": self.higher_level_scaling,
            "available_for_classes": self.available_for_classes 
        }
