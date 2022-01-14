import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { notificationOn, setNotification, setNextLink } from '../actions'

const Overlay = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLogin = useSelector((state) => state.isLoginReducer)
  const loungeInfo = useSelector((state) => state.loungeDetailReducer)
  const moveReport = () => {
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
        <span>{loungeInfo.address}</span>
        <div className="overlayButton">
          <button onClick={moveReport}>report</button>
          <button onClick={moveDetail}>detail</button>
        </div>
      </div>
    </div>
  )
}

export default Overlay
