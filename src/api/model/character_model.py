from typing import List, Optional
from . import db
from flask_sqlalchemy import SQLAlchemy
from .user_model import User
from sqlalchemy import String, Boolean, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase, relationship


class Character(db.Model):
    __tablename__ = "character"

    id: Mapped[int] = mapped_column(primary_key=True)
    users_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    name: Mapped[str] = mapped_column(String(45), nullable=False)
    level: Mapped[int] = mapped_column(nullable=False, default=1)
    specie_id: Mapped[str] = mapped_column(
        ForeignKey("specie.id"), nullable=False)
    subspecie_id: Mapped[str] = mapped_column(
        ForeignKey("subspecie.id"), nullable=False)
    proffesion_id: Mapped[str] = mapped_column(
        ForeignKey("proffesion.id"), nullable=False)
    subproffesion_id: Mapped[str] = mapped_column(
        ForeignKey("subproffesion.id"), nullable=False)
    background_id: Mapped[str] = mapped_column(
        ForeignKey("background.id"), nullable=False)
    alignment: Mapped[str] = mapped_column(String(255), nullable=True)
    armor_class: Mapped[int] = mapped_column(nullable=False, default=10)
    speed: Mapped[int] = mapped_column(nullable=False, default=30)
    initiative: Mapped[int] = mapped_column(nullable=False, default=0)
    hp_max: Mapped[int] = mapped_column(nullable=False)
    hp_current: Mapped[int] = mapped_column(nullable=False)
    languages: Mapped[int] = mapped_column(nullable=False)
    campaign_id: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    avatar: Mapped[str] = mapped_column(nullable=False)
    proffesion: Mapped["Proffesion"] = relationship()
    subproffesion: Mapped[Optional["Subproffesion"]] = relationship()
    race: Mapped["Specie"] = relationship()
    subrace: Mapped[Optional["Subspecie"]] = relationship()
    background: Mapped["Background"] = relationship()
    attributes: Mapped[Optional["Char_attributes"]] = relationship(
        back_populates="character",
        uselist=False,
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "level": self.level,
            "specie_id": self.specie.serialize() if self.specie_id else None,
            "proffesion_id": self.proffesion.serialize() if self.proffesion_id else None,
            "subspecie_id": self.subspecie.serialize() if self.subspecie_id else None,
            "subproffesion_id": self.subproffesion.serialize() if self.subproffesion_id else None,
            "background_id": self.background_id.serialize() if self.background_id else None,
            "campaign_id": self.campaign_id,
            "avatar": self.avatar,
            "attributes": self.attributes.serialize() if self.attributes else None,
            "savings": self.savings.serialize() if self.savings else None,
        }


class Char_attributes(db.Model):
    __tablename__ = "char_attributes"
    character_id: Mapped[int] = mapped_column(
        ForeignKey("character.id"), primary_key=True)
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
            "id": self.character_id,
            "STR": self.STR,
            "DEX": self.DEX,
            "CON": self.CON,
            "INT": self.INT,
            "WIS": self.WIS,
            "CHA": self.CHA,
        }


class Proffesion(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    hit_dice: Mapped[str] = mapped_column(String(255), nullable=False)

    subproffesion: Mapped[List["Subproffesion"]
                          ] = relationship(back_populates="proffesion")
    features_link: Mapped[List["ProffesionFeature"]
                          ] = relationship(back_populates="proffesion")
    spell_link: Mapped[List["ProffesionSpell"]
                       ] = relationship(back_populates="proffesion")

class ProffesionFeature(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)

class Subproffesion(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    proffesion_id: Mapped[int] = mapped_column(ForeignKey("proffesion.id"))
    name: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    lvl_required: Mapped[int] = mapped_column(nullable=False)

    proffesion: Mapped[Proffesion] = relationship(
        back_populates="subproffesions")
    features_link: Mapped[List["SubproffesionFeature"]] = relationship()

class Specie(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)

    subrace_link: Mapped[List["Subspecie"]] = relationship(back_populates="specie")
    features_link: Mapped[List["SpecieFeature"]] = relationship(back_populates="specie")

class Subspecie(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    specie_id: Mapped[int] = mapped_column(ForeignKey("specie.id"))
    name: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)

    specie: Mapped["Specie"] = relationship(back_populates="subspecie")
    
class Feature(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    description: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)

    proffesion_links: Mapped[List["ProffesionFeature"]] = relationship(back_populates= "feature")
    subproffesion_links: Mapped[List["SubproffesionFeature"]] = relationship(back_populates= "feature")
    specie_links: Mapped[List["SpecieFeature"]] = relationship(back_populates= "feature")
    subspecie_links: Mapped[List["SubspecieFeature"]] = relationship(back_populates= "feature")
    background_links: Mapped[List["BackgroundFeature"]] = relationship(back_populates= "feature")