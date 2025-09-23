from typing import Optional, List
from . import db
from .magic_items_model import MagicsItems
from sqlalchemy import String, Boolean, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .spell_model import Spell
from flask_bcrypt import generate_password_hash, check_password_hash


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    birthdate: Mapped[Optional[str]] = mapped_column(String(10), nullable=True)
    full_name: Mapped[Optional[str]] = mapped_column(String(120), nullable=True)
    phone: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    gender: Mapped[Optional[str]] = mapped_column(String(10), nullable=True)
    avatar: Mapped[Optional[str]] = mapped_column(Text)
    password: Mapped[str] = mapped_column(nullable=False)

    magics_items: Mapped[List["MagicsItems"]] = relationship()
    spell:Mapped[List["Spell"]] = relationship()
    character:Mapped[List["Character"]] = relationship()
    
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
            "spells": [spell.serialize() for spell in self.spell],
            'magics_items': [item.serialize() for item in self.magics_items]
        }