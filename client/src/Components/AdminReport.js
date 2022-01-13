import axios from 'axios'
axios.defaults.withCredentials = true
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteReportsList, handleAdminPageFalse } from '../actions'
const serverUrl = process.env.REACT_APP_SERVER_URL
console.log(serverUrl)

const AdminReport = (props) => {
  const dispatch = useDispatch()
  const { address, count, loungeId } = props.report
  const handleClick = async () => {
    await axios.delete(serverUrl + `/admin/${loungeId}`)
    dispatch(deleteReportsList({ loungeId }))
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
