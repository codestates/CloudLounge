function createContent(data) {
  return `<div class="container">
      <div class="top">
        <button onclick="report()">신고</button>
      </div>
      <div class="info">
        <img src="${data.image}" class="lounge"/>
        <div class="start-rating">별점: ${data.avgStars}</div>
        <div class="rating">
        <div class="star-fill" style="width: ${data.avgStars * 20}%">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
        <div class="star-base">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
      </div>
        <div class="address">${data.address}</div>
        <button onclick="loungedetail()">자세히보기</button>
      </div>
    </div>`
}

export default createContent
