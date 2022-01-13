import axios from 'axios'
import { setLounge } from '../actions'

export function initializeMap(map, dispatch, setIsOverlay) {
  let geocoder = new kakao.maps.services.Geocoder()
  kakao.maps.event.addListener(map, 'click', function () {
    setIsOverlay(false)
  })
  navigator.geolocation.getCurrentPosition((position) => {
    map.setCenter(
      new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude)
    )
    let icon = new kakao.maps.MarkerImage('./currentPos.png', new kakao.maps.Size(30, 30))
    let marker = new kakao.maps.Marker({
      position: map.getCenter(),
      image: icon,
    })
    marker.setMap(map)
  })
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
  })
}
