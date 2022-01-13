import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { notificationOff } from '../actions'

const Notification = () => {
  const notificationText = useSelector((state) => state.notificationTextReducer)
  const dispatch = useDispatch()
  const closeNotification = (event) => {
    if (event.target.className !== 'notification' && event.target.tagName !== 'SPAN') {
      dispatch(notificationOff())
    }
  }
  return (
    <div className="notificationContainer" onClick={closeNotification}>
      <div className="notification">
        <span>{notificationText}</span>
        <button>확인</button>
      </div>
    </div>
  )
}

export default Notification
