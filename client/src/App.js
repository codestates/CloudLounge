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
import { Routes, Route, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Overlay from './Components/Overlay'
import { initializeMap } from './Components/Map'
import Notification from './Components/Notification'
import { notificationOff } from './actions'

function App() {
  const mapRef = useRef()
  const location = useLocation()
  const dispatch = useDispatch()
  const [map, setMap] = useState(null)
  const [mapLoading, setMapLoading] = useState(false)
  const [isOverlay, setIsOverlay] = useState(false)
  const isNotification = useSelector((state) => state.isNotificationReducer)

  useEffect(() => {
    let options = {
      center: new kakao.maps.LatLng(0, 0),
      level: 3,
    }
    setMap(new kakao.maps.Map(mapRef.current, options))
    setMapLoading(true)
  }, [])

  useEffect(() => {
    if (!mapLoading) {
      return
    }
    initializeMap(map, dispatch, setIsOverlay)
  }, [mapLoading])

  useEffect(() => {
    dispatch(notificationOff())
    if (location.pathname !== '/') {
      mapRef.current.style.display = 'none'
    } else {
      mapRef.current.style.display = ''
    }
  }, [location])

  return (
    <div className="App">
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
        </Routes>
        <div className="map" ref={mapRef}></div>
        {location.pathname === '/' && isOverlay ? <Overlay /> : null}
        {isNotification ? <Notification /> : null}
      </main>
      <NavBar className="bottom-component" />
    </div>
  )
}

export default App
