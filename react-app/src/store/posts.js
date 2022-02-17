

const LOAD_POSTS = 'posts/LOAD_POSTS';
const ADD_ONE = 'posts/ADD_ONE';
const REMOVE = 'posts/REMOVE';
const UPDATE = 'posts/UPDATE';

const loadPosts = (list) => ({
  type: LOAD_POSTS,
  list
})

const addOne = (post) => ({
  type: ADD_ONE,
  post
})

const remove = (post) => ({
  type: REMOVE,
  post
})

const update = (post) => ({
  type: UPDATE,
  post
})

export const loadAllPosts = () => async dispatch => {
  const response = await fetch('/api/posts');
  if (response.ok) {
    const all_posts = await response.json();
    dispatch(loadPosts(all_posts));
    return all_posts;
  }
}

export const addPost = (post) => async dispatch => {
  const response = await fetch('/api/posts/new', {
    method: 'POST',
    body: post
  });
  if (response.ok) {
    const newPost = await response.json();
    dispatch(addOne(newPost));
    return newPost
  }
}

export const removePost = (post) => async dispatch => {
  const response = await fetch(`/api/posts/${post.id}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    const deleted = await response.json();
    dispatch(remove(deleted));
  }
}

export const updatePost = (post) => async dispatch => {
  const response = await fetch(`/api/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  });
  if (response.ok) {
    const updated = await response.json();
    dispatch(update(updated));
  }
}

const initialState = {};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      const allPosts = {}
      action.list.posts.forEach((post) => {
        allPosts[post.id] = post
      })
      return {...allPosts}
    case ADD_ONE:
      return {
        ...state,
        [action.post.id]: action.post
      };
    case REMOVE: {
      const newState = {...state}
      delete newState[action.post.id]
      return newState
    }
    case UPDATE: {
      const newState = {...state}
      newState[action.post.post.id] = action.post.post
      return newState
    }
    default:
      return state;
  }
}

export default postReducer;
