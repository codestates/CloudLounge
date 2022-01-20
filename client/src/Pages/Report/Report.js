import React, { useState, useRef } from 'react'
import './Report.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { notificationOn, setNotification, setNextLink } from '../../actions'

const Report = () => {
  const inputContent = useRef()
  const [radioBoxId, setRadioBoxId] = useState(-1)
  const [contents, setContents] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const contentChange = (e) => {
    setContents(e.target.value)
  }

  const submitBtnClick = () => {
    if (radioBoxId === -1) {
      dispatch(notificationOn())
      dispatch(setNotification('불편한 항목을 선택해 주세요'))
    } else if (radioBoxId === 3 && contents === '') {
      dispatch(notificationOn())
      dispatch(setNotification('불편한 사항을 작성해주세요'))
    } else {
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/lounge/report`,
        data: {
          loungeId: localStorage.getItem('loungeId'),
          radioBoxId: radioBoxId,
          contents: contents,
        },
        headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      })
        .then((res) => {
          if (res.status === 201) {
            dispatch(notificationOn())
            dispatch(setNotification('신고가 접수되었습니다.'))
            dispatch(setNextLink('/'))
          }
        })
        .catch((err) => {
          if (err.status === 400) {
            dispatch(notificationOn())
            dispatch(setNotification('신고를 접수하기 위한 정보가 부족합니다.'))
          }
        })
    }
  }

  return (
    <div className="report">
      <div className="reportHeader">어떤 불편함이 있으신가요?</div>
      <div className="reportSurvey">
        <div>
          <div
            className={radioBoxId === 1 ? 'radioOption selected' : 'radioOption'}
            onClick={() => {
              inputContent.current.value = ''
              setRadioBoxId(1)
              setContents(null)
            }}
          >
            흡연장이 없습니다.
          </div>
          <div
            className={radioBoxId === 2 ? 'radioOption selected' : 'radioOption'}
            onClick={() => {
              inputContent.current.value = ''
              setRadioBoxId(2)
              setContents(null)
            }}
          >
            시설이 불청결합니다.
          </div>
          <div
            className={radioBoxId === 3 ? 'radioOption selected' : 'radioOption'}
            onClick={() => {
              setRadioBoxId(3)
              setContents('')
            }}
          >
            기타
          </div>
        </div>
        <textarea
          className="reportContents"
          disabled={radioBoxId !== 3}
          onChange={contentChange}
          ref={inputContent}
          placeholder="불편한 점을 적어주세요"
        ></textarea>
      </div>
      <button className="submitReport" onClick={submitBtnClick}>
        신고제출
      </button>
    </div>
  )
}

export default Report
