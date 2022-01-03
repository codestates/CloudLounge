import { combineReducers } from 'redux'
import { isLoginReducer } from './isLoginReducer'
import { locationReducer } from './locationReducer'

export const rootReducer = combineReducers({
  isLoginReducer,
  locationReducer,
})
