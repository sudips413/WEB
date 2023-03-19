const initialState = {
    posts: []
    };
const singlepostinitialState = {
    post: {}
    };

function postReducer(state = initialState, action) {

        switch(action.type){
            case "SET_POST":
                return {
                    ...state,
                    posts: action.payload             }
            default:
                return initialState;    
            

        }
}

export default postReducer;