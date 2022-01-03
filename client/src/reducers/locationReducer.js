import { CHANGE_LOCATION } from '../actions'
import { initialState } from './initialState'

export const locationReducer = (state = initialState.location, action) => {
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
