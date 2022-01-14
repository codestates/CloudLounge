import React, { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoungeDetail.css'
import Comment from '../../Components/Comment'
import { useSelector, useDispatch } from 'react-redux'
import { setLounge, notificationOn, setNextLink, setNotification } from '../../actions'
import axios from 'axios'

const LoungeDetail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loungeDetail = useSelector((state) => state.loungeDetailReducer)
  const isLogin = useSelector((state) => state.isLoginReducer.isLogin)
  useEffect(() => {
    if (Object.keys(loungeDetail).length === 0) {
      let loungeId = localStorage.getItem('loungeId')
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/lounge/info/${loungeId}`)
        .then((res) => {
          dispatch(setLounge(res.data.data))
        })
    }
  }, [])

  const commentBtnClick = () => {
    if (isLogin) {
      navigate('/comment')
    } else {
      dispatch(notificationOn())
      dispatch(setNotification('로그인이 필요한 서비스입니다.'))
      // dispatch(setNextLink('/login'))
    }
  }
  return (
    <Fragment>
      <div className="details">
        <img className="detailPic" src={loungeDetail.image} />
        <div className="detailAddress">{loungeDetail.address}</div>
        <div className="detailRatingText">별점: {loungeDetail.avgRating}점</div>
        <div className="detailRating">
          <div className="star-fill" style={{ width: `${loungeDetail.avgRating * 20}%` }}>
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
          {Object.keys(loungeDetail).length > 0
            ? loungeDetail.comments.map((el, index) => (
                <Comment key={index} comment={el} />
              ))
            : ''}
          {/* {commentdummy.map((el, index) => (
            <Comment key={index} comment={el} />
          ))} */}
        </div>
      </div>
      <div className="btnContainer">
        <img src="./iconComment.png" className="writeComment" onClick={commentBtnClick} />
      </div>
    </Fragment>
  )
}

export default LoungeDetail
