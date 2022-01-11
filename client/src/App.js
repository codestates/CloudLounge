/*global kakao*/
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import React, { useRef } from 'react'
import Login from './Pages/Login/Login'
import MapComponent2 from './Pages/Map/Map2'
import MapComponent from './Pages/Map/Map'
import LoungeDetail from './Pages/LoungeDetail/LoungeDetail'
import Report from './Pages/Report/Report'
import NavBar from './Components/Navbar'
import Mypage from './Pages/Login/Mypage'
import Signup from './Pages/Login/Signup'
import Comment from './Pages/Comment/Comment'
import ChangeInfo from './Pages/Login/ChangeInfo'
import Admin from './Pages/Admin/Admin'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <main className="features">
          <Routes>
            <Route exact path="/" element={<MapComponent />} />
            <Route exact path="/map" element={<MapComponent2 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/details" element={<LoungeDetail />} />
            <Route path="/report" element={<Report />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/comment" element={<Comment />} />
            <Route path="/changeInfo" element={<ChangeInfo />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <NavBar className="bottom-component" />
      </BrowserRouter>
    </div>
  )
}

export default App
