import {combineReducers} from 'redux'
import userReducer from './userReducer'
import postReducer from './postReducer'
import registrationStatusReducer from './registrationStatus'

const rootReducer = combineReducers({
    userReducer,
    postReducer,
    registrationStatusReducer
})
export default rootReducer