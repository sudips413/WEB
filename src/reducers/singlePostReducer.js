const initialState = {
    post: []
}

function singlePost(state = initialState, action) {
    switch(action.type){
        case "SET_SINGLE_POST":
            return {
                ...state,
                post: action.payload
            }
        default:
            return initialState;    
    }
}

export default singlePost;