
const LOAD_COMMENTS = 'comments/LOAD_COMMENTS';
const ADD_ONE = 'comments/ADD_ONE';
const REMOVE = 'comments/REMOVE';
const UPDATE = 'comments/UPDATE';


const loadComments = (list) => ({
  type: LOAD_COMMENTS,
  list
})

const addOne = (comment) => ({
  type: ADD_ONE,
  comment
})

const remove = (comment) => ({
  type: REMOVE,
  comment
})

const update = (comment) => ({
  type: UPDATE,
  comment
})

export const loadAllComments = (post) => async dispatch => {
  const response = await fetch(`/api/posts/${post.id}/comments`);
  if (response.ok) {
    const all_comments = await response.json();
    dispatch(loadComments(all_comments));
    return all_comments;
  }
}

export const addComment = (data) => async dispatch => {
  const response = await fetch(`/api/posts/${data.post_id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (response.ok) {
    const newComment = await response.json();
    dispatch(addOne(newComment));
  }
}

const initialState = {}

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COMMENTS:
      return {
        ...state,
        entries: action.list
      };
    case ADD_ONE:
      return {
        ...state,
        entries: [...state.entries, action.comment]
      };
    case REMOVE:
      return {
        ...state,
        entries: state.entries.filter(p => p.id !== action.comment.id)
      };
    case UPDATE:
      return {
        ...state,
        entries: state.entries.map(p => p.id === action.comment.id ? action.comment : p)
      };
    default:
      return state;
  }
}

export default commentReducer;
