import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'
import React from 'react'
import './store/store.js'
import MapComponent from './Components/Map'
import NavBar from './Components/Navbar'

function App() {
  return (
    <div className="App">
      <MapComponent />
      <NavBar />
    </div>
  )
}

export default App
