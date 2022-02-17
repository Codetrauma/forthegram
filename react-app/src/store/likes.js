
const LOAD_LIKES = 'likes/LOAD_LIKES';
const ADD_ONE = 'likes/ADD_ONE';
const REMOVE = 'likes/REMOVE';


const loadLikes = (likes) => ({
  type: LOAD_LIKES,
  likes
})

const addOne = (like) => ({
  type: ADD_ONE,
  like
})

const remove = (like) => ({
  type: REMOVE,
  like
})

export const loadAllLikes = () => async dispatch => {
  const response = await fetch(`/api/likes/`);
  if (response.ok) {
    const all_likes = await response.json();
    dispatch(loadLikes(all_likes));
    return all_likes;
  }
}

export const addLike = (data) => async dispatch => {
  const response = await fetch(`/api/likes/${data.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (response.ok) {
    const newLike = await response.json();
    dispatch(addOne(newLike));
    return newLike;
  }
}

export const removeLike = (id) => async dispatch => {
  const response = await fetch(`/api/likes/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    const deleted = await response.json()
    dispatch(remove(deleted));
  }
}

const initialState = {}

const likeReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_LIKES:
      const allLikes = {}
      action.likes.likes.forEach((like) => {
        allLikes[like.id] = like
      })
      return {...allLikes}
    case ADD_ONE:
      return {
        ...state,
        [action.like.id]: action.like
      }
    case REMOVE: {
      newState = {...state};
      delete newState[action.like]
      return newState;
    };
    default:
      return state;
  }
}

export default likeReducer;
