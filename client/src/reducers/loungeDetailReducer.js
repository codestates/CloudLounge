import { SET_LOUNGE } from '../actions'
import { initialState } from './initialState'

export const loungeDetailReducer = (state = initialState.loungeDetail, action) => {
  switch (action.type) {
    case SET_LOUNGE:
      return action.body
    default:
      return state
  }
}
