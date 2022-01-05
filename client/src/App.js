import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'
import React from 'react'
import Login from './Pages/Login/Login'
import MapComponent from './Pages/Map/Map'
import LoungeDetail from './Pages/LoungeDetail/LoungeDetail'
import Report from './Pages/Report/Report'
import NavBar from './Components/Navbar'
import Mypage from './Pages/Login/Mypage'
import Signup from './Pages/Login/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <main className="features">
          <Routes>
            <Route exact path="/" element={<MapComponent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/details" element={<LoungeDetail />} />
            <Route path="/report" element={<Report />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <NavBar className="bottom-component" />
      </BrowserRouter>
    </div>
  )
}

export default App
