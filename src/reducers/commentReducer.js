const initialState = {
    comments: []
}
const commentReducer = (state = initialState, action) => {
    switch(action.type){
        case "ADD_COMMENT":
            return {...state,
                comments: action.payload
            }
        default:
            return state;
    }
}

export default commentReducer;