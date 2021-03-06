/*global kakao*/
import logo from './logo.svg'
import './App.css'
import { useEffect, useState } from 'react'
import React, { useRef } from 'react'
import Login from './Pages/Login/Login'
import LoungeDetail from './Pages/LoungeDetail/LoungeDetail'
import Report from './Pages/Report/Report'
import NavBar from './Components/Navbar'
import Mypage from './Pages/Login/Mypage'
import Signup from './Pages/Login/Signup'
import Comment from './Pages/Comment/Comment'
import ChangeInfo from './Pages/Login/ChangeInfo'
import Admin from './Pages/Admin/Admin'
import Notification from './Components/Notification'
import Overlay from './Components/Overlay'
import LoadingIndicator from './Components/LoadingIndicator'
import LogoutModal from './Components/LogoutModal'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeMap } from './Components/Map'
import { notificationOff, handleLoginFalse, handleAdminFalse } from './actions'
import axios from 'axios'

function App() {
  const mapRef = useRef()
  const location = useLocation()
  const dispatch = useDispatch()
  const [map, setMap] = useState(null)
  const [mapLoading, setMapLoading] = useState(false)
  const [isOverlay, setIsOverlay] = useState(false)
  const [loadStatus, setLoadStatus] = useState('')
  const isNotification = useSelector((state) => state.isNotificationReducer)
  const [isModal, setIsModal] = useState(false)
  const accessToken = window.localStorage.getItem('accessToken')
  const navigate = useNavigate()

  useEffect(() => {
    let options = {
      center: new kakao.maps.LatLng(0, 0),
      level: 3,
    }
    setMap(new kakao.maps.Map(mapRef.current, options))
    setMapLoading(true)
    setLoadStatus('pos progress')
  }, [])

  useEffect(() => {
    if (!mapLoading) {
      return
    }
    initializeMap(map, dispatch, setIsOverlay, setLoadStatus)
  }, [mapLoading])

  useEffect(() => {
    dispatch(notificationOff())
    if (location.pathname !== '/') {
      mapRef.current.style.display = 'none'
      if (map !== null && loadStatus === 'load finish') {
        sessionStorage.setItem('mapCenter', JSON.stringify(map.getCenter()))
      }
    } else {
      mapRef.current.style.display = 'block'
      if (map !== null) {
        let mapCenter = map.getCenter()
        map.relayout()
        map.setCenter(mapCenter)
      }
    }
  }, [location])

  const logout = () => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + '/user/logout', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        dispatch(handleLoginFalse())
        dispatch(handleAdminFalse())
        window.localStorage.removeItem('accessToken')
        window.localStorage.removeItem('admin')
        window.localStorage.removeItem('oauth')
        navigate('/login')
      })
  }

  return (
    <div className="App">
      <div className="map" ref={mapRef}></div>
      {location.pathname === '/' && isOverlay ? <Overlay /> : null}
      {loadStatus !== 'load finish' && location.pathname === '/' ? (
        <LoadingIndicator mapLoading={mapLoading} loadStatus={loadStatus} />
      ) : null}
      <main className="features">
        <Routes>
          <Route exact path="/" element={null} />
          <Route path="/login" element={<Login />} />
          <Route path="/details" element={<LoungeDetail />} />
          <Route path="/report" element={<Report />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/changeInfo" element={<ChangeInfo />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/out" element={<LogoutModal />} />
        </Routes>

        {isNotification ? <Notification /> : null}
        {isModal ? <LogoutModal setIsModal={setIsModal} logout={logout} /> : null}
      </main>
      <NavBar
        className="bottom-component"
        loadStatus={loadStatus}
        setIsModal={setIsModal}
      />
    </div>
  )
}

export default App
