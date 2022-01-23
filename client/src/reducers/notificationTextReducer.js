import { SET_NOTIFICATION } from '../actions'
import { initialState } from './initialState'

export const notificationTextReducer = (
  state = initialState.notificationText,
  action
) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return action.body
    default:
      return state
  }
}
