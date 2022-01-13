import React, { useState, useEffect } from 'react'
import logo from './logo.png'
import './ChangeInfo.css'
import { useSelector, useDispatch } from 'react-redux'
import { handleLoginFalse } from '../../actions/index'
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

  const handleChange = (e) => {
    if (e.target.name === 'changeUsername') {
      setChangeUsername(e.target.value)
    }
    if (e.target.name === 'curPw') {
      setCurPw(e.target.value)
    }
    if (e.target.name === 'changePw') {
      setChangePw(e.target.value)
    }
    if (e.target.name === 'confirmPw') {
      setConfirmPw(e.target.value)
    }
  }

  const handleClick = () => {
    if (changePw === confirmPw) {
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
          alert('정보가 성공적으로 변경되었습니다. 다시 로그인해주세요')
          window.localStorage.clear()
          dispatch(handleLoginFalse())
          navigate('/login')
        })
        .catch((err) => alert('현재 비밀번호를 다시 확인해주세요'))
    } else {
      alert('변경하실 비밀번호와 확인이 일치하지 않습니다')
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
