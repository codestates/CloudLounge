import React, { useState, useEffect } from 'react'
import logo from '../Login/logo.png'
import './Admin.css'
import { useSelector, useDispatch } from 'react-redux'
import { getReportsList, handleLoginFalse } from '../../actions/index'
import { useNavigate } from 'react-router'
import Navbar from '../../Components/Navbar'
import AdminReport from '../../Components/AdminReport'
import axios from 'axios'
axios.defaults.withCredentials = true
const serverUrl = process.env.REACT_APP_SERVER_URL

const Admin = () => {
  const accessToken = window.localStorage.getItem('accessToken')
  const isAdmin = window.localStorage.getItem('admin')
  if (!isAdmin) {
    axios
      .get(serverUrl + '/user/info', {
        headers: { authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        window.localStorage.setItem('admin', res.data.data.admin)
      })
  }

  const reportsListState = useSelector((state) => state.reportsListReducer)
  const { reportsList } = reportsListState
  const dispatch = useDispatch()
  useEffect(() => {
    const received = axios
      .get(serverUrl + '/admin')
      .then((res) => dispatch(getReportsList(res.data)))
  }, [])

  if (isAdmin) {
    return (
      <div className="admin-wrapper">
        <div className="admin-head">신고내역</div>
        <div className="admin-body">
          {reportsList.map((el) => (
            <AdminReport key={el.loungeId} report={el} />
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div className="admin-failure">
        <span className="admin-unauth">권한이 없습니다</span>
      </div>
    )
  }
}
export default Admin
