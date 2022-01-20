import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import {
  handleLoginTrue,
  handleLoginFalse,
  handleAdminTrue,
  handleAdminFalse,
} from '../actions'
import { AiOutlineCloud, AiFillCloud } from 'react-icons/ai'
import { FaRegUser, FaUser } from 'react-icons/fa'
import { VscSignOut, VscSignIn } from 'react-icons/vsc'
import { GoSignIn } from 'react-icons/go'
import { RiAdminFill, RiAdminLine } from 'react-icons/ri'

const Navbar = ({ loadStatus }) => {
  const isLoginState = useSelector((state) => state.isLoginReducer)
  const { isLogin } = isLoginState
  const isAdminState = useSelector((state) => state.isAdminReducer)
  const { isAdmin } = isAdminState
  const dispatch = useDispatch()
  const accessToken = window.localStorage.getItem('accessToken')
  const adminIndicator = window.localStorage.getItem('admin')
  const navigate = useNavigate()
  const [curPage, setCurPage] = useState('')
  const location = useLocation()

  const handleLogout = () => {
    if (isLogin) {
      axios.get(process.env.REACT_APP_SERVER_URL + '/user/logout', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      dispatch(handleLoginFalse())
      dispatch(handleAdminFalse())
      window.localStorage.removeItem('accessToken')
      window.localStorage.removeItem('admin')
      window.localStorage.removeItem('oauth')
      navigate('/login')
    } else {
      //로그아웃인 상태
      navigate('/login')
    }
  }

  const homeBtnHandler = () => {
    if (loadStatus === 'load finish') {
      navigate('/')
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

  useEffect(() => {
    const path = location.pathname
    setCurPage(path)
  }, [location])

  return (
    <div className="navBar">
      <div className="navbtn-wrapper" onClick={homeBtnHandler}>
        <button className="navBtn">
          {curPage === '/' ||
          curPage === '/report' ||
          curPage === '/details' ||
          curPage === '/comment' ? (
            <AiFillCloud />
          ) : (
            <AiOutlineCloud />
          )}
        </button>
      </div>
      {isAdmin ? (
        <Link to="/admin" className="navbtn-wrapper">
          <button className="navBtn">
            {curPage === '/admin' ? <RiAdminFill /> : <RiAdminLine />}
          </button>
        </Link>
      ) : (
        <Link to="/mypage" className="navbtn-wrapper">
          <button className="navBtn">
            {curPage === '/mypage' || curPage === '/changeInfo' ? (
              <FaUser />
            ) : (
              <FaRegUser />
            )}
          </button>
        </Link>
      )}
      <div className="navbtn-wrapper">
        <button className="navBtn" onClick={handleLogout}>
          {isLogin ? (
            <VscSignOut />
          ) : curPage === '/login' ? (
            <GoSignIn id="GoSignIn-icon" />
          ) : (
            <VscSignIn />
          )}
        </button>
      </div>
    </div>
  )
}

export default Navbar
