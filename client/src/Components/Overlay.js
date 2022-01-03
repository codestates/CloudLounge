function createContent(data) {
  return `<div class="container">
    <div class="top">
      <button>신고</button>
    </div>
    <div class="info">
      <img src="${data.image}" class="lounge"/>
      <div class="start-rating">별점: ${data.avgStars}</div>
      <div class="address">${data.address}</div>
      <button onclick="logAddress()">자세히보기</button>
    </div>
  </div>`
}

export default createContent
