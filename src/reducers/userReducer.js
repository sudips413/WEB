// userReducer.js
const initialState = {
    currentUser: {
      username: '',
      email : '',
      id:'',
      image:{
        data: '',
        contentType: ''

      },
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