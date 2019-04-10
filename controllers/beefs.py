from flask import Blueprint, request, jsonify, g
from models.beef import Beef, BeefSchema, Comment, CommentSchema
from models.category import Category
from lib.secure_route import secure_route

api = Blueprint('beefs', __name__)

beef_schema = BeefSchema()
comment_schema = CommentSchema()

@api.route('/beefs', methods=['GET'])
def index():
    beefs = Beef.query.all()
    return beef_schema.jsonify(beefs, many=True), 200

@api.route('/beefs/<int:beef_id>', methods=['GET'])
def show(beef_id):
    beef = Beef.query.get(beef_id)
    return beef_schema.jsonify(beef)

@api.route('/beefs', methods=['POST'])
@secure_route
def create():
    data = request.get_json()
    beef, errors = beef_schema.load(data)
    if errors:
        return jsonify(errors), 422
    category = Category.query.get(data['category_id'])
    beef.categories.append(category)
    beef.save()
    return beef_schema.jsonify(beef)

@api.route('/beefs/<int:beef_id>', methods=['PUT'])
def update(beef_id):
    beef = Beef.query.get(beef_id)
    beef, errors = beef_schema.load(request.get_json(), instance=beef, partial=True)
    if errors:
        return jsonify(errors), 422
    beef.save()
    return beef_schema.jsonify(beef)

@api.route('/beefs/<int:beef_id>', methods=['DELETE'])
def delete(beef_id):
    beef = Beef.query.get(beef_id)
    beef.remove()
    return '', 204


@api.route('/beefs/<int:beef_id>/comments', methods=['POST'])
def comment_create(beef_id):
    data = request.get_json()
    beef = Beef.query.get(beef_id)
    comment, errors = comment_schema.load(data)
    if errors:
        return jsonify(errors), 422
    comment.beef = beef
    comment.save()
    return comment_schema.jsonify(comment)

@api.route('/beefs/<int:beef_id>/comments/<int:comment_id>', methods=['DELETE'])
def comment_delete(**kwargs):
    comment = Comment.query.get(kwargs['comment_id'])
    comment.remove()
    return '', 204

@api.route('/beefs/<int:beef_id>/like', methods=['GET'])
@secure_route
def like(beef_id):
    beef = Beef.query.get(beef_id)
    user = g.current_user
    beef.liked_by.append(user)
    beef.save()
    return beef_schema.jsonify(beef), 200
