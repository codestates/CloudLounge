import React from 'react'
import { useDispatch } from 'react-redux'
import { getReportsList } from '../actions'

const AdminReport = (props) => {
  const dispatch = useDispatch()
  const { address, reportCount, loungeId } = props.report
  const handleClick = () => {
    dispatch(getReportsList({ loungeId }))
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
          <div className="adminReport-count adminReport-infos-bottom">{reportCount}</div>
        </div>
      </div>
      <button className="adminReport-btn" onClick={handleClick}>
        조치완료
      </button>
    </div>
  )
}

export default AdminReport
