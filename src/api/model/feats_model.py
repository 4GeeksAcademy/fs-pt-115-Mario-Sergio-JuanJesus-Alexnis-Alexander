from . import db
from sqlalchemy import String, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Optional

class Feats(db.Model):
    feats_id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    version: Mapped[Optional[str]]= mapped_column(Text)
    description: Mapped[Optional[str]]= mapped_column(String(255))
    snippet: Mapped[Optional[str]]= mapped_column(String(255))
    feats_tags: Mapped[Optional[str]] = mapped_column(String(255))

    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))

    def serialize(self):
        return{
            "feats_id": self.feats_id,
            "name": self.name,
            "version": self.version,
            "description": self.description,
            "snippet": self.snippet,
            "feats_tags": self.feats_tags
        }