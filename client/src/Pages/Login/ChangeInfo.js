import React, { useState, useEffect } from 'react'
import logo from './logo.png'
import './ChangeInfo.css'
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
const serverUrl = process.env.REACT_APP_SERVER_URL

const ChangeInfo = () => {
  const accessToken = window.localStorage.getItem('accessToken')
  const [userInfo, setUserInfo] = useState({})
  const [changeUsername, setChangeUsername] = useState('')
  const [curPw, setCurPw] = useState('')
  const [changePw, setChangePw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLoginState = useSelector((state) => state.isLoginReducer)
  const { isLogin } = isLoginState
  const [changeUsernameIndi, setChangeUsernameIndi] = useState('')
  const [changePwIndi, setChangePwIndi] = useState('')
  const [confirmPwIndi, setConfirmPwIndi] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    if (e.target.name === 'changeUsername') {
      setChangeUsername(value)
      let regUsername = /^[가-힣|a-z|A-Z|0-9|]+$/
      if (value.length === 0) {
        setChangeUsernameIndi('2-20 글자 이내의 영문/한글/숫자로 작성해주세요')
      } else if (value.length < 2 && value.length > 0) {
        setChangeUsernameIndi('닉네임이 너무 짧습니다')
      } else if (!regUsername.test(value)) {
        setChangeUsernameIndi('영문/한글/숫자만 입력해주세요')
      } else if (value.length > 20) {
        setChangeUsernameIndi('닉네임이 너무 깁니다')
      } else {
        setChangeUsernameIndi('')
        console.log('초기화')
      }
    }
    if (e.target.name === 'curPw') {
      setCurPw(value)
    }
    if (e.target.name === 'changePw') {
      setChangePw(value)
      let regPw = /^(?=.*[A-Za-z])(?=.*\d)[A-Z|a-z|\d|@$!%*#?&|]{6,40}$/
      if (value.length === 0) {
        setChangePwIndi('6-40 글자 이내의 영문/숫자 조합으로 작성해주세요')
      } else if (value.length < 6 && value.length > 0) {
        setChangePwIndi('비밀번호가 너무 짧습니다')
      } else if (!regPw.test(value)) {
        setChangePwIndi('영문/숫자 조합으로 작성해주세요')
      } else if (value.length > 40) {
        setChangePwIndi('비밀번호가 너무 깁니다')
      } else {
        setChangePwIndi('')
        console.log('초기화')
      }
      if (value !== confirmPw) {
        setConfirmPwIndi('비밀번호가 일치하지 않습니다')
      } else {
        setConfirmPwIndi('비밀번호가 일치합니다')
      }
    }
    if (e.target.name === 'confirmPw') {
      setConfirmPw(value)
      if (value.length === 0) {
        setConfirmPwIndi('')
        console.log('초기화')
      } else if (value !== changePw) {
        setConfirmPwIndi('비밀번호가 일치하지 않습니다')
      } else {
        setConfirmPwIndi('비밀번호가 일치합니다')
      }
    }
  }

  const handleClick = () => {
    if (curPw === changePw && curPw === confirmPw) {
      dispatch(notificationOn())
      dispatch(
        setNotification('현재 비밀번호와 변경하실 비밀번호가 같습니다. 다시 확인해주세요')
      )
    } else if (
      changePwIndi === '' &&
      changeUsernameIndi === '' &&
      confirmPwIndi === '비밀번호가 일치합니다'
    ) {
      axios
        .patch(
          serverUrl + '/user/info',
          {
            username: changeUsername,
            curPassword: curPw,
            newPassword: changePw,
          },
          { headers: { authorization: `Bearer ${accessToken}` } }
        )
        .then((res) => {
          window.localStorage.removeItem('accessToken')
          window.localStorage.removeItem('admin')
          window.localStorage.removeItem('oauth')
          dispatch(handleLoginFalse())
          dispatch(notificationOn())
          dispatch(
            setNotification('정보가 성공적으로 변경되었습니다. 다시 로그인해주세요')
          )
          dispatch(setNextLink('/login'))
        })
        .catch((err) => {
          dispatch(notificationOn())
          dispatch(setNotification('현재 비밀번호를 다시 확인해주세요'))
        })
    } else {
      dispatch(notificationOn())
      dispatch(setNotification('닉네임/변경 비밀번호를 다시 확인해주세요'))
    }
  }

  useEffect(() => {
    if (window.localStorage.getItem('accessToken')) {
      axios
        .get(serverUrl + '/user/info', {
          headers: { authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          setUserInfo(res.data.data)
          setChangeUsername(res.data.data.username)
        })
    }
  }, [])

  return (
    <div className="changeInfo-wrapper">
      <div className="changeInfo-logo-wrapper">
        <img src={logo} className="changeInfo-logo"></img>
      </div>
      <div className="changeInfo-body">
        <div className="changeInfo-fixed">
          <h4 className="changeInfo-input-title">아이디</h4>
          <div className="changeInfo-input-wrapper">
            <h4 className="changeInfo-input-fixed">{userInfo.email}</h4>
          </div>
        </div>
        <div className="changeInfo-changes-wrapper">
          <div className="changeInfo-chages">
            <h4 className="changeInfo-input-title">변경하실 닉네임</h4>
            <div className="changeInfo-input-wrapper">
              <input
                type="text"
                className="changeInfo-input-content"
                name="changeUsername"
                value={changeUsername}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="changeInfo-reg">{changeUsernameIndi}</div>
        </div>
        <div className="changeInfo-chages">
          <h4 className="changeInfo-input-title">현재 비밀번호</h4>
          <div className="changeInfo-input-wrapper">
            <input
              type="password"
              className="changeInfo-input-content"
              name="curPw"
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <div className="changeInfo-changes-wrapper">
          <div className="changeInfo-chages">
            <h4 className="changeInfo-input-title">변경하실 비밀번호</h4>
            <div className="changeInfo-input-wrapper">
              <input
                type="password"
                className="changeInfo-input-content"
                name="changePw"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="changeInfo-reg">{changePwIndi}</div>
        </div>
        <div className="changeInfo-changes-wrapper">
          <div className="changeInfo-chages">
            <h4 className="changeInfo-input-title">변경 비밀번호 확인</h4>
            <div className="changeInfo-input-wrapper">
              <input
                type="password"
                className="changeInfo-input-content"
                name="confirmPw"
                onChange={handleChange}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleClick()
                  }
                }}
              ></input>
            </div>
          </div>
          <div className="changeInfo-reg">{confirmPwIndi}</div>
        </div>
        <div>
          <button className="changeInfo-submitBtn" onClick={handleClick}>
            제출하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChangeInfo
