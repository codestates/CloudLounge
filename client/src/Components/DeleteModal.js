import React from 'react'

const DeleteModal = ({ setIsDelete, handleDelSubmit }) => {
  const closeNotification = () => {
    setIsDelete(false)
  }
  return (
    <div className="notificationContainer">
      <div className="notification">
        <span>회원을 탈퇴하시겠습니까?</span>
        <div className="notificationBtnContainer">
          <button
            onClick={() => {
              closeNotification()
              handleDelSubmit()
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

export default DeleteModal
