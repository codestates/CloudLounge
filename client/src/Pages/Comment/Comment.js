import React, { useState } from 'react'
import './Comment.css'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { setLounge, notificationOn, setNotification, setNextLink } from '../../actions'

const Comment = () => {
  const loungeDetail = useSelector((state) => state.loungeDetailReducer)
  const [rating, setRating] = useState(0)
  const [contents, setContent] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const submitComment = () => {
    if (rating === 0) {
      dispatch(notificationOn())
      dispatch(setNotification('별점을 선택해주세요.'))
    } else if (contents === '') {
      dispatch(notificationOn())
      dispatch(setNotification('댓글을 작성해주세요.'))
    } else {
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/lounge/comment`,
        headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        data: {
          loungeId: localStorage.getItem('loungeId'),
          rating: rating,
          contents: contents,
        },
      })
        .then((res) => {
          if (res.status === 201) {
            dispatch(notificationOn())
            dispatch(setNotification('댓글이 등록되었습니다.'))
            dispatch(setNextLink('/details'))
            axios({
              method: 'GET',
              url: `${
                process.env.REACT_APP_SERVER_URL
              }/lounge/info/${localStorage.getItem('loungeId')}`,
            }).then((res) => {
              dispatch(setLounge(res.data.data))
            })
          }
        })
        .catch((err) => {
          if (err.status === 400) {
            dispatch(notificationOn())
            dispatch(setNotification('댓글을 등록하기 위한 정보가 부족합니다.'))
          }
        })
    }
  }

  const textareaChange = (e) => {
    setContent(e.target.value)
  }

  return (
    <div className="commentSubmit">
      <img className="submitImage" src={loungeDetail.image} />
      <div className="submitAddress">{loungeDetail.address}</div>
      <div className="submitRating">
        <div className="submitStar-fill" style={{ width: `${rating * 20}%` }}>
          <span
            onClick={() => {
              setRating(1)
            }}
          >
            ★
          </span>
          <span
            onClick={() => {
              setRating(2)
            }}
          >
            ★
          </span>
          <span
            onClick={() => {
              setRating(3)
            }}
          >
            ★
          </span>
          <span
            onClick={() => {
              setRating(4)
            }}
          >
            ★
          </span>
          <span
            onClick={() => {
              setRating(5)
            }}
          >
            ★
          </span>
        </div>
        <div className="submitStar-base">
          <span
            onClick={() => {
              setRating(1)
            }}
          >
            ★
          </span>
          <span
            onClick={() => {
              setRating(2)
            }}
          >
            ★
          </span>
          <span
            onClick={() => {
              setRating(3)
            }}
          >
            ★
          </span>
          <span
            onClick={() => {
              setRating(4)
            }}
          >
            ★
          </span>
          <span
            onClick={() => {
              setRating(5)
            }}
          >
            ★
          </span>
        </div>
      </div>
      <textarea
        className="submitContent"
        placeholder="댓글을 작성해주세요"
        onChange={textareaChange}
      ></textarea>
      <br></br>
      <button className="commentSubmitBtn" onClick={submitComment}>
        댓글등록
      </button>
    </div>
  )
}

export default Comment
