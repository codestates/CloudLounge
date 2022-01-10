/*global kakao*/
import React, { Fragment, useEffect, useRef, useState } from 'react'
import address from '../../dummy/address'
// import loungeInfo from '../../dummy/sampledata'
import createContent from '../../Components/Overlay'
import { useDispatch } from 'react-redux'
import { setLounge } from '../../actions'
import axios from 'axios'

const MapComponent = () => {
  const [isOverlay, setIsOverlay] = useState(false)
  const mapContainer = useRef()
  const overlay = new kakao.maps.CustomOverlay({
    xAnchor: 0.5,
    yAnchor: 1,
    clickable: true,
  })
  const dispatch = useDispatch()
  const [loungeInfo, setLoungeInfo] = useState({})
  useEffect(async () => {
    //현재위치기반 지도 생성
    await axios.get(`${process.env.REACT_APP_SERVER_URL}/lounge`).then((res) => {
      setLoungeInfo(res.data)
    })
    navigator.geolocation.getCurrentPosition((position) => {
      let currentPos = new kakao.maps.LatLng(
        // position.coords.latitude,
        // position.coords.longitude
        37.54616656428804,
        127.0850069979399
      )
      let options = {
        center: currentPos,
        level: 3,
      }
      let map = new kakao.maps.Map(mapContainer.current, options)
      kakao.maps.event.addListener(map, 'click', function () {
        overlay.setMap(null)
      })
      //현재위치 마커생성
      let icon = new kakao.maps.MarkerImage(
        './currentPos.png',
        new kakao.maps.Size(30, 30)
      )
      let marker = new kakao.maps.Marker({
        position: currentPos,
        image: icon,
      })
      marker.setMap(map)
      //흡연구역 마커생성
      let geocoder = new kakao.maps.services.Geocoder()
      for (const el of address) {
        geocoder.addressSearch(el.address, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            let coords = new kakao.maps.LatLng(result[0].y, result[0].x)
            let marker = new kakao.maps.Marker({
              map: map,
              position: coords,
            })
            marker.setTitle(el.id)
            kakao.maps.event.addListener(marker, 'click', async function () {
              // dispatch(setLounge(loungeInfo[marker.getTitle() - 1]))
              localStorage.setItem('loungeId', marker.getTitle())
              await axios({
                method: 'GET',
                url: `${
                  process.env.REACT_APP_SERVER_URL
                }/lounge/info/${marker.getTitle()}`,
              }).then((res) => {
                overlay.setContent(createContent(res.data))
                overlay.setPosition(marker.getPosition())
                overlay.setMap(map)
                map.setCenter(marker.getPosition())
              })
            })
            console.log('marker')
            marker.setMap(map)
          } else {
            console.log(el)
          }
        })
      }
    })
  }, [])

  return <div className="map" ref={mapContainer}></div>
}

export default MapComponent
