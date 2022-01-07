import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './LoungeDetail.css'
import Comment from '../../Components/Comment'
import loungeInfo from '../../dummy/sampledata'
import { useDispatch } from 'react-redux'
import { setLounge } from '../../actions'
import commentdummy from './commentdummy'

const LoungeDetail = () => {
  const dispatch = useDispatch()
  let loungeId = localStorage.getItem('loungeId')
  //lounge정보를 가져오는 코드 axios이용
  let loungeDetail = loungeInfo[loungeId - 1]
  dispatch(setLounge(loungeDetail))
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
        {/* {loungeDetail.comments.map((el, index) => (
          <Comment key={index} comment={el} />
        ))} */}
        {commentdummy.map((el, index) => (
          <Comment key={index} comment={el} />
        ))}
      </div>
      <Link to="/comment">
        <img src="./iconComment.png" className="writeComment" />
      </Link>
    </div>
  )
}

export default LoungeDetail
