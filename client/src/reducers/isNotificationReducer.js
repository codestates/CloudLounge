import { NOTIFICATION_ON, NOTIFICATION_OFF } from '../actions'
import { initialState } from './initialState'

export const isNotificationReducer = (state = initialState.isNotification, action) => {
  switch (action.type) {
    case NOTIFICATION_ON:
      return true
    case NOTIFICATION_OFF:
      return false
    default:
      return state
  }
}
