/*global kakao*/
import React, { Fragment, useEffect, useState, useRef } from 'react'
import createContent from '../../Components/Overlay'
import { useDispatch, useSelector } from 'react-redux'
import { setLounge } from '../../actions'
import axios from 'axios'

const MapComponent = () => {
  const mapContainer = useRef()
  const [loungeInfo, setLoungeInfo] = useState([])
  const [map, setMap] = useState(null)
  let geocoder = new kakao.maps.services.Geocoder()

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/lounge`).then((res) => {
      setLoungeInfo(res.data.data)
    })
    let options = {
      center: new kakao.maps.LatLng(0, 0),
      level: 3,
    }
    setMap(new kakao.maps.Map(mapContainer.current, options))
  }, [])

  useEffect(() => {
    if (map === null) {
      return
    }

    navigator.geolocation.getCurrentPosition((position) => {
      map.setCenter(
        new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude)
      )
      let icon = new kakao.maps.MarkerImage(
        './currentPos.png',
        new kakao.maps.Size(30, 30)
      )
      let marker = new kakao.maps.Marker({
        position: map.getCenter(),
        image: icon,
      })
      marker.setMap(map)
    })

    for (const el of loungeInfo) {
      geocoder.addressSearch(el.address, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          let coords = new kakao.maps.LatLng(result[0].y, result[0].x)
          let marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          })
          marker.setTitle(el.id)
          kakao.maps.event.addListener(marker, 'click', function () {
            console.log(marker.getTitle())
          })
          marker.setMap(map)
        }
      })
    }
  })
  return <div className="map" ref={mapContainer}></div>
}

export default MapComponent
