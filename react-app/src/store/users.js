
const LOAD_USERS = 'users/LOAD_USERS';
const UPDATE = 'users/UPDATE';

const loadUsers = (users) => ({
  type: LOAD_USERS,
  users
})

const updateUser = (user) => ({
  type: UPDATE,
  user
})


export const loadAllUsers = () => async dispatch => {
  const response = await fetch('/api/users/');
  if (response.ok) {
    const all_users = await response.json();
    dispatch(loadUsers(all_users));
    return all_users;
  }
}

export const updateUserInfo = (info) => async dispatch => {
  const response = await fetch(`/api/users/${info.id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(info)
  });
  if (response.ok) {
    const updated = await response.json();
    dispatch(updateUser(updated));
  }
}


const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS:
      const allUsers = {};
      action.users.users.forEach(user => {
        allUsers[user.id] = user;
      });
      return {...allUsers};
    case UPDATE:
      const newState = {...state};
      newState[action.user.id] = action.user;
      return newState;
    default:
      return state;
  }
}

export default userReducer;
