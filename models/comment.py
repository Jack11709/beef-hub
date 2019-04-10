from app import db, ma
from .base import BaseModel, BaseSchema
from .beef import Beef

class Comment(db.Model, BaseModel):

    __tablename__ = 'comments'

    content = db.Column(db.Text, nullable=False)
    beef_id = db.Column(db.Integer, db.ForeignKey('beefs.id'))
    beef = db.relationship('Beef', backref='comments')

class CommentSchema(ma.ModelSchema, BaseSchema):

    class Meta:
        model = Comment
