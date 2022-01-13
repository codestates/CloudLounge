import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { notificationOff } from '../actions'

const Notification = () => {
  const notificationText = useSelector((state) => state.notificationTextReducer)
  const dispatch = useDispatch()
  const closeNotification = () => {
    dispatch(notificationOff())
  }
  return (
    <div className="notificationContainer">
      <div className="notification">
        <span>{notificationText}</span>
        <button onClick={closeNotification}>확인</button>
      </div>
    </div>
  )
}

export default Notification
