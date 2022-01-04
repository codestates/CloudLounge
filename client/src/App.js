import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'
import React from 'react'
import './store/store.js'
import MapComponent from './Components/Map'
import LoungeDetail from './Components/LoungeDetail'
import Report from './Components/Report'
import NavBar from './Components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<MapComponent />} />
          <Route path="/info" element={<LoungeDetail />} />
          <Route path="/report" element={<Report />} />
        </Routes>
        <NavBar />
      </BrowserRouter>
    </div>
  )
}

export default App
