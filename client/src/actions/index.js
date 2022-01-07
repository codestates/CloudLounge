//action-types
export const HANDLE_LOGIN_TRUE = 'HANDLE_LOGIN_TRUE'
export const HANDLE_LOGIN_FALSE = 'HANDLE_LOGIN_FALSE'
export const CHANGE_LOCATION = 'CHANGE_LOCATION'
export const SET_LOUNGE = 'SET_LOUNGE'

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
