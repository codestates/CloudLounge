import React from 'react'
import logo from './logo.png'
import './Login.css'

const Login = () => {
  return (
    <div className="box-wrapper">
      <div id="logo" className="logo-wrapper">
        <img src={logo} alt="Logo" />
      </div>
      <div className="box">
        <input type="id" name=""></input>
        <input></input>
      </div>
      <div className="box">로그인버튼</div>
      <div className="box">네이버로고</div>
      <div className="box">네이버로그인</div>
      <div className="box">회원가입버튼</div>
    </div>
  )
}

export default Login
