import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faUserAlt,
  faSignInAlt,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import {
  handleLoginTrue,
  handleLoginFalse,
  handleAdminTrue,
  handleAdminFalse,
} from '../actions'

const Navbar = () => {
  const isLoginState = useSelector((state) => state.isLoginReducer)
  const { isLogin } = isLoginState
  const isAdminState = useSelector((state) => state.isAdminReducer)
  const { isAdmin } = isAdminState
  const dispatch = useDispatch()
  const accessToken = window.localStorage.getItem('accessToken')
  const adminIndicator = window.localStorage.getItem('admin')
  const navigate = useNavigate()

  const handleLogout = () => {
    if (isLogin) {
      axios.get(process.env.REACT_APP_SERVER_URL + '/user/logout', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      dispatch(handleLoginFalse())
      dispatch(handleAdminFalse())
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
    if (adminIndicator) {
      dispatch(handleAdminTrue())
    } else {
      dispatch(handleAdminFalse())
    }
  }, [])

  return (
    <div className="navBar">
      <Link to="/" className="navbtn-wrapper">
        <button className="navBtn">
          <FontAwesomeIcon icon={faHome} />
        </button>
      </Link>
      {isAdmin ? (
        <Link to="/admin" className="navbtn-wrapper">
          <button className="navBtn">Admin</button>
        </Link>
      ) : (
        <Link to="/mypage" className="navbtn-wrapper">
          <button className="navBtn">
            <FontAwesomeIcon icon={faUserAlt} />
          </button>
        </Link>
      )}
      <Link to="login" className="navbtn-wrapper">
        <button className="navBtn" onClick={handleLogout}>
          {isLogin ? (
            <FontAwesomeIcon icon={faSignOutAlt} />
          ) : (
            <FontAwesomeIcon icon={faSignInAlt} />
          )}
        </button>
      </Link>
    </div>
  )
}

export default Navbar
