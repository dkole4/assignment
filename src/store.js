import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import rulesReducer from './reducer-rules'
import filterReducer from './reducer-filter'
import notificationReducer from './reducer-notification'

const reducer = combineReducers({
  rules: rulesReducer,
  filter: filterReducer,
  notification: notificationReducer
})

export const store = createStore(reducer, applyMiddleware(thunk))

export default store
