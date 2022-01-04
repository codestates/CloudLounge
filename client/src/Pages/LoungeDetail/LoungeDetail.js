import React from 'react'
import './LoungeDetail.css'
import Comment from '../../Components/Comment'

const LoungeDetail = () => {
  return (
    <div className="details">
      <img className="detailPic" />
      <div className="detailAddress">address</div>
      <div className="detailRatingText">별점: ?점</div>
      <div className="detailRating">
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
      <div className="comments">
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
    </div>
  )
}

export default LoungeDetail
