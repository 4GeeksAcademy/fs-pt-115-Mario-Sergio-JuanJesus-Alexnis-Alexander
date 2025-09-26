from . import db
from sqlalchemy import Integer, Text, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Optional

class Background(db.Model):
    background_id: Mapped[int] = mapped_column(primary_key=True)
    background_name: Mapped[str] = mapped_column(String(255))
    base_description: Mapped[str] = mapped_column(Text)
    habilities_description: Mapped[str] = mapped_column(Text)
    feats_description: Mapped[Optional[str]] = mapped_column(Text)
    skill_proficiencies_description: Mapped[Optional[str]]  = mapped_column(Text)
    tool_proficiencies_description: Mapped[Optional[str]]  = mapped_column(Text)
    languages_description: Mapped[Optional[str]]  = mapped_column(Text)
    equipment_description: Mapped[Optional[str]]  = mapped_column(Text)
    specific_table_name: Mapped[Optional[str]]  = mapped_column(String(255))
    specific_tabla_desc: Mapped[Optional[str]] = mapped_column(Text)
    feature: Mapped[Optional[str]]  = mapped_column(String(255))
    feature_desc: Mapped[Optional[str]]  = mapped_column(Text)
    variant: Mapped[Optional[str]]  = mapped_column(String(255))
    variant_desc: Mapped[Optional[str]]  = mapped_column(Text)
    variant_feature: Mapped[Optional[str]]  = mapped_column(String(255))
    variant_feature_desc: Mapped[Optional[str]] = mapped_column(Text)
    suggested_characteristics: Mapped[Optional[str]]  = mapped_column(Text)
    spell_list_introduction: Mapped[Optional[str]]  = mapped_column(Text)
    spell_list_extended: Mapped[Optional[str]]  = mapped_column(Text)
    contacts_list: Mapped[Optional[str]]  = mapped_column(Text)

    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))

    def serialize(self):
        return {
            "background_id": self.background_id,
            "name": self.name,
            "version": self.version,
            "introduction": self.introduction,
            "abilities_score_description": self.abilities_score_description,
            "feats_description": self.feats_description,
            "skill_proficiencies_description": self.skill_proficiencies_description,
            "tool_proficiencies_description": self.tool_proficiencies_description,
            "languages_description": self.languages_description,
            "equipment_description": self.equipment_description,
            "specific_table_name": self.specific_table_name,
            "specific_tabla_desc": self.specific_tabla_desc,
            "feature": self.feature,
            "feature_desc": self.feature_desc,
            "variant": self.variant,
            "variant_desc": self.variant_desc,
            "variant_feature": self.variant_feature,
            "variant_feature_desc": self.variant_feature_desc,
            "suggested_characteristics": self.suggested_characteristics,
            "spell_list_desc": self.spell_list_desc,
            "spell_list_extended": self.spell_list_extended,
            "contacts_list": self.contacts_list,
            "background_tags": self.background_tags
    }
