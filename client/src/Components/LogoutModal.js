import React from 'react'

const LogoutModal = ({ setIsModal, logout }) => {
  const closeNotification = () => {
    setIsModal(false)
  }
  return (
    <div className="logoutModalContainer">
      <div className="notification">
        <span>로그아웃 하시겠습니까?</span>
        <div className="notificationBtnContainer">
          <button
            onClick={() => {
              closeNotification()
              logout()
            }}
          >
            예
          </button>
          <button onClick={closeNotification}>아니오</button>
        </div>
      </div>
    </div>
  )
}

export default LogoutModal
