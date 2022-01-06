import React, { useState, useEffect } from 'react'
import logo from './logo.png'
import './ChangeInfo.css'
import { useSelector, useDispatch } from 'react-redux'
import { handleLogin } from '../../actions/index'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
axios.defaults.withCredentials = true

const ChangeInfo = () => {
  return (
    <div className="changeInfo-wrapper">
      <div className="changeInfo-logo-wrapper">
        <img src={logo} className="changeInfo-logo"></img>
      </div>
      <div className="changeInfo-body">
        <div className="changeInfo-fixed">
          <h4 className="changeInfo-input-title">아이디</h4>
          <h4 className="changeInfo-input-fixed">기존 이메일 아이디(변경불가)</h4>
        </div>
        <div className="changeInfo-chages">
          <h4 className="changeInfo-input-title">변경하실 닉네임</h4>
          <div className="changeInfo-input-wrapper">
            <input type="text" className="changeInfo-input-content"></input>
          </div>
        </div>
        <div className="changeInfo-chages">
          <h4 className="changeInfo-input-title">현재 비밀번호</h4>
          <div className="changeInfo-input-wrapper">
            <input type="text" className="changeInfo-input-content"></input>
          </div>
        </div>
        <div className="changeInfo-chages">
          <h4 className="changeInfo-input-title">변경하실 비밀번호</h4>
          <div className="changeInfo-input-wrapper">
            <input type="text" className="changeInfo-input-content"></input>
          </div>
        </div>
        <div className="changeInfo-chages">
          <h4 className="changeInfo-input-title">변경 비밀번호 확인</h4>
          <div className="changeInfo-input-wrapper">
            <input type="text" className="changeInfo-input-content"></input>
          </div>
        </div>
      </div>
      <div>제출하기</div>
    </div>
  )
}

export default ChangeInfo
