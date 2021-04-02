import { combineReducers } from 'redux'

import auth from './auth'
import profile from './profile'
import post from './post'
import modalContent from './modalContent'
import chatData from './chatData'

export default combineReducers({
    auth,
    profile,
    post,
    chatData,
    modalContent
})