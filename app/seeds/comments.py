from app.models import db, Comment



def seed_comments():
    comment1 = Comment(comment='What the dog doin' , user_id=5 , post_id=1)
    comment2 = Comment(comment='Das a cute dog' , user_id=2 , post_id=1)
    comment3 = Comment(comment='Don"t get stuck 10' , user_id=5 , post_id=2)
    comment4 = Comment(comment='Cute!' , user_id=3 , post_id=4)
    comment5 = Comment(comment='Awesome view' , user_id=3 , post_id=5)
    comment6 = Comment(comment='ADORABLE', user_id=8, post_id=4)
    comment7 = Comment(comment='As above so below', user_id=5, post_id=3)
    comment8 = Comment(comment='', user_id=3, post_id=2)
    comment9 = Comment(comment='', user_id=3, post_id=6)
    comment10 = Comment(comment='the best project!', user_id=4, post_id=6)
    comment11 = Comment(comment='Flappy arm man', user_id=1, post_id=7)
    comment12 = Comment(comment='Same', user_id=6, post_id=9)
    comment13 = Comment(comment='amazing!', user_id=7, post_id=10)
    comment14 = Comment(comment=':D' , user_id=5 , post_id=8)


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
