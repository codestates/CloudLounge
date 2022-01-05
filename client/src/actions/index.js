//action-types
export const HANDLE_LOGIN = 'HANDLE_LOGIN'
export const CHANGE_LOCATION = 'CHANGE_LOCATION'
export const SET_LOUNGE = 'SET_LOUNGE'

//actions
export const handleLogin = () => {
  return {
    type: HANDLE_LOGIN,
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
