import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'
import React from 'react'

function App() {
  const getTest = () => {
    axios({
      method: 'GET',
      url: process.env.REACT_APP_SERVER_URL,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data)
      })
      .then(() => {
        axios({
          method: 'GET',
          url: `${process.env.REACT_APP_SERVER_URL}/cookietest`,
          withCredentials: true,
        }).then((res) => {
          console.log('cookie test: ', res.data)
          localStorage.setItem('token', res.data.cookie)
        })
      })
  }

  const postTest = () => {
    axios({
      method: 'POST',
      url: process.env.REACT_APP_SERVER_URL,
    }).then((res) => {
      console.log(res.data)
    })
  }

  const putTest = () => {
    axios({
      method: 'PUT',
      url: process.env.REACT_APP_SERVER_URL,
    }).then((res) => {
      console.log(res.data)
    })
  }

  const patchTest = () => {
    axios({
      method: 'PATCH',
      url: process.env.REACT_APP_SERVER_URL,
    }).then((res) => {
      console.log(res.data)
    })
  }

  const deleteTest = () => {
    axios({
      method: 'DELETE',
      url: process.env.REACT_APP_SERVER_URL,
    }).then((res) => {
      console.log(res.data)
    })
  }

  useEffect(() => {
    console.log(process.env.REACT_APP_SERVER_URL)
    getTest()
    postTest()
    putTest()
    patchTest()
    deleteTest()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
