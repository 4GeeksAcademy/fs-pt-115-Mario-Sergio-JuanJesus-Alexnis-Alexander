from __future__ import annotations
import enum
import uuid
from typing import List, Optional
from . import db
from sqlalchemy import (
    Boolean,
    CheckConstraint,
    Enum as SAEnum,
    ForeignKey,
    Index,
    Integer,
    Numeric,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)
from sqlalchemy.sql import quoted_name

# =========================
# Enum ability_code
# =========================


class AbilityCode(str, enum.Enum):
    STR = "STR"
    DEX = "DEX"
    CON = "CON"
    INT = "INT"
    WIS = "WIS"
    CHA = "CHA"


# =========================
# Basic Models
# =========================

class Ability(db.Model):
    __tablename__ = "ability"

    code: Mapped[AbilityCode] = mapped_column(
        SAEnum(AbilityCode, name="ability_code"), primary_key=True
    )
    name: Mapped[str] = mapped_column(Text, nullable=False, unique=True)

    skills: Mapped[List["Skill"]] = relationship(back_populates="ability")


class Proffesion(db.Model):
    __tablename__ = "proffesion"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )
    name: Mapped[str] = mapped_column(Text, nullable=False, unique=True)
    hit_die: Mapped[str] = mapped_column(Text, nullable=False)

    subproffesions: Mapped[List["Subproffesion"]
                           ] = relationship(back_populates="proffesion")
    features_link: Mapped[List["ProffesionFeature"]
                          ] = relationship(back_populates="proffesion")
    spells_link: Mapped[List["ProffesionSpell"]
                        ] = relationship(back_populates="proffesion")


class Subproffesion(db.Model):
    __tablename__ = "subproffesion"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )
    proffesion_id: Mapped[int] = mapped_column(
        ForeignKey("proffesion.id"), nullable=False
    )
    nombre: Mapped[str] = mapped_column(Text, nullable=False)
    nivel_obtencion: Mapped[int] = mapped_column(Integer, nullable=False)

    proffesion: Mapped[Proffesion] = relationship(
        back_populates="subproffesions")
    features_link: Mapped[List["SubproffesionFeature"]
                          ] = relationship(back_populates="subproffesion")


class Race(db.Model):
    __tablename__ = "race"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )
    nombre: Mapped[str] = mapped_column(Text, nullable=False, unique=True)

    subraces: Mapped[List["Subrace"]] = relationship(back_populates="race")
    features_link: Mapped[List["RaceFeature"]
                          ] = relationship(back_populates="race")


class Subrace(db.Model):
    __tablename__ = "subrace"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )
    race_id: Mapped[int] = mapped_column(
        ForeignKey("race.id"), nullable=False
    )
    nombre: Mapped[str] = mapped_column(Text, nullable=False)

    race: Mapped[Race] = relationship(back_populates="subraces")
    features_link: Mapped[List["SubraceFeature"]
                          ] = relationship(back_populates="subrace")


class Background(db.Model):
    __tablename__ = "background"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )
    nombre: Mapped[str] = mapped_column(Text, nullable=False, unique=True)
    equipo_inicial: Mapped[Optional[dict]] = mapped_column(JSONB, default=dict)

    features_link: Mapped[List["BackgroundFeature"]
                          ] = relationship(back_populates="background")


class Feature(db.Model):
    __tablename__ = "feature"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )
    nombre: Mapped[str] = mapped_column(Text, nullable=False, unique=True)
    descripcion: Mapped[str] = mapped_column(Text, nullable=False)

    proffesion_links: Mapped[List["ProffesionFeature"]
                             ] = relationship(back_populates="feature")
    subproffesion_links: Mapped[List["SubproffesionFeature"]] = relationship(
        back_populates="feature")
    race_links: Mapped[List["RaceFeature"]] = relationship(
        back_populates="feature")
    subrace_links: Mapped[List["SubraceFeature"]
                          ] = relationship(back_populates="feature")
    background_links: Mapped[List["BackgroundFeature"]
                             ] = relationship(back_populates="feature")


# =========================
# Features
# =========================

class ProffesionFeature(db.Model):
    __tablename__ = "proffesion_feature"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )
    proffesion_id: Mapped[int] = mapped_column(
        ForeignKey("proffesion.id"), nullable=False
    )
    feature_id: Mapped[int] = mapped_column(
        ForeignKey("feature.id"), nullable=False
    )
    nivel: Mapped[int] = mapped_column(Integer, nullable=False)

    proffesion: Mapped[Proffesion] = relationship(
        back_populates="features_link")
    feature: Mapped[Feature] = relationship(back_populates="proffesion_links")


class SubproffesionFeature(db.Model):
    __tablename__ = "subproffesion_feature"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )
    subproffesion_id: Mapped[int] = mapped_column(
        ForeignKey("subproffesion.id"), nullable=False
    )
    feature_id: Mapped[int] = mapped_column(
        ForeignKey("feature.id"), nullable=False
    )
    nivel: Mapped[int] = mapped_column(Integer, nullable=False)

    subproffesion: Mapped[Subproffesion] = relationship(
        back_populates="features_link")
    feature: Mapped[Feature] = relationship(
        back_populates="subproffesion_links")


