from app.models import db, Photos


def seed_photos():
  photo1 = Photos(photo='https://forthegram.s3.us-west-2.amazonaws.com/download.jpg', post_id=1)


  db.session.add(photo1)
  db.session.commit()
  
def undo_photos():
  db.session.execute('TRUNCATE photos RESTART IDENTITY CASCADE;')
  db.session.commit()
