import axios from 'axios'
import { setLounge } from '../actions'

export function initializeMap(map, dispatch, setIsOverlay, setLoadStatus) {
  let geocoder = new kakao.maps.services.Geocoder()
  kakao.maps.event.addListener(map, 'click', function () {
    setIsOverlay(false)
  })
  navigator.geolocation.getCurrentPosition(
    (position) => {
      if (sessionStorage.getItem('mapCenter') !== null) {
        let mapCenter = JSON.parse(sessionStorage.getItem('mapCenter'))
        sessionStorage.removeItem('mapCenter')
        map.setCenter(new kakao.maps.LatLng(mapCenter.Ma, mapCenter.La))
      } else {
        map.setCenter(
          // new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude)
          new kakao.maps.LatLng(37.52285820136469, 126.92555193917285)
        )
      }
      let icon = new kakao.maps.MarkerImage(
        './currentPos.png',
        new kakao.maps.Size(30, 30)
      )
      let marker = new kakao.maps.Marker({
        // position: new kakao.maps.LatLng(
        //   position.coords.latitude,
        //   position.coords.longitude
        // ),
        position: new kakao.maps.LatLng(37.52285820136469, 126.92555193917285),
        image: icon,
      })
      marker.setMap(map)
      setLoadStatus('pos success')

      axios.get(`${process.env.REACT_APP_SERVER_URL}/lounge`).then((res) => {
        for (const el of res.data.data) {
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
                  url: `${
                    process.env.REACT_APP_SERVER_URL
                  }/lounge/info/${marker.getTitle()}`,
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
        setTimeout(() => {
          setLoadStatus('load finish')
        }, 800)
      })
    },
    (error) => {
      map.setCenter(new kakao.maps.LatLng(37.553836, 126.969652))
      let icon = new kakao.maps.MarkerImage(
        './currentPos.png',
        new kakao.maps.Size(40, 40)
      )
      let marker = new kakao.maps.Marker({
        position: map.getCenter(),
        image: icon,
      })
      marker.setMap(map)
      setLoadStatus('pos failed')
      axios.get(`${process.env.REACT_APP_SERVER_URL}/lounge`).then((res) => {
        for (const el of res.data.data) {
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
                  url: `${
                    process.env.REACT_APP_SERVER_URL
                  }/lounge/info/${marker.getTitle()}`,
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
        setTimeout(() => {
          setLoadStatus('load finish')
        }, 1000)
      })
    }
  )
}
