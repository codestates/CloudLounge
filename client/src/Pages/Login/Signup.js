import React, { useState } from 'react'
import logo from './logo.png'
import './Signup.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  handleLoginTrue,
  handleLoginFalse,
  notificationOn,
  setNotification,
  setNextLink,
} from '../../actions/index'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
axios.defaults.withCredentials = true

const Signup = () => {
  const [id, setId] = useState('')
  const [idIndi, setIdIndi] = useState('')
  const [username, setUsername] = useState('')
  const [usernameIndi, setUsernameIndi] = useState('')
  const [pw, setPw] = useState('')
  const [pwIndi, setPwIndi] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [confirmPwIndi, setConfirmPwIndi] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isNotification = useSelector((state) => state.isNotificationReducer)

  const handleClick = async () => {
    if (isNotification) {
      return
    }
    if (
      pwIndi === '사용가능한 비밀번호입니다' &&
      idIndi === '사용가능한 아이디입니다' &&
      usernameIndi === '사용가능한 닉네임입니다' &&
      confirmPwIndi === '비밀번호가 일치합니다'
    ) {
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
                dispatch(handleLoginTrue())
                dispatch(notificationOn())
                dispatch(setNotification('회원가입이 완료되었습니다'))
                dispatch(setNextLink('/mypage'))
              }
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          dispatch(notificationOn())
          dispatch(setNotification('이미 가입된 아이디입니다. 다시 확인해주세요'))
          console.log(err)
        })
    } else {
      dispatch(notificationOn())
      dispatch(setNotification('아이디/닉네임/비밀번호를 다시 확인해주세요'))
    }
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    if (name === 'id') {
      setId(value)
      let regEmail =
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
      if (value.length === 0) {
        setIdIndi('4-30 글자 이내의 이메일 형식으로 작성해주세요')
      } else if (value.length < 4 && value.length > 0) {
        setIdIndi('아이디가 너무 짧습니다')
      } else if (!regEmail.test(value)) {
        setIdIndi('이메일 형식이 아닙니다')
      } else if (value.length > 30) {
        setIdIndi('아이디가 너무 깁니다')
      } else {
        setIdIndi('사용가능한 아이디입니다')
      }
    }
    if (name === 'username') {
      setUsername(value)
      let regUsername = /^[가-힣|a-z|A-Z|0-9|]+$/
      if (value.length === 0) {
        setUsernameIndi('2-20 글자 이내의 영문/한글/숫자로 작성해주세요')
      } else if (value.length < 2 && value.length > 0) {
        setUsernameIndi('닉네임이 너무 짧습니다')
      } else if (!regUsername.test(value)) {
        setUsernameIndi('영문/한글/숫자만 입력해주세요')
      } else if (value.length > 20) {
        setUsernameIndi('닉네임이 너무 깁니다')
      } else {
        setUsernameIndi('사용가능한 닉네임입니다')
      }
    }
    if (name === 'pw') {
      setPw(value)
      let regPw = /^(?=.*[A-Za-z])(?=.*\d)[A-Z|a-z|\d|@$!%*#?&|]{6,40}$/
      if (value.length === 0) {
        setPwIndi('6-40 글자 이내의 영문/숫자 조합으로 작성해주세요')
      } else if (value.length < 6 && value.length > 0) {
        setPwIndi('비밀번호가 너무 짧습니다')
      } else if (!regPw.test(value)) {
        setPwIndi('영문/숫자 조합으로 작성해주세요')
      } else if (value.length > 40) {
        setPwIndi('비밀번호가 너무 깁니다')
      } else {
        setPwIndi('사용가능한 비밀번호입니다')
        console.log('초기화')
      }
      if (value !== confirmPw) {
        setConfirmPwIndi('비밀번호가 일치하지 않습니다')
      } else {
        setConfirmPwIndi('비밀번호가 일치합니다')
      }
    }
    if (name === 'confirmPw') {
      setConfirmPw(value)
      if (value.length === 0) {
        setConfirmPwIndi('')
        console.log('초기화')
      } else if (value !== pw) {
        setConfirmPwIndi('비밀번호가 일치하지 않습니다')
      } else {
        setConfirmPwIndi('비밀번호가 일치합니다')
      }
    }
  }

  return (
    <div className="signup-page-wrapper">
      <div>
        <img src={logo} className="signup-logo-wrapper"></img>
      </div>
      <div className="signup-body">
        <div className="signup-menu">
          <h4 className="signup-title">로그인아이디(이메일)</h4>
          <input
            name="id"
            onChange={handleChange}
            placeholder="이메일 형식으로 작성해주세요"
            className="signup-input"
            spellCheck="false"
          ></input>
          <span
            className={
              idIndi === '사용가능한 아이디입니다'
                ? 'signup-reg signup-green'
                : 'signup-reg'
            }
          >
            {idIndi}
          </span>
        </div>
        <div className="signup-menu">
          <h4 className="signup-title">닉네임</h4>
          <input
            name="username"
            onChange={handleChange}
            placeholder="사용하실 닉네임을 작성해주세요"
            className="signup-input"
            spellCheck="false"
          ></input>
          <span
            className={
              usernameIndi === '사용가능한 닉네임입니다'
                ? 'signup-reg signup-green'
                : 'signup-reg'
            }
          >
            {usernameIndi}
          </span>
        </div>
        <div className="signup-menu">
          <h4 className="signup-title">비밀번호</h4>
          <input
            name="pw"
            onChange={handleChange}
            placeholder="비밀번호를 작성해주세요"
            className="signup-input"
            type="password"
            spellCheck="false"
          ></input>
        </div>
        <span
          className={
            pwIndi === '사용가능한 비밀번호입니다'
              ? 'signup-reg signup-green'
              : 'signup-reg'
          }
        >
          {pwIndi}
        </span>
        <div className="signup-menu">
          <h4 className="signup-title">비밀번호 확인</h4>
          <input
            name="confirmPw"
            onChange={handleChange}
            placeholder="비밀번호를 재작성 해주세요"
            className="signup-input"
            type="password"
            spellCheck="false"
          ></input>
        </div>
        <span
          className={
            confirmPwIndi === '비밀번호가 일치합니다'
              ? 'signup-reg signup-green'
              : 'signup-reg'
          }
        >
          {confirmPwIndi}
        </span>
      </div>
      <div className="signup-btn-wrapper">
        <button className="signup-btn" onClick={handleClick}>
          가입하기
        </button>
      </div>
    </div>
  )
}

export default Signup
