var map = new L.map('map', { zoomControl:false });

L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
	maxZoom: 18, loadingControl: true
}).addTo(map);

// change zoom button position
map.addControl( L.control.zoom({position: 'bottomright'}) );

function onLocationFound(e) {
	var radius = e.accuracy / 2;
	
	// larger icon
	var myIcon = L.icon({
		iconUrl: '/lib/leaflet/images/marker-icon-32px.png',
		iconSize: [32, 52],
		iconAnchor: [16, 52],
		popupAnchor: [0, -52],
		shadowUrl: '/lib/leaflet/images/marker-shadow.png',
		shadowSize: [41, 41],
		shadowAnchor: [13, 41]
	});
	
	var marker = L.marker(e.latlng, {draggable: true, riseOnHover: true, icon: myIcon}).addTo(map)
//		.bindPopup("You are within " + radius + " meters from this point")
		.bindPopup("You are here!", {closeButton: false})
		.openPopup();

	marker.on('dragend', onDragEnd);

	L.circle(e.latlng, radius).addTo(map);
}

/**
 * Geolocation or connection error
 */
function onLocationError(e) {
	alert(
		e.message
		+ "\n\nPlease check your geolocation settings, then relaunch the application."
	);
	window.close();
}

/**
 * Update coordinates after dragging the marker
 */
function onDragEnd(e) {
	var marker = e.target;
	var markerLatLng = marker.getLatLng();
	locationMarkerLat = markerLatLng.lat;
	locationMarkerLng = markerLatLng.lng;
}


map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({setView: true, maxZoom: 15});

