from . import db
from sqlalchemy import Integer, Text, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Optional

class Specie(db.Model):
    specie_id: Mapped[int] = mapped_column(primary_key=True)
    specie_name: Mapped[int] = mapped_column(Text)
    size: Mapped[Optional[str]]= mapped_column(String(255))
    short_description: Mapped[Optional[str]]= mapped_column(Text)
    group: Mapped[Optional[str]]= mapped_column(String(255))
    introduction: Mapped[Optional[str]]= mapped_column(Text)
    trait_desc: Mapped[Optional[str]]= mapped_column(Text)
    trait: Mapped[Optional[str]]= mapped_column(String(255))
    avatar: Mapped[Optional[str]]= mapped_column(String(255))

    user_id: Mapped[int]= mapped_column(ForeignKey("user.id"))

def serialize (self):
    return{
        "specie_id": self.specie_id,
        "specie_name": self.specie_name,
        "size": self.size,
        "short_description": self.short_description,
        "group": self.group,
        "introduction": self.introduction,
        "trait_desc": self.trait_desc,
        "trait": self.trait,
        "avatar": self.avatar,
        "user_id": self.user_id
    }
