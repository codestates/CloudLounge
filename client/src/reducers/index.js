import { combineReducers } from 'redux'
import { isLoginReducer } from './isLoginReducer'
import { locationReducer } from './locationReducer'
import { loungeDetailReducer } from './loungeDetailReducer'
import { isAdminReducer } from './isAdminReducer'
import { reportsListReducer } from './reportsListReducer'
import { isReportEmptyReducer } from './isReportEmptyReducer'
import { isNotificationReducer } from './isNotificationReducer'
import { notificationTextReducer } from './notificationTextReducer'

export const rootReducer = combineReducers({
  isLoginReducer,
  locationReducer,
  loungeDetailReducer,
  isAdminReducer,
  reportsListReducer,
  isReportEmptyReducer,
  isNotificationReducer,
  notificationTextReducer,
})
