import { createStore, applyMiddleware, combineReducers } from 'redux'
import createLogger from 'redux-logger'

//actions
//action-types
const HANDLE_LOGIN = 'HANDLE_LOGIN'
const handleLogin = () => {
  return {
    type: HANDLE_LOGIN,
  }
}

const CHANGE_LOCATION = 'CHANGE_LOCATION'
const changeLocation = () => {
  return {
    type: CHANGE_LOCATION,
  }
}
// reducers
const isLoginInitState = {
  isLogin: false,
}
const locationInitState = {
  location: [1, 5],
}

const isLoginReducer = (state = isLoginInitState, action) => {
  switch (action.type) {
    case HANDLE_LOGIN:
      return {
        ...state,
        isLogin: !state.isLogin,
      }
    default:
      return state
  }
}

const locationReducer = (state = locationInitState, action) => {
  switch (action.type) {
    case CHANGE_LOCATION:
      return {
        ...state,
        location: [state.location[0] + 1, state.location[1] + 1],
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  isLogin: isLoginReducer,
  location: locationReducer,
})

//store
const store = createStore(rootReducer, applyMiddleware(createLogger))

//dispatch
// store.subscribe(() => {
//   console.log('login==>', store.getState())
// })

store.dispatch(handleLogin())
store.dispatch(changeLocation())
store.dispatch(handleLogin())
store.dispatch(changeLocation())
