import React from 'react'

const Comment = ({ comment }) => {
  function dateTransform(createdAt) {
    let temp = new Date(createdAt)
    let year = temp.getFullYear()
    let month = ('0' + temp.getMonth() + 1).slice(-2)
    let day = ('0' + temp.getDay()).slice(-2)
    let time
    if (temp.getHours() > 12) {
      time = '오후' + ('0' + (temp.getHours() - 12)).slice(-2)
    } else {
      time = '오전' + ('0' + temp.getHours()).slice(-2)
    }
    let minute = ('0' + temp.getMinutes()).slice(-2)
    return `${year}/${month}/${day} ${time}:${minute}`
  }
  return (
    <div className="commentWrapper">
      <div className="commentHeader">
        <div className="commentWriter">{comment.userId}</div>
        <div className="commentCreatedAt">{dateTransform(comment.createdAt)}</div>
        <div className="commentRating">별점: {comment.rating}점</div>
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
