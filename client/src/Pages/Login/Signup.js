import React, { useState } from 'react'
import logo from './logo.png'
import './Signup.css'
import { useSelector, useDispatch } from 'react-redux'
import { handleLogin } from '../../actions/index'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
axios.defaults.withCredentials = true

const Signup = () => {
  const [id, setId] = useState('')
  const [username, setUsername] = useState('')
  const [pw, setPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = async () => {
    if (pw === confirmPw) {
      await axios
        .post(process.env.REACT_APP_SERVER_URL + '/user/signup', {
          email: id,
          username: username,
          password: pw,
        })
        .then((res) => {
          axios
            .post(process.env.REACT_APP_SERVER_URL + '/user/login', {
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
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    if (name === 'id') {
      setId(value)
    }
    if (name === 'username') {
      setUsername(value)
    }
    if (name === 'pw') {
      setPw(value)
    }
    if (name === 'confirmPw') {
      setConfirmPw(value)
    }
  }

  return (
    <div className="box-wrapper">
      <div className="logo-wrapper">
        <img src={logo}></img>
      </div>
      <div className="box">
        로그인아이디(이메일)
        <input
          name="id"
          onChange={handleChange}
          placeholder="이메일 형식으로 작성해주세요"
        ></input>
      </div>
      <div className="box">
        닉네임
        <input
          name="username"
          onChange={handleChange}
          placeholder="사용하실 닉네임을 작성해주세요"
        ></input>
      </div>
      <div className="box">
        비밀번호
        <input
          name="pw"
          onChange={handleChange}
          placeholder="비밀번호를 작성해주세요"
        ></input>
      </div>
      <div className="box">
        비밀번호 확인
        <input
          name="confirmPw"
          onChange={handleChange}
          placeholder="비밀번호를 재작성 해주세요"
        ></input>
      </div>
      <div className="signup-wrapper">
        <button className="signup-btn" onClick={handleClick}>
          가입하기
        </button>
      </div>
    </div>
  )
}

export default Signup
