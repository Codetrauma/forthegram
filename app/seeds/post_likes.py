from app.models import db, PostLikes


def seed_post_likes():
    like1 = PostLikes(user_id=5, post_id=1)
    like2 = PostLikes(user_id=1, post_id=2)
    like3 = PostLikes(user_id=2, post_id=2)
    like4 = PostLikes(user_id=3, post_id=12)
    like5 = PostLikes(user_id=7, post_id=17)
    like6 = PostLikes(user_id=5, post_id=14)
    like7 = PostLikes(user_id=5, post_id=2)
    like8 = PostLikes(user_id=3, post_id=4)
    like9 = PostLikes(user_id=3, post_id=6)
    like10 = PostLikes(user_id=4, post_id=6)
    like11 = PostLikes(user_id=1, post_id=9)
    like12 = PostLikes(user_id=2, post_id=8)
    like13 = PostLikes(user_id=7, post_id=10)
    like14 = PostLikes(user_id=5, post_id=10)
    like15 = PostLikes(user_id=10, post_id=3)
    like16 = PostLikes(user_id=10, post_id=4)
    like17 = PostLikes(user_id=9, post_id=13)
    like18 = PostLikes(user_id=8, post_id=13)
    like19 = PostLikes(user_id=7, post_id=10)
    like20 = PostLikes(user_id=6, post_id=1)
    like21 = PostLikes(user_id=6, post_id=3)
    like22 = PostLikes(user_id=10, post_id=7)
    like23 = PostLikes(user_id=3, post_id=19)
    like24 = PostLikes(user_id=3, post_id=20)
    like25 = PostLikes(user_id=1, post_id=16)
    like26 = PostLikes(user_id=5, post_id=13)
    like27 = PostLikes(user_id=5, post_id=19)
    like28 = PostLikes(user_id=3, post_id=11)
    like29 = PostLikes(user_id=3, post_id=12)
    like30 = PostLikes(user_id=3, post_id=13)
    like31 = PostLikes(user_id=3, post_id=14)
    like32 = PostLikes(user_id=3, post_id=15)
    like33 = PostLikes(user_id=4, post_id=16)
    like34 = PostLikes(user_id=4, post_id=17)
    like35 = PostLikes(user_id=4, post_id=18)
    like36 = PostLikes(user_id=4, post_id=19)
    like37 = PostLikes(user_id=4, post_id=20)
    like38 = PostLikes(user_id=9, post_id=10)
    like39 = PostLikes(user_id=9, post_id=11)
    like40 = PostLikes(user_id=9, post_id=12)
    like41 = PostLikes(user_id=9, post_id=13)
    like42 = PostLikes(user_id=9, post_id=14)
    like43 = PostLikes(user_id=9, post_id=15)
    like44 = PostLikes(user_id=1, post_id=16)
    like45 = PostLikes(user_id=1, post_id=17)


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
    db.session.add(like14)
    db.session.add(like15)
    db.session.add(like16)
    db.session.add(like17)
    db.session.add(like18)
    db.session.add(like19)
    db.session.add(like20)
    db.session.add(like21)
    db.session.add(like22)
    db.session.add(like23)
    db.session.add(like24)
    db.session.add(like25)
    db.session.add(like26)
    db.session.add(like27)
    db.session.add(like28)
    db.session.add(like29)
    db.session.add(like30)
    db.session.add(like31)
    db.session.add(like32)
    db.session.add(like33)
    db.session.add(like34)
    db.session.add(like35)
    db.session.add(like36)
    db.session.add(like37)
    db.session.add(like38)
    db.session.add(like39)
    db.session.add(like40)
    db.session.add(like41)
    db.session.add(like42)
    db.session.add(like43)
    db.session.add(like44)
    db.session.add(like45)
    db.session.commit()

def undo_post_likes():
    db.session.execute('TRUNCATE posts_likes RESTART IDENTITY CASCADE;')
    db.session.commit()
