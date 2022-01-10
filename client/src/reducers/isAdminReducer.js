import { HANDLE_ADMIN_TRUE } from '../actions'
import { HANDLE_ADMIN_FALSE } from '../actions'
import { initialState } from './initialState'

export const isAdminReducer = (state = initialState.isAdmin, action) => {
  switch (action.type) {
    case HANDLE_ADMIN_TRUE:
      return {
        ...state,
        isAdmin: true,
      }
    case HANDLE_ADMIN_FALSE:
      return {
        ...state,
        isAdmin: false,
      }
    default:
      return state
  }
}
