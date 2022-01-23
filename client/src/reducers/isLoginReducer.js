import { HANDLE_LOGIN_TRUE } from '../actions'
import { HANDLE_LOGIN_FALSE } from '../actions'
import { initialState } from './initialState'

export const isLoginReducer = (state = initialState.isLogin, action) => {
  switch (action.type) {
    case HANDLE_LOGIN_TRUE:
      return {
        ...state,
        isLogin: true,
      }
    case HANDLE_LOGIN_FALSE:
      return {
        ...state,
        isLogin: false,
      }
    default:
      return state
  }
}
