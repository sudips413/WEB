import {combineReducers} from 'redux'
import userReducer from './userReducer'
import postReducer from './postReducer'
import registrationStatusReducer from './registrationStatus'
import userAllReducer from './userList'

const rootReducer = combineReducers({
    userReducer,
    postReducer,
    registrationStatusReducer,userAllReducer
})
export default rootReducer