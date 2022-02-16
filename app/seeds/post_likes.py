from app.models import db, PostLikes


def seed_post_likes():
    like1 = PostLikes(user_id=5, post_id=1)
    like2 = PostLikes(user_id=1, post_id=2)
    like3 = PostLikes(user_id=2, post_id=2)
    like4 = PostLikes(user_id=3, post_id=4)
    like5 = PostLikes(user_id=7, post_id=5)
    like6 = PostLikes(user_id=5, post_id=2)
    like7 = PostLikes(user_id=5, post_id=2)
    like8 = PostLikes(user_id=3, post_id=2)
    like9 = PostLikes(user_id=3, post_id=6)
    like10 = PostLikes(user_id=4, post_id=6)
    like11 = PostLikes(user_id=1, post_id=8)
    like12 = PostLikes(user_id=2, post_id=8)
    like13 = PostLikes(user_id=7, post_id=10)


    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)
    db.session.add(like4)
    db.session.add(like5)
    db.session.add(like6)
    db.session.add(like7)
    db.session.add(like8)
    db.session.add(like9)
    db.session.add(like10)
    db.session.add(like11)
    db.session.add(like12)
    db.session.add(like13)

    db.session.commit()

def undo_post_likes():
    db.session.execute('TRUNCATE posts_likes RESTART IDENTITY CASCADE;')
    db.session.commit()
