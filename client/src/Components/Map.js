/*global kakao*/
import React, { useEffect, useRef } from 'react'
import address from '../dummy/address'

const MapComponent = () => {
  let mapContainer = document.getElementById('map')
  let mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  }
  let map = new kakao.maps.Map(mapContainer, mapOption)
  // useEffect(() => {
  //   //현재위치기반 지도 생성
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     let currentPos = new kakao.maps.LatLng(
  //       // position.coords.latitude,
  //       // position.coords.longitude
  //       37.54616656428804,
  //       127.0850069979399
  //     )
  //     let options = {
  //       center: currentPos,
  //       level: 3,
  //     }
  //     let map = new kakao.maps.Map(mapContainer.current, options)
  //     //현재위치 마커생성
  //     let icon = new kakao.maps.MarkerImage(
  //       './currentPos.png',
  //       new kakao.maps.Size(30, 30)
  //     )
  //     let marker = new kakao.maps.Marker({
  //       position: currentPos,
  //       image: icon,
  //     })
  //     marker.setMap(map)
  //     //흡연구역 마커생성
  //     let geocoder = new kakao.maps.services.Geocoder()
  //     for (const el of address) {
  //       geocoder.addressSearch(el, function (result, status) {
  //         if (status === kakao.maps.services.Status.OK) {
  //           let coords = new kakao.maps.LatLng(result[0].y, result[0].x)
  //           let marker = new kakao.maps.Marker({
  //             map: map,
  //             position: coords,
  //           })
  //           marker.setMap(map)
  //         } else {
  //           console.log(el)
  //         }
  //       })
  //     }
  //   })
  // }, [])
  return (
    <div id="map" className="map">
      mapHere
    </div>
  )
}

export default MapComponent
