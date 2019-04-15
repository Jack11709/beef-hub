from app import app, db

from models.beef import Beef, Comment
from models.category import Category
from models.user import UserSchema

user_schema = UserSchema()

with app.app_context():
    db.drop_all()
    db.create_all()

    jack, errors = user_schema.load({
        'username': 'beanslord',
        'email': 'jack@email.com',
        'profile_image': 'https://i.imgur.com/kkszbMC.jpg?1',
        'password': 'password',
        'password_confirmation': 'password'
    })

    if errors:
        raise Exception(errors)

    charlotte, errors = user_schema.load({
        'username': 'charizard',
        'email': 'charlotte@email.com',
        'profile_image': 'https://oldmooresalmanac.com/wp-content/uploads/2017/11/cow-2896329_960_720-Copy.jpg',
        'password': 'password',
        'password_confirmation': 'password'
    })

    if errors:
        raise Exception(errors)

    dexter, errors = user_schema.load({
        'username': 'lrgazn',
        'email': 'dexter@email.com',
        'profile_image': 'https://oldmooresalmanac.com/wp-content/uploads/2017/11/cow-2896329_960_720-Copy.jpg',
        'password': 'password',
        'password_confirmation': 'password'
    })

    if errors:
        raise Exception(errors)

    mike, errors = user_schema.load({
        'username': 'mickyginger',
        'email': 'mike@email.com',
        'profile_image': 'https://oldmooresalmanac.com/wp-content/uploads/2017/11/cow-2896329_960_720-Copy.jpg',
        'password': 'password',
        'password_confirmation': 'password'
    })

    if errors:
        raise Exception(errors)

    tom, errors = user_schema.load({
        'username': 'muppetsTreasureIsland',
        'email': 'tom@email.com',
        'profile_image': 'https://oldmooresalmanac.com/wp-content/uploads/2017/11/cow-2896329_960_720-Copy.jpg',
        'password': 'password',
        'password_confirmation': 'password'
    })

    if errors:
        raise Exception(errors)

    category_one = Category(name="Personal")
    category_two = Category(name="Professional")
    category_three = Category(name="Business")

    beef_one = Beef(
      beefer=jack,
      beefee=charlotte,
      reason="big mouth",
      categories=[category_one, category_three],
      liked_by=[jack, charlotte, mike, tom],
      followed_by=[charlotte, dexter, jack, tom, mike]
    )

    beef_two = Beef(
      beefer=jack,
      beefee=dexter,
      reason="Not in 30 under 30 2019",
      categories=[category_one, category_two],
      liked_by=[jack, charlotte, dexter],
      followed_by=[dexter]
    )

    beef_three = Beef(
      beefer=charlotte,
      beefee=jack,
      reason="being yelled at whilst creating beef hub",
      categories=[category_one, category_three],
      liked_by=[mike, tom, dexter],
      followed_by=[charlotte, dexter, jack, mike]
    )

    beef_four = Beef(
      beefer=jack,
      beefee=dexter,
      reason="being given a dumb username",
      categories=[category_one, category_three],
      liked_by=[mike, tom, dexter],
      followed_by=[charlotte, dexter, jack, mike]
    )

    comment_one = Comment(content="Yeah she does", beef=beef_one, owner=tom)
    comment_two = Comment(content="On your last year of eligability!", beef=beef_two, owner=dexter)


    db.session.add(jack)
    db.session.add(charlotte)
    db.session.add(dexter)
    db.session.add(mike)
    db.session.add(tom)
    db.session.add(category_one)
    db.session.add(category_one)
    db.session.add(category_one)
    db.session.add(beef_one)
    db.session.add(beef_two)
    db.session.add(beef_four)
    db.session.add(comment_one)
    db.session.add(comment_two)

    db.session.commit()
