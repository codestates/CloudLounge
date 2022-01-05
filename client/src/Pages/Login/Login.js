import React, { useState } from 'react'
import logo from './logo.png'
import './Login.css'
import { useSelector, useDispatch } from 'react-redux'
import { handleLogin } from '../../actions/index'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
axios.defaults.withCredentials = true

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClick = async () => {
    await axios
      .post('http://localhost:80/user/login', {
        email: id,
        password: pw,
      })
      .then((res) => {
        if (res.data.data.accessToken) {
          window.localStorage.setItem('accessToken', res.data.data.accessToken)
          dispatch(handleLogin())
          navigate('/mypage')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const [id, setId] = useState('')
  const [pw, setPw] = useState('')

  const handleChange = (e) => {
    if (e.target.name === 'id') {
      setId(e.target.value)
    }
    if (e.target.name === 'pw') {
      setPw(e.target.value)
    }
  }

  return (
    <div className="box-wrapper">
      <div id="logo" className="logo-wrapper">
        <img src={logo} alt="Logo" />
      </div>
      <div className="login-part">
        <div className="top">
          <div className="inputs-wrapper">
            <div className="box" id="idpw-box">
              <div className="idpw-indicator">아이디</div>
              <input
                type="text"
                name="id"
                placeholder="이메일 아이디를 입력하세요"
                onChange={handleChange}
              ></input>
            </div>
            <div className="box" id="idpw-box">
              <div className="idpw-indicator">비밀번호</div>
              <input
                type="text"
                name="pw"
                placeholder="비밀번호를 입력하세요"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="box" id="loginBtn-wrapper">
            <button className="loginBtn" onClick={handleClick}>
              로그인
            </button>
          </div>
        </div>
        <div className="menu-wrapper">
          <a className="loginMenu1">네이버 로그인</a>
          <a className="loginMenu2" href="/signup">
            회원가입
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login
