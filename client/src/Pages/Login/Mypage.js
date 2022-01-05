import React, { useState } from 'react'
import logo from './logo.png'
import './Mypage.css'
import { useSelector, useDispatch } from 'react-redux'
import { handleLogin } from '../../actions/index'
import axios from 'axios'
axios.defaults.withCredentials = true

const Mypage = () => {
  const [id, setId] = useState('')
  const [username, setUsername] = useState('')

  const accessToken = window.localStorage.getItem('accessToken')
  axios
    .get(process.env.REACT_APP_SERVER_URL + '/user/info', {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    .then((res) => {
      const { email, username } = res.data.data
      setId(email)
      setUsername(username)
    })

  const handleChangeInfo = () => {
    console.log('체인지요청')
    //정보수정페이지로 리다이렉팅
  }
  const handleDeleteInfo = () => {
    axios
      .delete(process.env.REACT_APP_SERVER_URL + '/user', {
        headers: { authorization: `Bearer ${accessToken}` },
      })
      .then((res) => console.log(res.data))
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
        <a className="change-info" onClick={handleChangeInfo}>
          정보 수정하기
        </a>
        <a className="delete-info" onClick={handleDeleteInfo}>
          회원탈퇴
        </a>
      </div>
    </div>
  )
}

export default Mypage
