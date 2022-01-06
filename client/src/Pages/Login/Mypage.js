import React, { useState, useEffect } from 'react'
import logo from './logo.png'
import './Mypage.css'
import { useSelector, useDispatch } from 'react-redux'
import { handleLogin } from '../../actions/index'
import { useNavigate } from 'react-router'
import axios from 'axios'
axios.defaults.withCredentials = true

const Mypage = () => {
  const [id, setId] = useState('')
  const [username, setUsername] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const isLoginState = useSelector((state) => state.isLoginReducer)

  console.log(window.location.href)
  useEffect(() => {
    const url = new URL(window.location.href)
    const authorizationCode = url.searchParams.get('code')
    const authorizationState = url.searchParams.get('state')
    console.log(authorizationCode)
    console.log(authorizationState)
    // if (authorizationCode) {
    //   // authorization server로부터 클라이언트로 리디렉션된 경우, authorization code가 함께 전달됩니다.
    //   // ex) http://localhost:3000/?code=5e52fb85d6a1ed46a51f
    //   this.getAccessToken(authorizationCode, authorizationState)
    // }
  }, [window.location.href])

  const accessToken = window.localStorage.getItem('accessToken')
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
    axios
      .get(process.env.REACT_APP_SERVER_URL + '/user/info', {
        headers: { authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        const { email, username } = res.data.data
        setId(email)
        setUsername(username)
      })

    const handleDeleteInfo = () => {
      axios
        .delete(process.env.REACT_APP_SERVER_URL + '/user', {
          headers: { authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          window.localStorage.clear()
          dispatch(handleLogin())
          navigate('/')
        })
        .catch((err) => console.log(err))
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
          <div className="mypage-inner-box">
            <h4 className="mypage-idbox">닉네임</h4>
            <h4 className="mypage-ididbox">{username}</h4>
          </div>
        </div>
        <div className="mypage-sidebar-wrapper">
          <a className="change-info" href="/changeInfo">
            정보 수정하기
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
