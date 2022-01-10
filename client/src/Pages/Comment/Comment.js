import React, { useState } from 'react'
import './Comment.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Comment = () => {
  const loungeDetail = useSelector((state) => state.loungeDetailReducer)
  const [rating, setRating] = useState(0)
  const [contents, setContent] = useState('')
  const navigate = useNavigate()
  const submitComment = () => {
    if (rating === 0) {
      alert('별점을 선택해주세요')
    } else if (contents === '') {
      alert('댓글을 작성해주세요')
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
            alert('댓글이 등록되었습니다.')
            navigate('/details')
          }
        })
        .catch((err) => {
          alert('error')
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
