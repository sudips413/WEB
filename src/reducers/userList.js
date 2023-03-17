const initialState = {
    users: [{
        username: "Sudip Shrestha",
        image:"https://server-7n65.onrender.com/images/me1.jpg",
        
    }]
    };

function userAllReducer(state = initialState, action) {
    switch(action.type){
        case "SET_USERS":
            return {
                ...state,
                users: action.payload
            }
        default:
            return initialState;    
    }
}
export default userAllReducer;
