from typing import List, Optional
from . import db
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .spell_model import Spell
from flask_bcrypt import generate_password_hash, check_password_hash



class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    birthdate: Mapped[Optional[str]]
    full_name: Mapped[Optional[str]]
    phone: Mapped[Optional[str]]
    gender: Mapped[Optional[str]]
    password: Mapped[str] = mapped_column(nullable=False)

    def set_password(self, password):
        self.password = generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    spell:Mapped[List["Spell"]] = relationship()
    
    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "birthdate": self.birthdate,
            "full_name": self.full_name,
            "gender": self.gender,
            "phone": self.phone,
            "spells": [spell.serialize() for spell in self.spell]

        }
