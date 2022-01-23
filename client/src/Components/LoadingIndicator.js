import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function LoadingIndicator({ mapLoading, loadStatus }) {
  const [msg, setMsg] = useState('지도로딩중...')
  if (mapLoading && msg === '지도로딩중...') {
    setMsg('현재위치 찾는중...')
  }
  if (msg === '현재위치 찾는중...' && loadStatus === 'pos failed') {
    setMsg('위치 권한이 없습니다.\n 권한설정후 페이지를 새로고침해 주세요.')
  }
  if (msg === '현재위치 찾는중...' && loadStatus === 'pos success') {
    setMsg('흡연구역 찾는중...')
  }

  return (
    <div className="loadingIndicator">
      <FontAwesomeIcon icon={faSpinner} size="6x" className="loadingIndicator" />
    </div>
  )
}

export default LoadingIndicator
