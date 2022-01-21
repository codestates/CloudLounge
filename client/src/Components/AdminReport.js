import axios from 'axios'
axios.defaults.withCredentials = true
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteReportsList, notificationOn, setNotification } from '../actions'
const serverUrl = process.env.REACT_APP_SERVER_URL

const AdminReport = (props) => {
  const dispatch = useDispatch()
  const { address, count, loungeId } = props.report
  const isNotification = useSelector((state) => state.isNotificationReducer)
  const handleClick = async () => {
    if (isNotification) {
      return
    }
    await axios
      .delete(serverUrl + `/admin/${loungeId}`)
      .then((res) => {
        dispatch(notificationOn())
        dispatch(setNotification('정상적으로 삭제되었습니다.'))
        dispatch(deleteReportsList({ loungeId }))
      })
      .catch((err) => {
        dispatch(notificationOn())
        dispatch(setNotification('[삭제실패] 다시 시도해주세요'))
      })
  }

  return (
    <div className="adminReport-wrapper">
      <div className="adminReport-infos">
        <div className="adminReport-infos-left">
          <div>주소</div>
          <div className="adminReport-infos-bottom">누적 신고</div>
        </div>
        <div className="adminReport-infos-right">
          <div className="adminReport-address">{address}</div>
          <div className="adminReport-count adminReport-infos-bottom">{count}</div>
        </div>
      </div>
      <button className="adminReport-btn" onClick={handleClick}>
        완료
      </button>
    </div>
  )
}

export default AdminReport
