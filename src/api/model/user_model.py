from typing import Optional, List
from . import db
from sqlalchemy import String, Boolean, Text, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from flask_bcrypt import generate_password_hash, check_password_hash
from .magic_items_model import MagicsItems
from .spell_model import Spell
from .campaign_model import Campaign
from .feats_model import Feats
from .specie_model import Specie
from .subclasses_model import Subclasses
from .background_model import Background
from datetime import datetime


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    birthdate: Mapped[Optional[str]] = mapped_column(String(10), nullable=True)
    full_name: Mapped[Optional[str]] = mapped_column(
        String(120), nullable=True)
    phone: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    gender: Mapped[Optional[str]] = mapped_column(String(10), nullable=True)
    avatar: Mapped[Optional[str]] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)

    magics_items: Mapped[List["MagicsItems"]] = relationship()
    spell: Mapped[List["Spell"]] = relationship()
    character: Mapped[List["Character"]] = relationship("Character")
    campaign: Mapped[List["Campaign"]] = relationship()
    feats: Mapped[List["Feats"]] = relationship()
    specie: Mapped[List["Specie"]] = relationship()
    subclasses: Mapped[List["Subclasses"]] = relationship()
    background: Mapped[List["Background"]] = relationship()

    def set_password(self, password):
        self.password = generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "birthdate": self.birthdate,
            "full_name": self.full_name,
            "gender": self.gender,
            "phone": self.phone,
            "avatar": self.avatar,
            "created_at": self.created_at.strftime("%Y-%m-%d") if self.created_at else None,
            "spells": [spell.serialize() for spell in self.spell],
            'magics_items': [item.serialize() for item in self.magics_items],
            'character': [char.serialize() for char in self.character],
            'campaign': [camp.serialize() for camp in self.campaign],
            'feats': [feat.serialize() for feat in self.feats],
            'specie': [specie.serialize() for specie in self.specie],
            'subclasses': [subclass.serialize() for subclass in self.subclasses],
            'background': [backg.serialize() for backg in self.background]
        }
