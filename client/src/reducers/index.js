import { combineReducers } from 'redux'

import auth from './auth'
import profile from './profile'
import post from './post'
import modalContent from './modalContent'

export default combineReducers({
    auth,
    profile,
    post,
    modalContent
})