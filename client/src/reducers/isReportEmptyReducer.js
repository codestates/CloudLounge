import { HANDLE_ADMIN_PAGE_TRUE, HANDLE_ADMIN_PAGE_FALSE } from '../actions'
import { initialState } from './initialState'

export const isReportEmptyReducer = (state = initialState.isReportEmpty, action) => {
  switch (action.type) {
    //action.payload.loungeId -> 해당 라운지아이디
    case HANDLE_ADMIN_PAGE_TRUE:
      return {
        ...state,
        isReportEmpty: false,
      }

    case HANDLE_ADMIN_PAGE_FALSE:
      return {
        ...state,
        isReportEmpty: true,
      }
    default:
      return state
  }
}
