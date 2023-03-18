const initialState = {
    loadingStatus: false

};


function loadingStatusReducer(state = initialState, action) {
    switch(action.type){
        case "SET_LOADING_STATUS":
            return {
                ...state,
                loadingStatus: action.payload
            }
        default:
            return initialState;    
    }
}

export default loadingStatusReducer;