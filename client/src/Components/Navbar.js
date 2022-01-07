import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { handleLoginTrue, handleLoginFalse } from '../actions'

const Navbar = () => {
  const isLoginState = useSelector((state) => state.isLoginReducer)
  const { isLogin } = isLoginState
  const dispatch = useDispatch()
  const accessToken = window.localStorage.getItem('accessToken')
  const navigate = useNavigate()

  const handleLogout = () => {
    if (isLogin) {
      axios.get(process.env.REACT_APP_SERVER_URL + '/user/logout', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      dispatch(handleLoginFalse())
      window.localStorage.clear()
      navigate('/login')
    } else {
      //로그아웃인 상태
      navigate('/login')
    }
  }

  useEffect(() => {
    if (accessToken) {
      dispatch(handleLoginTrue())
    } else {
      dispatch(handleLoginFalse())
    }
  }, [])

  return (
    <div className="navBar">
      <Link to="/" className="navbtn-wrapper">
        <button className="navBtn">홈</button>
      </Link>
      <Link to="/mypage" className="navbtn-wrapper">
        <button className="navBtn">MyPage</button>
      </Link>
      <Link to="login" className="navbtn-wrapper">
        <button className="navBtn" onClick={handleLogout}>
          {isLogin ? '로그아웃' : '로그인'}
        </button>
      </Link>
    </div>
  )
}

export default Navbar
