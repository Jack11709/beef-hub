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
        'password': 'password',
        'password_confirmation': 'password'
    })

    if errors:
        raise Exception(errors)

    charlotte, errors = user_schema.load({
        'username': 'charizard',
        'email': 'charlotte@email.com',
        'password': 'password',
        'password_confirmation': 'password'
    })

    if errors:
        raise Exception(errors)

    dexter, errors = user_schema.load({
        'username': 'lrgazn',
        'email': 'dexter@email.com',
        'password': 'password',
        'password_confirmation': 'password'
    })

    if errors:
        raise Exception(errors)



    category_one = Category(name="Personal")
    category_two = Category(name="Professional")
    category_thre = Category(name="Business")

    beef_one = Beef(
      beefer=jack, 
      beefee=charlotte, 
      reason="big mouth", 
      categories=[category_one, category_thre], 
      liked_by=[jack, charlotte],
      followed_by=[charlotte, dexter, jack]
    )
    
    beef_two = Beef(
      beefer=jack, 
      beefee=dexter, 
      reason="Not in 30 under 30 2019", 
      categories=[category_one, category_two], 
      liked_by=[jack, charlotte],
      followed_by=[dexter]
    )

    comment_one = Comment(content="Yeah she does", beef=beef_one)
    comment_two = Comment(content="On your last year of eligability!", beef=beef_two)


    db.session.add(jack)
    db.session.add(charlotte)
    db.session.add(dexter)
    db.session.add(category_one)
    db.session.add(category_one)
    db.session.add(category_one)
    db.session.add(beef_one)
    db.session.add(beef_two)
    db.session.add(comment_one)
    db.session.add(comment_two)

    db.session.commit()