class RaceFeature(db.Model):
    __tablename__ = "race_feature"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )
    race_id: Mapped[int] = mapped_column(
        ForeignKey("race.id"), nullable=False
    )
    feature_id: Mapped[int] = mapped_column(
        ForeignKey("feature.id"), nullable=False
    )

    race: Mapped[Race] = relationship(back_populates="features_link")
    feature: Mapped[Feature] = relationship(back_populates="race_links")


class SubraceFeature(db.Model):
    __tablename__ = "subrace_feature"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )
    subrace_id: Mapped[int] = mapped_column(
        ForeignKey("subrace.id"), nullable=False
    )
    feature_id: Mapped[int] = mapped_column(
        ForeignKey("feature.id"), nullable=False
    )

    subrace: Mapped[Subrace] = relationship(back_populates="features_link")
    feature: Mapped[Feature] = relationship(back_populates="subrace_links")


class BackgroundFeature(db.Model):
    __tablename__ = "background_feature"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )
    background_id: Mapped[int] = mapped_column(
        ForeignKey("background.id"), nullable=False
    )
    feature_id: Mapped[int] = mapped_column(
        ForeignKey("feature.id"), nullable=False
    )

    background: Mapped[Background] = relationship(
        back_populates="features_link")
    feature: Mapped[Feature] = relationship(back_populates="background_links")


# =========================
# Skills
# =========================

class Skill(db.Model):
    __tablename__ = "skill"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )
    nombre: Mapped[str] = mapped_column(Text, nullable=False, unique=True)
    ability_code: Mapped[AbilityCode] = mapped_column(
        SAEnum(AbilityCode, name="ability_code"),
        ForeignKey("ability.code"),
        nullable=False,
    )

    ability: Mapped[Ability] = relationship(back_populates="skills")
    characters_link: Mapped[List["CharacterSkill"]
                            ] = relationship(back_populates="skill")


# =========================
# Inventory
# =========================

class Equipment(db.Model):
    __tablename__ = "equipment"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )
    nombre: Mapped[str] = mapped_column(Text, nullable=False)
    tipo: Mapped[str] = mapped_column(Text, nullable=False)
    propiedades: Mapped[Optional[dict]] = mapped_column(JSONB, default=dict)
    peso: Mapped[Optional[float]] = mapped_column(Numeric)

    properties: Mapped[List["EquipmentProperty"]
                       ] = relationship(back_populates="equipment")
    characters_link: Mapped[List["CharacterEquipment"]
                            ] = relationship(back_populates="equipment")


class EquipmentProperty(db.Model):
    __tablename__ = "equipment_property"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )
    equipment_id: Mapped[int] = mapped_column(
        ForeignKey("equipment.id"), nullable=False
    )
    propiedad: Mapped[str] = mapped_column(Text, nullable=False)

    equipment: Mapped[Equipment] = relationship(back_populates="properties")

# =========================
# Spells
# =========================


class BasicSpell(db.Model):
    __tablename__ = "basicspell"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )
    nombre: Mapped[str] = mapped_column(Text, nullable=False, unique=True)
    nivel_hechizo: Mapped[int] = mapped_column(Integer, nullable=False)
    escuela: Mapped[str] = mapped_column(Text, nullable=False)
    tiempo_lanzamiento: Mapped[str] = mapped_column(Text, nullable=False)
    duracion: Mapped[str] = mapped_column(Text, nullable=False)
    alcance: Mapped[str] = mapped_column(Text, nullable=False)
    descripcion: Mapped[str] = mapped_column(Text, nullable=False)

    components: Mapped[List["SpellComponent"]
                       ] = relationship(back_populates="spell")
    proffesion_links: Mapped[List["ProffesionSpell"]
                             ] = relationship(back_populates="spell")
    characters_link: Mapped[List["CharacterSpell"]
                            ] = relationship(back_populates="spell")


class SpellComponent(db.Model):
    __tablename__ = "spell_component"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )
    spell_id: Mapped[int] = mapped_column(
        ForeignKey("basicspell.id"), nullable=False
    )
    componente: Mapped[str] = mapped_column(String, nullable=False)  # V, S, M
    material: Mapped[Optional[str]] = mapped_column(Text)

    spell: Mapped[BasicSpell] = relationship(back_populates="components")


class ProffesionSpell(db.Model):
    __tablename__ = "proffesion_spell"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )
    proffesion_id: Mapped[int] = mapped_column(
        ForeignKey("proffesion.id"), nullable=False
    )
    spell_id: Mapped[int] = mapped_column(
        ForeignKey("basicspell.id"), nullable=False
    )

    proffesion: Mapped[Proffesion] = relationship(back_populates="spells_link")
    spell: Mapped[BasicSpell] = relationship(back_populates="proffesion_links")

# =========================
# Character
# =========================


