import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPosts } from '../../store/posts';


function Dashboard() {
  const dispatch = useDispatch();

  const posts = useSelector(state => state.posts.entries);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(loadAllPosts());
  }, [dispatch]);

  const [comment, setComment] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      comment,
    }
  }

  if (sessionUser) {
    return (
      <div>
        <ul>
          {posts?.posts.map(post => (
            <li key={post.id}>
              <h4>{post.user.username}</h4>
              <img src='https://i.imgur.com/f6RGXwB.jpg' alt={post.caption} />
              <h3>{post.caption}</h3>
              {post?.comments.map(comment => (
                <div>
                  <h4>{comment?.user.username}</h4>
                  <p key={comment?.id}>{comment.comment}</p>
                </div>
              ))}
              <form>
                <input type='text' value={comment.comment} onChange={e => setComment(e.target.value)} />
                <button type='submit' onClick={handleSubmit}>Post</button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Dashboard;
