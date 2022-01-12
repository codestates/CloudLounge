/*global kakao*/
import React, { Fragment, useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLounge } from '../../actions'
import axios from 'axios'
import Overlay from '../../Components/Overlay'

const MapComponent2 = () => {
  const mapContainer = useRef()
  const dispatch = useDispatch()
  const [loungeInfo, setLoungeInfo] = useState([])
  const [map, setMap] = useState(null)
  const [isOverlay, setIsOverlay] = useState(false)
  let geocoder = new kakao.maps.services.Geocoder()

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/lounge`).then((res) => {
      setLoungeInfo(res.data.data)
      let options = {
        center: new kakao.maps.LatLng(0, 0),
        level: 3,
      }
      setMap(new kakao.maps.Map(mapContainer.current, options))
    })
  }, [])

  useEffect(() => {
    if (map === null) {
      return
    }
    kakao.maps.event.addListener(map, 'click', function () {
      setIsOverlay(false)
    })
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
            axios({
              method: 'GET',
              url: `${process.env.REACT_APP_SERVER_URL}/lounge/info/${marker.getTitle()}`,
            }).then((res) => {
              localStorage.setItem('loungeId', marker.getTitle())
              dispatch(setLounge(res.data.data))
              setIsOverlay(true)
              map.setCenter(marker.getPosition())
            })
          })
          marker.setMap(map)
        }
      })
    }
  }, [map])
  return (
    <Fragment>
      <div className="map" ref={mapContainer}></div>
      {isOverlay ? <Overlay /> : ''}
    </Fragment>
  )
}

export default MapComponent2
