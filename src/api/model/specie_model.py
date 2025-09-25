from . import db
from sqlalchemy import Integer, Text, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Optional

class Specie(db.Model):
    specie_id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    version: Mapped[Optional[str]]= mapped_column(Text)
    size: Mapped[str] = mapped_column(String(255), nullable=False)
    speed_walking: Mapped[Optional[str]]= mapped_column(Text)
    speed_burrowing: Mapped[Optional[str]]= mapped_column(Text)
    speed_flying: Mapped[Optional[str]]= mapped_column(Text)
    speed_swimming: Mapped[Optional[str]]= mapped_column(Text)
    short_description: Mapped[Optional[str]]= mapped_column(Text)
    group: Mapped[Optional[str]]= mapped_column(String(255))
    description: Mapped[str] = mapped_column(String(255), nullable=False)
    hide_trait: Mapped[Optional[str]]= mapped_column(Text)
    specie_trait: Mapped[Optional[str]]= mapped_column(String(255))
    will_have_species: Mapped[Optional[str]]= mapped_column(String(255))
    large_avatar: Mapped[Optional[str]]= mapped_column(String(255))
    portrait_avatar: Mapped[Optional[str]]= mapped_column(String(255))

    user_id: Mapped[int]= mapped_column(ForeignKey("user.id"))

def serialize (self):
    return{
        "specie_id": self.specie_id,
        "name": self.name,
        "version": self.version,
        "size": self.size,
        "speed_walking": self.speed_walking,
        "speed_burrowing": self.speed_burrowing,
        "speed_flying": self.speed_flying,
        "speed_swimming": self.speed_swimming,
        "short_description": self.short_description,
        "group": self.group,
        "description": self.description,
        "hide_trait": self.hide_trait,
        "specie_trait": self.specie_trait,
        "will_have_species": self.will_have_species,
        "large_avatar": self.large_avatar,
        "portrait_avatar": self.portrait_avatar,
        "user_id": self.user_id
    }
