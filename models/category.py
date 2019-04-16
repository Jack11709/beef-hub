# from marshmallow import fields
from app import db, ma
from .base import BaseModel


class Category(db.Model, BaseModel):

    __tablename__ = 'categories'

    name = db.Column(db.String(40), unique=True, nullable=False)

class CategorySchema(ma.ModelSchema, BaseModel):

    class Meta:
        model = Category
