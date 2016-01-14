var map;
var infowindow;

function initMap() {
  var pyrmont = {lat: -33.867, lng: 151.195};
  var myHome = {lat: 37.473556, lng: 126.889478};

  map = new google.maps.Map(document.getElementById('map'), {
    center: myHome,
    zoom: 17
  });

  infowindow = new google.maps.InfoWindow();

  /*
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: myHome,
    radius: 500,
    types: ['store']
  }, callback);
  */
  createMakerMyHome();
}

function createMakerMyHome() {
	var marker = new google.maps.Marker({
		map: map,
		animation: google.maps.Animation.DROP,
		draggable: true,
		position: {lat: 37.473556, lng: 126.889478}
	});

	google.maps.event.addListener(marker, 'click', function() {
		if(marker.getAnimation() !== null) {
			marker.setAnimation(null);
			infowindow.close();
		} else {
			infowindow.setContent('우리집');
			infowindow.open(map, this);
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}
	});
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
