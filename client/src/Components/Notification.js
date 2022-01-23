import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { notificationOff, setNextLink } from '../actions'
import { useNavigate } from 'react-router-dom'

const Notification = () => {
  const navigate = useNavigate()
  const notificationText = useSelector((state) => state.notificationTextReducer)
  const nextLink = useSelector((state) => state.nextLinkReducer)
  const dispatch = useDispatch()
  const closeNotification = (event) => {
    if (event.target.className !== 'notification' && event.target.tagName !== 'SPAN') {
      dispatch(notificationOff())
      if (nextLink !== '') {
        navigate(nextLink)
      }
    }
  }
  useEffect(() => {
    return () => {
      dispatch(setNextLink(''))
    }
  }, [])
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
