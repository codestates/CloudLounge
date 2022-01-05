import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Overlay = ({ loungeId }) => {
  const navigate = useNavigate()
  const moveReport = () => {
    if (useSelector((state) => state.isLoginReducer).isLogin === true) {
      navigate('/report')
    } else {
      navigate('/login')
    }
  }
  return (
    <div className="container">
      <div className="top">
        <button onClick={moveReport}>신고</button>
      </div>
      <div className="info">
        <img src="" className="lounge" />
        <div className="start-rating">별점: 3.0</div>
        <div className="rating">
          <div className="star-fill" style={{ width: `${2 * 20}%` }}>
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
        <div className="address">서울특별시...</div>
        <Link to="/details">
          <button>자세히보기</button>
        </Link>
      </div>
    </div>
  )
}

export default Overlay
