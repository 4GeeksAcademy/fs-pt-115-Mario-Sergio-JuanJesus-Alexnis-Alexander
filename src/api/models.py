from typing import List
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase, relationship

db = SQLAlchemy()


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }


class Character(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    name: Mapped[str] = mapped_column(String(45), nullable=False)
    level: Mapped[int] = mapped_column(nullable=False)
    specie: Mapped[str] = mapped_column(nullable=False)
    classes: Mapped[str] = mapped_column(nullable=False)
    background: Mapped[str] = mapped_column(String(45), nullable=False)
    speed: Mapped[int] = mapped_column(nullable=False)
    armor: Mapped[int] = mapped_column(nullable=False)
    initiative: Mapped[int] = mapped_column(nullable=False)
    max_hit_points: Mapped[int] = mapped_column(nullable=False)
    current_hit_points: Mapped[int] = mapped_column(nullable=False)
    campaing_id: Mapped[int]
    avatar: Mapped[str] = mapped_column(nullable=False)
    attributes: Mapped[List["Char_attributes"]
                       ] = relationship(back_populates="character")
    savings: Mapped[List["Char_attributes"]] = relationship(
        back_populates="character")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "level": self.level,
            "specie": self.specie,
            "classes": self.classes,
            "background": self.background,
            "speed": self.speed,
            "armor": self.armor,
            "initiative": self.initiative,
            "max_hit_points": self.max_hit_points,
            "current_hit_points": self.current_hit_points,
            "campaing_id": self.campaing_id,
            "avatar": self.avatar,
            "attributes": [attribute for attribute in self.attributes],
            "savings": [saving for saving in self.savings]
        }

        class Char_attributes(db.Model):
            id: Mapped[int] = mapped_column(
                primary_key=True, nullable=False)
            parent_id: Mapped[int] = mapped_column(ForeignKey("character.id"))
            STR: Mapped[int] = mapped_column(nullable=False)
            DEX: Mapped[int] = mapped_column(nullable=False)
            CON: Mapped[int] = mapped_column(nullable=False)
            INT: Mapped[int] = mapped_column(nullable=False)
            WIS: Mapped[int] = mapped_column(nullable=False)
            CHA: Mapped[int] = mapped_column(nullable=False)
            character: Mapped[Character] = relationship(
                back_populates="attributes")

            def serialize(self):
                return {
                    "id": self.id,
                    "STR": self.STR,
                    "DEX": self.DEX,
                    "CON": self.CON,
                    "INT": self.INT,
                    "WIS": self.WIS,
                    "CHA": self.CHA,
                }

                class Char_savings(db.Model):
                    id: Mapped[int] = mapped_column(
                        primary_key=True, nullable=False)
                    parent_id: Mapped[int] = mapped_column(
                        ForeignKey("character.id"))
                    STR: Mapped[int] = mapped_column(nullable=False)
                    DEX: Mapped[int] = mapped_column(nullable=False)
                    CON: Mapped[int] = mapped_column(nullable=False)
                    INT: Mapped[int] = mapped_column(nullable=False)
                    WIS: Mapped[int] = mapped_column(nullable=False)
                    CHA: Mapped[int] = mapped_column(nullable=False)
                    character: Mapped[Character] = relationship(
                        back_populates="savings")

                    def serialize(self):
                        return {
                            "id": self.id,
                            "STR": self.STR,
                            "DEX": self.DEX,
                            "CON": self.CON,
                            "INT": self.INT,
                            "WIS": self.WIS,
                            "CHA": self.CHA,
                        }
