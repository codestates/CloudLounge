import React from 'react'

const Comment = ({ comment }) => {
  return (
    <div className="commentWrapper">
      <div className="commentHeader">
        <div className="commentWriter">{comment.userId}</div>
        <div className="commentCreatedAt">{comment.createdAt}</div>
        <div className="commentRating">별점: {comment.stars}점</div>
        {/* <div className="rating">
          <div className="star-fill" style={{ width: `${comment.stars * 20}%` }}>
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
        </div>*/}
      </div>
      <div className="commentContent">{comment.contents}</div>
    </div>
  )
}

export default Comment
