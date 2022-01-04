import React from 'react'

const LoungeDetail = () => {
  return (
    <div className="details">
      <img />
      <div>address</div>
      <div>별점: ?점</div>
      <div className="rating">
        <div className="star-fill" style={{ width: `${data.avgStars * 20}%` }}>
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
      <div className="comments"></div>
    </div>
  )
}

export default LoungeDetail
