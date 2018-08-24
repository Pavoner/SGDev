window.addEventListener('load', initMap)
var map, modalMap, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 51.5, lng: -115.0},
    zoom: 8,
    mapTypeId: 'terrain'
  });

  map.addListener('click', function(e) {
      console.log(e.latLng.lat())
      console.log(e.latLng.lng())
  });

  modalMap = new google.maps.Map(document.getElementById('mapModalInner'), {
    center: {lat: 51.5, lng: -115.0},
    zoom: 8,
    mapTypeId: 'terrain'
  });

  modalMap.addListener('click', function(e) {
    let lat = document.querySelector('#lat');
    let lng = document.querySelector('#lng');
    lat.value = e.latLng.lat();
    lng.value = e.latLng.lng();
    let marker = new google.maps.Marker({
      position: e.latLng,
      map: modalMap,
      title: 'Selected Position'
    })
    console.log(e.latLng.lat())
    console.log(e.latLng.lng())
});
}