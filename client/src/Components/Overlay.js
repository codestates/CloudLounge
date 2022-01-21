import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { notificationOn, setNotification } from '../actions'
import { HiOutlineLocationMarker } from 'react-icons/hi'

const Overlay = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLogin = useSelector((state) => state.isLoginReducer)
  const loungeInfo = useSelector((state) => state.loungeDetailReducer)
  const isNotification = useSelector((state) => state.isNotificationReducer)
  const moveReport = () => {
    if (isNotification) {
      return
    }
    if (isLogin.isLogin === true) {
      navigate('/report')
    } else {
      dispatch(notificationOn())
      dispatch(setNotification('로그인이 필요한 서비스입니다.'))
      // dispatch(setNextLink('/login'))
    }
  }
  const moveDetail = () => {
    navigate('/details')
  }
  return (
    <div className="overlay">
      <img src={loungeInfo.image} className="overlayImg"></img>
      <div className="overlayContent">
        <span className="overlay-address">{loungeInfo.address}</span>
        <div className="overlayRating">
          <div className="star-fill" style={{ width: `${loungeInfo.avgRating * 20}%` }}>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
          <div className="star-base">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
        </div>
        <div className="overlayButton">
          <button onClick={moveReport}>report</button>
          <button onClick={moveDetail}>detail</button>
        </div>
      </div>
    </div>
  )
}

export default Overlay
