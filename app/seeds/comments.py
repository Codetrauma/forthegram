from app.models import db, Comment



def seed_comments():
    comment1 = Comment(comment='Cool test!' , user_id=5 , post_id=1)
    comment2 = Comment(comment='comment!' , user_id=1 , post_id=2)
    comment3 = Comment(comment='What a nice picture' , user_id=2 , post_id=2)
    comment4 = Comment(comment='Cute!' , user_id=3 , post_id=4)
    comment5 = Comment(comment='Awesome view' , user_id=7 , post_id=5)
    comment6 = Comment(comment='You can do it! :D', user_id=5, post_id=2)
    comment7= Comment(comment=';)', user_id=5, post_id=2)
    comment8 = Comment(comment='forthegram is sick', user_id=3, post_id=2)
    comment9 = Comment(comment='definitely not instagram', user_id=3, post_id=6)
    comment10 = Comment(comment='the best project!', user_id=4, post_id=6)
    comment11 = Comment(comment='wow!', user_id=1, post_id=8)
    comment12 = Comment(comment='cool!', user_id=2, post_id=8)
    comment13 = Comment(comment='amazing!', user_id=7, post_id=10)
    comment14 = Comment(comment='yayayaya!' , user_id=4 , post_id=1)


    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)
    db.session.add(comment14)

    db.session.commit()

def undo_comments():
  db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
  db.session.commit()
