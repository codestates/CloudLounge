import React, { useState, useEffect } from 'react'
import logo from './logo.png'
import './Mypage.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  handleLoginTrue,
  handleLoginFalse,
  notificationOn,
  setNotification,
  setNextLink,
} from '../../actions/index'
import { useNavigate } from 'react-router'
import Navbar from '../../Components/Navbar'
import axios from 'axios'
import { Link } from 'react-router-dom'
axios.defaults.withCredentials = true

const Mypage = () => {
  const [id, setId] = useState('')
  const [username, setUsername] = useState('')
  const [delInfo, setDelInfo] = useState(false)
  const [confirmPw, setConfirmPw] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const accessToken = window.localStorage.getItem('accessToken')
  const oauth = window.localStorage.getItem('oauth')
  if (!accessToken) {
    return (
      <div className="mypage-box-wrapper">
        <div className="login-require-logo-wrapper">
          <img src={logo} className="login-require-logo" />
        </div>
        <h4 className="login-require">로그인이 필요합니다</h4>
      </div>
    )
  } else {
    useEffect(() => {
      axios
        .get(process.env.REACT_APP_SERVER_URL + '/user/info', {
          headers: { authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          const { email, username, admin } = res.data.data
          if (admin) {
            navigate('/admin')
          }
          setId(email)
          setUsername(username)
        })
    }, [])

    const handleDeleteInfo = () => {
      setDelInfo(true)
    }

    const handleCancel = () => {
      setConfirmPw('')
      setDelInfo(false)
    }

    const handleChange = (e) => {
      setConfirmPw(e.target.value)
    }

    const handleDelSubmit = () => {
      axios
        .post(process.env.REACT_APP_SERVER_URL + '/user/login', {
          email: id,
          password: confirmPw,
        })
        .then((res) => {
          if (res.data.data.accessToken) {
            axios
              .delete(process.env.REACT_APP_SERVER_URL + '/user', {
                headers: { authorization: `Bearer ${accessToken}` },
              })
              .then((res) => {
                dispatch(handleLoginFalse())
                dispatch(notificationOn())
                dispatch(setNotification('회원을 탈퇴했습니다'))
                dispatch(setNextLink('/'))
                window.localStorage.removeItem('accessToken')
                window.localStorage.removeItem('admin')
                window.localStorage.removeItem('oauth')
              })
              .catch((err) => {
                dispatch(notificationOn())
                dispatch(setNotification('404 not found'))
              })
          }
        })
        .catch((err) => {
          dispatch(notificationOn())
          dispatch(setNotification('비밀번호를 다시 확인해주세요'))
        })
    }

    return (
      <div className="mypage-box-wrapper">
        <div>
          <img src={logo} className="mypage-logo-wrapper" />
        </div>
        <div className="mypage-idpw">
          <div className="mypage-inner-box">
            <h4 className="mypage-menu-title">아이디</h4>
            <h4 className="mypage-menu-content">{id}</h4>
          </div>
          <div
            className={delInfo ? 'mypage-inner-box' : 'mypage-inner-box mypage-hide'}
            id="mypage-del-wrapper"
          >
            <h4 className="mypage-menu-title">비밀번호</h4>
            <input
              type="password"
              name="confirmPw"
              className="mypage-pw-confirm"
              placeholder="본인 확인을 위해 입력해주세요"
              value={confirmPw}
              onChange={handleChange}
            ></input>
            <div
              className={
                delInfo ? 'mypage-delBtn-wrapper' : 'mypage-delBtn-wrapper mypage-hide'
              }
            >
              <button className="mypage-cancel-btn" onClick={handleDelSubmit}>
                탈퇴
              </button>
              <button className="mypage-cancel-btn" onClick={handleCancel}>
                취소
              </button>
            </div>
          </div>

          <div className="mypage-inner-box" id="mypage-nick">
            <h4 className="mypage-menu-title">닉네임</h4>
            <h4 className="mypage-menu-content">{username}</h4>
          </div>
        </div>
        <div
          className={
            oauth ? 'mypage-sidebar-wrapper mypage-hide' : 'mypage-sidebar-wrapper'
          }
        >
          <Link className="change-info" to="/changeInfo">
            정보수정
          </Link>
          <a className="delete-info" onClick={handleDeleteInfo}>
            회원탈퇴
          </a>
        </div>
      </div>
    )
  }
}

export default Mypage
