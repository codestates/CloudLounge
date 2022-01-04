import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'
import React from 'react'
import './store/store.js'
import MapComponent from './Pages/Map/Map'
import LoungeDetail from './Pages/LoungeDetail/LoungeDetail'
import Report from './Pages/Report/Report'
import NavBar from './Components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<MapComponent />} />
          <Route path="/details" element={<LoungeDetail />} />
          <Route path="/report" element={<Report />} />
        </Routes>
        <NavBar />
      </BrowserRouter>
    </div>
  )
}

export default App
