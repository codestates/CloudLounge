import React from 'react'
import './Comment.css'

const Comment = () => {
  return (
    <div className="commentSubmit">
      <div className="submitAddress">서울특별시 ....</div>
      <div className="submitStarRating">
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
      </div>
      <textarea className="submitContent"></textarea>
      <br></br>
      <button>댓글등록</button>
    </div>
  )
}

export default Comment
