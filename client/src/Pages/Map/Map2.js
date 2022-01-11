/*global kakao*/
import React, { Fragment, useEffect, useRef, useState } from 'react'
import address from '../../dummy/address'
// import loungeInfo from '../../dummy/sampledata'
import createContent from '../../Components/Overlay'
import { useDispatch } from 'react-redux'
import { setLounge } from '../../actions'
import axios from 'axios'

const MapComponent2 = () => {
  const mapContainer = useRef()
  console.log(mapContainer)
  const overlay = new kakao.maps.CustomOverlay({
    xAnchor: 0.5,
    yAnchor: 1,
    clickable: true,
  })
  const dispatch = useDispatch()
  const [loungeInfo, setLoungeInfo] = useState([])
  useEffect(async () => {
    let options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    }
    let map = new kakao.maps.Map(mapContainer.current, options)
    //현재위치기반 지도 생성
    await axios.get(`${process.env.REACT_APP_SERVER_URL}/lounge`).then((res) => {
      console.log(res.data.data)
      setLoungeInfo(res.data.data)
    })
    navigator.geolocation.getCurrentPosition((position) => {
      let currentPos = new kakao.maps.LatLng(
        // position.coords.latitude,
        // position.coords.longitude
        37.546166,
        127.085
      )

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
      console.log('lougngeInfo Start!', loungeInfo)
      for (const el of loungeInfo) {
        console.log(el.address)
        geocoder.addressSearch(el.address, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            let coords = new kakao.maps.LatLng(result[0].y, result[0].x)
            let marker = new kakao.maps.Marker({
              map: map,
              position: coords,
            })
            marker.setTitle(el.id)
            kakao.maps.event.addListener(marker, 'click', async function () {
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

export default MapComponent2