class Character(db.Model):
    __tablename__ = "character"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )
    name: Mapped[str] = mapped_column(String, nullable=False)
    lvl: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    xp: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    proffesion_id: Mapped[int] = mapped_column(
        ForeignKey("proffesion.id"), nullable=False
    )
    subproffesion_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("subproffesion.id"), nullable=True
    )
    race_id: Mapped[int] = mapped_column(
        ForeignKey("race.id"), nullable=False
    )
    subrace_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("subrace.id"), nullable=True
    )
    background_id: Mapped[int] = mapped_column(
        ForeignKey("background.id"), nullable=False
    )
    alingment: Mapped[Optional[str]] = mapped_column(String,default="True Neutral")
    CA: Mapped[int] = mapped_column(Integer, nullable=False, default=10)
    speed: Mapped[int] = mapped_column(Integer, nullable=False, default=30)
    initiative: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    hp_max: Mapped[int] = mapped_column(Integer, nullable=False)
    hp_current: Mapped[int] = mapped_column(Integer, nullable=False)
    language: Mapped[dict] = mapped_column(JSONB, default=["common"])
    proficiencies: Mapped[dict] = mapped_column(JSONB, default=dict)

    proffesion: Mapped[Proffesion] = relationship()
    subproffesion: Mapped[Optional[Subproffesion]] = relationship()
    race: Mapped[Race] = relationship()
    subrace: Mapped[Optional[Subrace]] = relationship()
    background: Mapped[Background] = relationship()

    ability_scores: Mapped[Optional["AbilityScores"]] = relationship(
        back_populates="character", uselist=False, cascade="all, delete-orphan"
    )
    skills_link: Mapped[List["CharacterSkill"]] = relationship(
        back_populates="character", cascade="all, delete-orphan"
    )
    equipment_link: Mapped[List["CharacterEquipment"]] = relationship(
        back_populates="character", cascade="all, delete-orphan"
    )
    spells_link: Mapped[List["CharacterSpell"]] = relationship(
        back_populates="character", cascade="all, delete-orphan"
    )
    features_link: Mapped[List["CharacterFeature"]] = relationship(
        back_populates="character", cascade="all, delete-orphan"
    )
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))


class AbilityScores(db.Model):
    __tablename__ = "ability_scores"

    character_id: Mapped[int] = mapped_column(
        ForeignKey("character.id"),
        primary_key=True,
    )
    fuerza: Mapped[int] = mapped_column(Integer, nullable=False)
    destreza: Mapped[int] = mapped_column(Integer, nullable=False)
    constitucion: Mapped[int] = mapped_column(Integer, nullable=False)
    inteligencia: Mapped[int] = mapped_column(Integer, nullable=False)
    sabiduria: Mapped[int] = mapped_column(Integer, nullable=False)
    carisma: Mapped[int] = mapped_column(Integer, nullable=False)

    character: Mapped[Character] = relationship(
        back_populates="ability_scores")


class CharacterSkill(db.Model):
    __tablename__ = "character_skill"

    character_id: Mapped[int] = mapped_column(
        ForeignKey("character.id"),
        primary_key=True,
    )
    skill_id: Mapped[int] = mapped_column(
        ForeignKey("skill.id"), primary_key=True
    )
    is_proficiente: Mapped[bool] = mapped_column(
        Boolean, nullable=False, default=False)
    has_expertise: Mapped[bool] = mapped_column(
        Boolean, nullable=False, default=False)

    character: Mapped[Character] = relationship(back_populates="skills_link")
    skill: Mapped[Skill] = relationship(back_populates="characters_link")


class CharacterEquipment(db.Model):
    __tablename__ = "character_equipment"

    character_id: Mapped[int] = mapped_column(
        ForeignKey("character.id"),
        primary_key=True,
    )
    equipment_id: Mapped[int] = mapped_column(
        ForeignKey("equipment.id"), primary_key=True
    )
    cantidad: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    notas: Mapped[Optional[dict]] = mapped_column(JSONB)

    character: Mapped[Character] = relationship(
        back_populates="equipment_link")
    equipment: Mapped[Equipment] = relationship(
        back_populates="characters_link")


class CharacterSpell(db.Model):
    __tablename__ = "character_spell"

    character_id: Mapped[int] = mapped_column(
        ForeignKey("character.id"),
        primary_key=True,
    )
    spell_id: Mapped[int] = mapped_column(
        ForeignKey("basicspell.id"), primary_key=True
    )
    preparado: Mapped[bool] = mapped_column(
        Boolean, nullable=False, default=False)

    character: Mapped[Character] = relationship(back_populates="spells_link")
    spell: Mapped[BasicSpell] = relationship(back_populates="characters_link")


class CharacterFeature(db.Model):
    __tablename__ = "character_feature"

    character_id: Mapped[int] = mapped_column(
        ForeignKey("character.id"),
        primary_key=True,
    )
    feature_id: Mapped[int] = mapped_column(
        ForeignKey("feature.id"), primary_key=True
    )
    nivel_obtenido: Mapped[int] = mapped_column(Integer, nullable=False)
    origen: Mapped[str] = mapped_column(
        Text, nullable=False
    )

    character: Mapped[Character] = relationship(back_populates="features_link")
    feature: Mapped[Feature] = relationship()
