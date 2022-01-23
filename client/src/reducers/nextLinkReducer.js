import { SET_NEXTLINK } from '../actions'
import { initialState } from './initialState'

export const nextLinkReducer = (state = initialState.nextLink, action) => {
  switch (action.type) {
    case SET_NEXTLINK:
      return action.body
    default:
      return state
  }
}
