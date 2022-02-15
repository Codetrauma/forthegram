from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', full_name='Demo User')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', full_name='Marnie')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', full_name='Bobbie')
    audrey = User(
        username='ghxstly', email='ghxstyle@aa.io', password='password', full_name='Audrey')
    tanner = User(
        username='tanner', email='tanner@aa.io', password='password', full_name='Tanner')
    nathan = User(
        username='nathan', email='nathan@aa.io', password='password', full_name='Nathan')
    victoria = User(
        username='victoria', email='victoria@aa.io', password='password', full_name='Victoria')



    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(audrey)
    db.session.add(tanner)
    db.session.add(nathan)
    db.session.add(victoria)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
