
const LOAD_USERS = 'users/LOAD_USERS';


const loadUsers = (users) => ({
  type: LOAD_USERS,
  users
})

export const loadAllUsers = () => async dispatch => {
  const response = await fetch('/api/users/');
  if (response.ok) {
    const all_users = await response.json();
    dispatch(loadUsers(all_users));
    return all_users;
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
    default:
      return state;
  }
}

export default userReducer;
