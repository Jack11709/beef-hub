from flask import Blueprint, jsonify, request, g
from models.user import UserSchema, User
from lib.secure_route import secure_route

api = Blueprint('user', __name__)

user_schema = UserSchema()

@api.route('/users/profile', methods=['GET'])
@secure_route
def show():
    return user_schema.jsonify(g.current_user), 200

@api.route('/users/profile', methods=['PUT'])
@secure_route
def update():

    user, errors = user_schema.load(request.get_json(), instance=g.current_user, partial=True)

    if errors:
        return jsonify(errors), 422

    user.save()

    g.current_user = user
    return user_schema.jsonify(g.current_user)

@api.route('users/follow', methods=['POST'])
@secure_route
def follow():
    data = request.get_json()
    current_user = g.current_user
    followed_user = User.query.get(data['user_id'])
    current_user.followed.append(followed_user)
    current_user.save()
    return user_schema.jsonify(current_user), 200
