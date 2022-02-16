import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPosts } from '../../store/posts';


function Dashboard() {
  const dispatch = useDispatch();

  const posts = useSelector(state => state.posts.entries[0]);
  const sessionUser = useSelector(state => state.session.user);
  console.log("POSTS", posts);
  useEffect(() => {
    dispatch(loadAllPosts());
  }, [dispatch]);

  const [caption, setCaption] = useState('');
  const [image, setImage] = useState('');



  if (sessionUser) {
    return (
      <div>
        <h1>{sessionUser.username}'s Dashboard</h1>
        <h2>Posts</h2>
        {/* <ul>
          {posts?.map(post => (
            <li key={post.id}>
              <h3>{post.caption}</h3>
              <img src={post.image} alt={post.caption} />
            </li>
          ))}
        </ul> */}
      </div>
    );
  }
}

export default Dashboard;
