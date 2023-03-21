const initialState = {
    users: []
    };

function userAllReducer(state = initialState, action) {
    switch(action.type){
        case "GET_USER":
            return {
                ...state,
                users: action.payload

            }
        default:
            return initialState;    
    }
}
export default userAllReducer;
