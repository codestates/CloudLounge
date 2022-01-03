//action-types
export const HANDLE_LOGIN = 'HANDLE_LOGIN'
export const CHANGE_LOCATION = 'CHANGE_LOCATION'

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
