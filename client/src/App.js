import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'
import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { handleLogin, changeLocation } from './actions'
//useSelector, useDispatch 모두 훅이기 때문에 컴포넌트 안에서 실행되어야함
//redux 스테이트 확인하는 법 => useSelector
// const isLoginState = useSelector((state) => state.isLoginReducer)
//   const locationState = useSelector((state) => state.locationReducer)
//   console.log('islogin==>>', isLoginState)
//   console.log('location===', locationState)
//redux dispatch로 원하는 action 사용하는법
//   const dispatch = useDispatch()
//   dispatch(handleLogin())
//   dispatch(changeLocation())
//   dispatch(handleLogin())
//   dispatch(changeLocation())
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          here <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
