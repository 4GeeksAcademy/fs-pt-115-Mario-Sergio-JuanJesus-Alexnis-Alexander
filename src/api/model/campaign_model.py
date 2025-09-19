from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, DateTime, Boolean, ForeignKey
from api.model_config import db
from api.model.user_model import User

class Campaign(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(String(500), nullable=False)
    setting: Mapped[str] = mapped_column(String(100), nullable=False)
    level: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
    players: Mapped[int] = mapped_column(Integer, default=1, nullable=False)

    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)

    def serialize(self):
        return{
            "id":self.id,
            "user_id":self.user_id,
            "name":self.name,
            "description":self.description,
            "setting":self.setting,
            "level":self.level,
            "players":self.players
        }