import React, { useState, useEffect } from 'react'
import logo from './logo.png'
import './Mypage.css'
import { useSelector, useDispatch } from 'react-redux'
import { handleLoginTrue, handleLoginFalse } from '../../actions/index'
import { useNavigate } from 'react-router'
import Navbar from '../../Components/Navbar'
import axios from 'axios'
axios.defaults.withCredentials = true

const Mypage = () => {
  const [id, setId] = useState('')
  const [username, setUsername] = useState('')
  const [delInfo, setDelInfo] = useState(false)
  const [confirmPw, setConfirmPw] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const isLoginState = useSelector((state) => state.isLoginReducer)

  // console.log(window.location.href)

  const accessToken = window.localStorage.getItem('accessToken')
  const oauth = window.localStorage.getItem('oauth')
  if (!accessToken) {
    return (
      <div className="mypage-box-wrapper">
        <div className="login-require-logo-wrapper">
          <img src={logo} className="login-require-logo" />
        </div>
        <h4 className="login-require">로그인이 필요한 서비스입니다</h4>
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
                window.localStorage.clear()
                dispatch(handleLoginFalse())
                navigate('/')
                alert('회원을 탈퇴했습니다')
              })
              .catch((err) => alert('404 not found'))
          }
        })
        .catch((err) => alert('비밀번호를 다시 확인해주세요'))
    }

    return (
      <div className="mypage-box-wrapper">
        <div>
          <img src={logo} className="mypage-logo-wrapper" />
        </div>
        <div className="mypage-idpw">
          <div className="mypage-inner-box">
            <h4 className="mypage-idbox">아이디</h4>
            <h4 className="mypage-ididbox">{id}</h4>
          </div>
          <div className={delInfo ? 'mypage-inner-box' : 'mypage-inner-box mypage-hide'}>
            <h4 className="mypage-idbox">비밀번호</h4>
            <input
              type="text"
              name="confirmPw"
              className="mypage-pw-confirm"
              placeholder="본인 확인을 위해 비밀번호를 입력하세요"
              onChange={handleChange}
            ></input>
          </div>
          <div
            className={
              delInfo ? 'mypage-delBtn-wrapper' : 'mypage-delBtn-wrapper mypage-hide'
            }
          >
            <button className="mypage-cancel-btn" onClick={handleDelSubmit}>
              확인
            </button>
            <button className="mypage-cancel-btn" onClick={handleCancel}>
              취소
            </button>
          </div>
          <div className="mypage-inner-box">
            <h4 className="mypage-idbox">닉네임</h4>
            <h4 className="mypage-ididbox">{username}</h4>
          </div>
        </div>
        <div className="mypage-sidebar-wrapper">
          <a
            className={oauth ? 'change-info mypage-hide' : 'change-info'}
            href="/changeInfo"
          >
            정보수정
          </a>
          <a className="delete-info" onClick={handleDeleteInfo}>
            회원탈퇴
          </a>
        </div>
      </div>
    )
  }
}

export default Mypage
