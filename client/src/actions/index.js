//action-types
export const HANDLE_LOGIN_TRUE = 'HANDLE_LOGIN_TRUE'
export const HANDLE_LOGIN_FALSE = 'HANDLE_LOGIN_FALSE'
export const CHANGE_LOCATION = 'CHANGE_LOCATION'
export const SET_LOUNGE = 'SET_LOUNGE'
export const HANDLE_ADMIN_TRUE = 'HANDLE_ADMIN_TRUE'
export const HANDLE_ADMIN_FALSE = 'HANDLE_ADMIN_FALSE'
export const GET_REPORTS_LIST = 'GET_REPORTS_LIST'
export const DELETE_REPORTS_LIST = 'DELETE_REPORTS_LIST'
export const HANDLE_ADMIN_PAGE_TRUE = 'HANDLE_ADMIN_PAGE_TRUE'
export const HANDLE_ADMIN_PAGE_FALSE = 'HANDLE_ADMIN_PAGE_FALSE'
export const NOTIFICATION_ON = 'NOTIFICATION_ON'
export const NOTIFICATION_OFF = 'NOTIFICATION_OFF'
export const SET_NOTIFICATION = 'SET_NOTIFICATION'

//actions
export const handleLoginTrue = () => {
  return {
    type: HANDLE_LOGIN_TRUE,
  }
}

export const handleLoginFalse = () => {
  return {
    type: HANDLE_LOGIN_FALSE,
  }
}

export const changeLocation = () => {
  return {
    type: CHANGE_LOCATION,
  }
}

export const setLounge = (lounge) => {
  return {
    type: SET_LOUNGE,
    body: lounge,
  }
}

export const handleAdminTrue = () => {
  return {
    type: HANDLE_ADMIN_TRUE,
  }
}

export const handleAdminFalse = () => {
  return {
    type: HANDLE_ADMIN_FALSE,
  }
}

export const deleteReportsList = (payload) => {
  return {
    type: DELETE_REPORTS_LIST,
    payload,
  }
}

export const getReportsList = (reportsList) => {
  return {
    type: GET_REPORTS_LIST,
    payload: reportsList,
  }
}

export const handleAdminPageTrue = () => {
  return {
    type: HANDLE_ADMIN_PAGE_TRUE,
  }
}

export const handleAdminPageFalse = () => {
  return {
    type: HANDLE_ADMIN_PAGE_FALSE,
  }
}

export const notificationOn = () => {
  return {
    type: NOTIFICATION_ON,
  }
}

export const notificationOff = () => {
  return {
    type: NOTIFICATION_OFF,
  }
}

export const setNotification = (text) => {
  return {
    type: SET_NOTIFICATION,
    body: text,
  }
}
