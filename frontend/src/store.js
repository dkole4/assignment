import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import rulesReducer from './store/reducers/rules-reducer'
import notificationReducer from './store/reducers/notification-reducer'

const reducer = combineReducers({
  rules: rulesReducer,
  notification: notificationReducer
})

export const store = createStore(reducer, applyMiddleware(thunk))

export default store
