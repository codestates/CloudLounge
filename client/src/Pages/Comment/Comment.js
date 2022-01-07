import React, { useState } from 'react'
import './Comment.css'
import { useSelector } from 'react-redux'

const Comment = () => {
  const loungeDetail = useSelector((state) => state.loungeDetailReducer)
  const [rating, setRating] = useState(0)
  const [contents, setContent] = useState('')
  const submitComment = () => {
    if (rating === 0) {
      alert('별점을 선택해주세요')
    }
    if (contents === '') {
      alert('댓글을 작성해주세요')
    } else {
      console.log('loungeId: ', localStorage.getItem('loungeId'))
      console.log('rating: ', rating)
      console.log('contents: ', contents)
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
