from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', full_name='Demo User')
    Thien = User(
        username='Thien', email='thien@aa.io', password='password', full_name='Thien "10 Ten" Dang-it Bobby', description='Dang it bobby', profile_pic='https://i.imgur.com/8qP0NFx.png')
    fiona = User(
        username='Fiona', email='fiona@aa.io', password='password', full_name='Fiona "Jiona" Choi')
    audrey = User(
        username='Chanandler Bong', email='audrey@aa.io', password='password', full_name='Audrey')
    tanner = User(
        username='tanner', email='tanner@aa.io', password='password', full_name='Tanner "tantan" Shaw', description='', profile_pic='https://i.imgur.com/FY0LbG9.jpg')
    nathan = User(
        username='nathan', email='nathan@aa.io', password='password', full_name='Nathan')
    victoria = User(
        username='victoria', email='victoria@aa.io', password='password', full_name='Victoria')
    savnaha = User(
        username='Savnaha', email='savnaha@aa.io', password='password', full_name='Savnaha "Bulldozer" Trewman', description='The Bulldozer', profile_pic='https://i.imgur.com/Ibdsd81.jpg'
    )
    peter = User(
        username='Peter', email='peter@aa.io', password='password', full_name='Peter "Parker" Shin', description='Spider-man <3', profile_pic='https://ca.slack-edge.com/T03GU501J-U02E2FVJ8RZ-a02c02dd1ce5-512'
    )
    denise = User(
        username='durrneez', email='denise@aa.io', password='password', full_name='Denise "durrneez" Li', description='POPCORN DADDY', profile_pic='https://i.imgur.com/6UWeB0x.png'
    )

    demo.followers.append(Thien)
    demo.followers.append(fiona)
    demo.followers.append(savnaha)
    demo.followers.append(peter)
    Thien.followers.append(demo)
    audrey.followers.append(demo)
    audrey.followers.append(fiona)
    audrey.followers.append(Thien)
    audrey.followers.append(victoria)
    audrey.followers.append(savnaha)
    savnaha.followers.append(demo)
    peter.followers.append(fiona)
    peter.followers.append(denise)
    peter.followers.append(nathan)
    nathan.followers.append(peter)
    nathan.followers.append(victoria)
    victoria.followers.append(nathan)
    denise.followers.append(peter)
    denise.followers.append(tanner)
    tanner.followers.append(denise)
    tanner.followers.append(nathan)
    tanner.followers.append(demo)
    tanner.followers.append(victoria)
    denise.followers.append(fiona)
    denise.followers.append(demo)
    denise.followers.append(Thien)



    db.session.add(demo)
    db.session.add(Thien)
    db.session.add(fiona)
    db.session.add(audrey)
    db.session.add(tanner)
    db.session.add(nathan)
    db.session.add(victoria)
    db.session.add(savnaha)
    db.session.add(peter)
    db.session.add(denise)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
