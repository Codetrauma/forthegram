

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
    const posts = await response.json();
    dispatch(loadPosts(posts));
  }
}

export const addPost = (post) => async dispatch => {
  const response = await fetch('/api/posts/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  });
  if (response.ok) {
    const newPost = await response.json();
    dispatch(addOne(newPost));
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

const initialState = {entries: []};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        entries: [action.list]
      };
    case ADD_ONE:
      return {
        ...state,
        entries: [...state.entries, action.post]
      };
    case REMOVE:
      return {
        ...state,
        entries: state.entries.filter(p => p.id !== action.post.id)
      };
    case UPDATE:
      return {
        ...state,
        entries: state.entries.map(p => p.id === action.post.id ? action.post : p)
      };
    default:
      return state;
  }
}

export default postReducer;
