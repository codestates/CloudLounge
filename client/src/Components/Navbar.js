import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { handleLogin } from '../actions'

const Navbar = () => {
  const isLoginState = useSelector((state) => state.isLoginReducer)
  const dispatch = useDispatch()
  const { isLogin } = isLoginState
  const accessToken = window.localStorage.getItem('accessToken')

  const handleClick = () => {
    if (accessToken) {
      axios.get(process.env.REACT_APP_SERVER_URL + '/user/logout', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      dispatch(handleLogin())
      window.localStorage.clear()
    }
  }
  return (
    <div className="navBar">
      <Link to="/" className="navbtn-wrapper">
        <button className="navBtn">홈</button>
      </Link>
      <Link to="mypage" className="navbtn-wrapper">
        <button className="navBtn">MyPage</button>
      </Link>
      <Link to="/login" className="navbtn-wrapper">
        <button className="navBtn" onClick={handleClick}>
          {accessToken ? '로그아웃' : '로그인'}
        </button>
      </Link>
    </div>
  )
}

export default Navbar
