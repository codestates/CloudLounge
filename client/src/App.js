import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'
import React from 'react'
import MapComponent from './Pages/Map/Map'
import Login from './Pages/Login/Login'
import NavBar from './Components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <main className="features">
          <Routes>
            <Route path="/" element={<MapComponent />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <NavBar className="bottom-component" />
      </BrowserRouter>
    </div>
  )
}

export default App
