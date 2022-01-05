import React, { useState } from 'react'
import logo from './logo.png'
import './Login.css'
import { useSelector, useDispatch } from 'react-redux'
import { handleLogin } from '../../actions/index'
import axios from 'axios'
axios.defaults.withCredentials = true

const Mypage = () => {
  return <div>로그인성공!</div>
}

export default Mypage
