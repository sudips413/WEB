// userReducer.js
const initialState = {
    currentUser: {
      username: '',
      email : '',
      id:'',
      image:'',
      followings:'',
      followers:'',
      other:[],
      loginStatus: false
    }
  };
  
  function userReducer(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            username: action.payload.username,
            email: action.payload.email,
            id: action.payload.id,
            image: action.payload.image,
            other: action.payload.other,
            followers: action.payload.followers,
            followings: action.payload.followings,

            loginStatus: true
          }
        };
      case 'LOGOUT':
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            username: '',
            password:' ',
            loginStatus: false
          }
        };
      default:
        return state;
    }
  }
  
export default userReducer;