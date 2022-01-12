import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLounge } from '../actions'
import axios from 'axios'

const Overlay = () => {
  const navigate = useNavigate()
  const isLogin = useSelector((state) => state.isLoginReducer)
  const loungeInfo = useSelector((state) => state.loungeDetailReducer)
  const moveReport = () => {
    if (isLogin.isLogin === true) {
      navigate('/report')
    } else {
      alert('로그인이 필요합니다.')
      navigate('/login')
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
