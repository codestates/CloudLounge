import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './LoungeDetail.css'
import Comment from '../../Components/Comment'
import loungeInfo from '../../dummy/sampledata'

const LoungeDetail = () => {
  let loungeId = localStorage.getItem('loungeId')
  let loungeDetail = loungeInfo[loungeId - 1]
  console.log(loungeDetail)
  return (
    <div className="details">
      <img className="detailPic" src={loungeDetail.image} />
      <div className="detailAddress">{loungeDetail.address}</div>
      <div className="detailRatingText">별점: {loungeDetail.avgStars}점</div>
      <div className="detailRating">
        <div className="star-fill" style={{ width: `${loungeDetail.avgStars * 20}%` }}>
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
        {loungeDetail.comments.map((el, index) => (
          <Comment key={index} comment={el} />
        ))}
        <Link to="/comment">
          <button className="writeComment">댓글작성</button>
        </Link>
      </div>
    </div>
  )
}

export default LoungeDetail
