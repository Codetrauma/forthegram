<h1 align='center' style='font-weight: bold'> ForTheGram</h1>
<div>
<p align='center'>ForTheGram, a project inspired by <a style='font-weight: bold' href='https://www.instagram.com/'>Instagram</a>, is a platform that allows users to make posts of images they've taken or found and share with all of their followers!
<br>
</br>
</p>

</div>

<h1 align='center' style='font-weight: bold'> Index </h1>
<br>
<div align='center' style='font-weight: bold'>
 <a href='https://github.com/JTannerShaw/forthegram/wiki/Feature-List'>Feature List</a> - <a href='https://github.com/JTannerShaw/forthegram/wiki/DB-Schema'>DB Schema</a> - <a href='https://github.com/JTannerShaw/forthegram/wiki/API-Documentation'>API Documentation</a> - <a href='https://github.com/JTannerShaw/forthegram/wiki/Frontend-Routes'> Frontend Routes </a> - <a href='https://github.com/JTannerShaw/forthegram/wiki/User-Stories'>User Stories</a>
<br>
</br>
</div>
<div align='center'>
<h1 align='center' style='font-weight: bold'>Technologies Used </h1>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg" height=40/>


</div>
<br>
</br>

<h1 align='center' style='font-weight: bold'>Launching Locally </h1>

<h2 style='font-weight: bold'>Prerequisites </h2>
*  <a href='(https://www.python.org/downloads/'> Python 3.10 </a><br/>
*  <a href='https://www.postgresql.org/docs/12/index.html'> PostgreSQL 12s </a>

<br/>
<h2  style='font-weight: bold'>Getting Started </h2>

1. Clone the project repository

  ```
  git clone git@github.com:JTannerShaw/forthegram.git
  ```

2. Install Dependencies

* Flask:

    ```
    pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
    ```

* React-App:

    ```
    cd react-app
    ```
    ```
    npm install
    ```

3. Create a .env file base on the .env.example given in the root directory

* .env:
  ```
  FLASK_APP=app
  FLASK_ENV=development
  SECRET_KEY=<your strong secret key>
  DATABASE_URL=postgresql://<username>:<password>@<server>/<database>
  S3_BUCKET=<name of your s3 bucket>
  S3_KEY=<your s3 user access-key>
  S3_SECRET=<your s3 user secret-key>
  ```

4. Setup your username and database based on what you setup in your .env

5. Migrate and seed the database by intiating the pipenv shell from the root directory.

    ```
    pipenv shell
    ```
    ```
    flask db upgrade
    ```
    ```
    flask seed all
    ```

6. Start the server from the root directory.

    ```
    flask run
    ```


7. Start the frontend from the react-app directory.

    ```
    cd react-app
    ```
    ```
    npm start
    ```

<h1 align='center' style='font-weight: bold'>Functionality & Key Features</h1>

<h2  align='center' style='font-weight: bold'>Splash Page and Signup</h2>


<p align='center'>This is where a user lands when first getting to the app. A user cannot access any part of the site until they've successfully logged in or created an account.</p>

<img src='https://i.imgur.com/z3fXR45.png' />
<img src='https://i.imgur.com/vpEMM2K.png' />



<h1  align='center' style='font-weight: bold'>Feed</h2>

<p align='center'>Here is where a user can see and create all of their posts or posts of other users as well as comment and like posts.


<img src='https://i.imgur.com/Z5aOX8w.png' />
<img src='https://i.imgur.com/yD0Fp0A.png' />
<img src='https://i.imgur.com/SjeiFhe.png' />
<img src='https://i.gyazo.com/03c94c8ecdc72c71fb6c7e295a4fa914.png' />
<h1  align='center' style='font-weight: bold'>User Profiles</h2>

<p align='center'>Users can click their profile picture in the navbar at the top right of the page to access their profiles or access other users profiles by click their names/icons on posts. Here users can see all the posts of the user whose profile they are at as well as follow or unfollow the user. If a user is on their own profile they gain the ability to edit their Name and Description in their profile.

<img src='https://i.imgur.com/sLRcM8i.png' />



<h1  align='center' style='font-weight: bold'>Future Features</h2>

<ul>
<li>Follower/Following displays those users</li>
<li>Feed only displays posts of users you're following</li>
<li>Better/More Styling</li>
<li>Private Messaging</li>
<li>Block users</li>
</ul>
