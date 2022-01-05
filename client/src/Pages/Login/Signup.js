import React, { useState } from 'react'
import logo from './logo.png'
import './Signup.css'
import { useSelector, useDispatch } from 'react-redux'
import { handleLogin } from '../../actions/index'
import axios from 'axios'
axios.defaults.withCredentials = true

const Signup = () => {
  return (
    <div className="box-wrapper">
      <div className="logo-wrapper">
        <img src={logo}></img>
      </div>
      <div className="box">로그인아이디(이메일)</div>
      <div className="box">닉네임</div>
      <div className="box">비밀번호</div>
      <div className="box">비밀번호 확인</div>
      <div className="box">가입하기</div>
    </div>
  )
}

export default Signup
