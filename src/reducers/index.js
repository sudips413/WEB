import {combineReducers} from 'redux'
import userReducer from './userReducer'
import postReducer from './postReducer'
import registrationStatusReducer from './registrationStatus'
import userAllReducer from './userList'
import singlePost from './singlePostReducer'
import loadingStatusReducer from './loadingStatus'

const rootReducer = combineReducers({
    userReducer,
    postReducer,
    registrationStatusReducer,
    userAllReducer,
    singlePost,loadingStatusReducer
})
export default rootReducer