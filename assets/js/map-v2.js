var map = null, pointarray, heatmap;

// Find Location Function
function showlocation() {
    // One-shot position request.
    navigator.geolocation.getCurrentPosition(callback, errorHandler);
}

// Locate the position
function callback(position) {
   
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
       
  var latLong = new google.maps.LatLng(lat, lon);
   
  var marker = new google.maps.Marker({
      position: latLong,
      icon: 'assets/images/icons/map-icon.png',
      animation: google.maps.Animation.DROP
  });
           
  marker.setMap(map);
  map.setZoom(17);
  map.setCenter(marker.getPosition());
}

// Geolocation Error Handler
function errorHandler(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
    }
  }

// Select Crime Function
function selectedData(crimeType){
  heatmap.setMap();

  if (crimeType === 'autoTheft')
    {
      pointArray = autoTheft;
    }
  else if (crimeType === 'aggravatedAssault')
    {
      pointArray = aggravatedAssault;
    }
  else if (crimeType === 'burglary')
    {
      pointArray = burglary;
    }
  else if (crimeType === 'homicide')
    {
      pointArray = homicide;
    }
  else if (crimeType === 'theft')
    {
      pointArray = theft;
    }
  else if (crimeType === 'drugs')
    {
      pointArray = drugs;
    }

  // pointArray = autoTheft;
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray,
    radius: 25,
    maxIntensity: 10,
    opacity: 0.75
  });

  heatmap.setMap(map);

}

// Initialize Map
google.maps.event.addDomListener(window, 'load', initMap);
function initMap() {

  var mapOptions = {
    center: new google.maps.LatLng(35.04563, -85.30968),
    zoom: 15,
    panControl: false,
    zoomControl: false,
    mapTypeId: google.maps.MapTypeId.HYBRID
  };

  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  // Display Heatmap
  var pointArray = new google.maps.MVCArray(aggravatedAssault);

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray,
    radius: 25,
    maxIntensity: 10,
    opacity: 0.75
  });

  heatmap.setMap(map);
 
}