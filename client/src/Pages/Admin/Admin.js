import React, { useState, useEffect } from 'react'
import logo from '../Login/logo.png'
import './Admin.css'
import { useSelector, useDispatch } from 'react-redux'
import { handleLoginTrue, handleLoginFalse } from '../../actions/index'
import { useNavigate } from 'react-router'
import Navbar from '../../Components/Navbar'
import axios from 'axios'
axios.defaults.withCredentials = true

const Admin = () => {
  return <div>관리자 페이지 성공!</div>
}
export default Admin
