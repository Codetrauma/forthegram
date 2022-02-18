import boto3
import botocore
import uuid
import os

s3 = boto3.client(
    's3',
    aws_access_key_id=os.environ.get('S3_KEY'),
    aws_secret_access_key=os.environ.get('S3_SECRET')
)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_unique_filename(filename):
    """
    Generates a unique filename for uploaded files
    """
    ext = filename.rsplit('.', 1)[1].lower()
    filename = f'{uuid.uuid4()}.{ext}'
    return filename

BUCKET_NAME = os.environ.get('S3_BUCKET')
S3_LOCATION = f'http://forthegram.s3.amazonaws.com/'

def upload_file_to_s3(file, acl='public-read'):
  try:
    s3.upload_fileobj(
      file,
      BUCKET_NAME,
      file.filename,
      ExtraArgs={
        "ACL": acl,
        "ContentType": file.content_type
      }
    )
  except Exception as e:
    print("Something Happened: ", e)
    return e
  return {"url": f"{S3_LOCATION}{file.filename}"}
