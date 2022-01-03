import { HANDLE_LOGIN } from '../actions'
import { initialState } from './initialState'

export const isLoginReducer = (state = initialState.isLogin, action) => {
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
