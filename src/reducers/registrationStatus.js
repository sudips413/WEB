const initialState = {
    registrationStatus: false
    
    };
function registrationStatusReducer(state = initialState, action) {
    switch(action.type){
        case "SET_REGISTRATION_STATUS":
            return {
                ...state,
                registrationStatus: action.payload
            }
        default:
            return initialState;    
    }
}
export default registrationStatusReducer;