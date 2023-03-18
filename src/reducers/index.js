import {combineReducers} from 'redux'
import userReducer from './userReducer'
import postReducer from './postReducer'
import registrationStatusReducer from './registrationStatus'
import userAllReducer from './userList'
import currentPostIDReducer from './singlePostReducer'

const rootReducer = combineReducers({
    userReducer,
    postReducer,
    registrationStatusReducer,
    userAllReducer,
    currentPostIDReducer
})
export default rootReducer