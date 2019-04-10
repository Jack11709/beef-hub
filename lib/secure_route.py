from functools import wraps
import jwt
from flask import request, jsonify, g
from models.user import User
from config.environment import secret

def secure_route(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if 'Authorization' not in request.headers:
            return jsonify({'message': 'Unauthorized'}), 401

        token = request.headers.get('Authorization').replace('Bearer ', '')

        try:
            payload = jwt.decode(token, secret)
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expired'})
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'})

        user = User.query.get(payload.get('sub'))

        if not user:
            return jsonify({'message': 'Unauthorized'}), 401

        g.current_user = user

        return func(*args, **kwargs)

    return wrapper
