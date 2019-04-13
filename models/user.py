from datetime import datetime, timedelta
import jwt
from sqlalchemy.ext.hybrid import hybrid_property
from marshmallow import validates_schema, ValidationError, fields, validate
from config.environment import secret
from app import db, ma, bcrypt
from .base import BaseModel, BaseSchema

followers = db.Table('followers',
  db.Column('follower_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
  db.Column('followed_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)


class User(db.Model, BaseModel):

    __tablename__ = 'users'

    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(128), nullable=False, unique=True)
    profile_image = db.Column(db.String(3000), nullable=False)
    password_hash = db.Column(db.String(128), nullable=True)
    followed = db.relationship(
      'User',
      secondary=followers,
      primaryjoin='User.id==followers.c.follower_id',
      secondaryjoin='User.id==followers.c.followed_id',
      backref=db.backref('followers', lazy='dynamic')
    )

    @hybrid_property
    def password(self):
        pass

    # function must be named after hybrid_property
    @password.setter
    def password(self, plaintext):
        self.password_hash = bcrypt.generate_password_hash(plaintext).decode('utf-8')

    def validate_password(self, plaintext):
        return bcrypt.check_password_hash(self.password_hash, plaintext)

    def generate_token(self):
        payload = {
            'exp': datetime.utcnow() + timedelta(days=1),
            'iat': datetime.utcnow(),
            'sub': self.id
        }

        token = jwt.encode(
            payload,
            secret,
            'HS256'
        ).decode('utf-8')

        return token


class UserSchema(ma.ModelSchema, BaseSchema):

    @validates_schema
    # pylint: disable=R0201
    def check_passwords_match(self, data):
        if data.get('password') != data.get('password_confirmation'):
            raise ValidationError(
                'Passwords do not match',
                'password_confirmation'
            )

    password = fields.String(required=True, validate=[validate.Length(min=8, max=50)])
    password_confirmation = fields.String(required=True)
    likes = fields.Nested('BeefSchema', many=True, only=('id', 'reason'))
    created_beefs = fields.Nested('BeefSchema', many=True, only=('reason', 'id'))
    beefs_against = fields.Nested('BeefSchema', many=True, only=('reason', 'id'))
    followed = fields.Nested('UserSchema', many=True, only=('username', 'id'))
    followers = fields.Nested('UserSchema', many=True, only=('username', 'id'))
    beefs_followed = fields.Nested('BeefSchema', many=True, only=('reason', 'id'))

    class Meta:
        model = User
        exclude = ('password_hash',)
        load_only = ('password', 'password_confirmation')
