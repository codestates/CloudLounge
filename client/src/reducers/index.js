import { combineReducers } from 'redux'
import { isLoginReducer } from './isLoginReducer'
import { locationReducer } from './locationReducer'
import { loungeDetailReducer } from './loungeDetailReducer'

export const rootReducer = combineReducers({
  isLoginReducer,
  locationReducer,
  loungeDetailReducer,
})
