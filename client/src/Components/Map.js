/*global kakao*/
import React, { useEffect, useRef } from 'react'
import address from '../dummy/address'
import loungeInfo from '../dummy/sampledata'
import createContent from './Overlay'

const MapComponent = () => {
  const mapContainer = useRef()
  const logAddress = () => {
    console.log('click!')
  }
  const overlay = new kakao.maps.CustomOverlay({
    xAnchor: 0.5,
    yAnchor: 1,
    clickable: true,
  })
  useEffect(() => {
    //현재위치기반 지도 생성
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
        console.log('mapclick')
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
      for (const [index, el] of address.entries()) {
        geocoder.addressSearch(el, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            let coords = new kakao.maps.LatLng(result[0].y, result[0].x)
            let marker = new kakao.maps.Marker({
              map: map,
              position: coords,
            })
            marker.setTitle(el)
            kakao.maps.event.addListener(marker, 'click', function () {
              overlay.setContent(createContent(loungeInfo[index]))
              overlay.setPosition(marker.getPosition())
              overlay.setMap(map)
              map.setCenter(marker.getPosition())
            })
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
