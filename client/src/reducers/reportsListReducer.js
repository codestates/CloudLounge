import { GET_REPORTS_LIST } from '../actions'
import { initialState } from './initialState'

export const reportsListReducer = (state = initialState.reportsList, action) => {
  switch (action.type) {
    //action.payload.loungeId -> 해당 라운지아이디
    case GET_REPORTS_LIST:
      let copyState = state.reportsList.slice(0)
      let newState = copyState.filter((el) => el.loungeId !== action.payload.loungeId)
      //   console.log('@@@@@@@@@@@', copyState)
      return {
        ...state,
        reportsList: newState,
      }
    default:
      return state
  }
}
