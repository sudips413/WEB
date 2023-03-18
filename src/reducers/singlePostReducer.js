const initialState = {
    id: '',
}

function currentPostIDReducer(state = initialState, action) {
    switch(action.type){
        case "SET_POST_ID":
            return {
                ...state,
                id: action.payload
            }
        default:
            return initialState;    
    }
}

export default currentPostIDReducer;