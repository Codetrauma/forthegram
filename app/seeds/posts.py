from app.models import db, Post

def seed_posts():
    post1 = Post(caption='Test post', user_id=3)
    post2 = Post(caption='This is a cool test post!', user_id=2)
    post3 = Post(caption='ForTheGram! wow!', user_id=3)
    post4 = Post(caption='marnie', user_id=3)
    post5 = Post(caption='bobbie', user_id=3)
    post6 = Post(caption='wowie', user_id=1)
    post7 = Post(caption='yayayaa', user_id=1)
    post8 = Post(caption='another cool test post!', user_id=4)
    post9 = Post(caption='what a view', user_id=3)
    post10 = Post(caption='what a project!', user_id=6)

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)

    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
