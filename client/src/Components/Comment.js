import React from 'react'

const Comment = ({ comment }) => {
  return (
    <div className="commentWrapper">
      <div className="commentHeader">
        <div className="commentWriter">작성자</div>
        <div className="commentCreatedAt">작성시간</div>
        <div className="commentRating">평점</div>
      </div>
      <div className="commentContent">댓글내용</div>
    </div>
  )
}

export default Comment
