
const LOAD_COMMENTS = 'comments/LOAD_COMMENTS';
const ADD_ONE = 'comments/ADD_ONE';
const REMOVE = 'comments/REMOVE';
const UPDATE = 'comments/UPDATE';


const loadComments = (comments) => ({
  type: LOAD_COMMENTS,
  comments
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

export const loadAllComments = () => async dispatch => {
  const response = await fetch(`/api/comments`);
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
    return newComment;
  }
}

const initialState = {entries: []}

const commentReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_COMMENTS:
      return {
        ...state,
        entries: [action.comments['comments']]
      };
    case ADD_ONE: {
      console.log(state.entries)
      return {...state, entries: [...state.entries, action.comments]}
    };
    default:
      return state;
  }
}

export default commentReducer;
