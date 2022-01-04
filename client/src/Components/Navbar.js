import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navBar">
      <Link to="/" className="btn-wrapper">
        <btn className="navBtn">홈</btn>
      </Link>
      <Link to="mypage" className="btn-wrapper">
        <btn className="navBtn">MyPage</btn>
      </Link>
      <Link to="/login" className="btn-wrapper">
        <btn className="navBtn">로그인</btn>
      </Link>
    </div>
  )
}

export default Navbar
