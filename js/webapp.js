// Check if online, exit if not
if (!navigator.onLine) {
	alert(
		'Error: No internet connection!'
		+ "\n\nPlease check your internet settings, then relaunch the application."
	);
	window.close();
}

// Sent map defaults
var locationMarkerLat = 44.811080;
var locationMarkerLng = 20.399052;
var mapZoom = 16;

// OpenStreetMaps short code converter
function makeShortCode(lat, lon, zoom) {
	char_array = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_@";
	var x = Math.round((lon + 180.0) * ((1 << 30) / 90.0));
	var y = Math.round((lat +  90.0) * ((1 << 30) / 45.0));
	
	// hack around the fact that JS apparently only allows 53-bit integers?!?
	// note that, although this reduces the accuracy of the process, it's fine for
	// z18 so we don't need to care for now.
	var c1 = 0, c2 = 0;
	for (var i = 31; i > 16; --i) {
		c1 = (c1 << 1) | ((x >> i) & 1);
		c1 = (c1 << 1) | ((y >> i) & 1);
	}
	for (var i = 16; i > 1; --i) {
		c2 = (c2 << 1) | ((x >> i) & 1);
		c2 = (c2 << 1) | ((y >> i) & 1);
	}
	var str = "";
	for (var i = 0; i < Math.ceil((zoom + 8) / 3.0) && i < 5; ++i) {
		digit = (c1 >> (24 - 6 * i)) & 0x3f;
		str += char_array.charAt(digit);
	}
	for (var i = 5; i < Math.ceil((zoom + 8) / 3.0); ++i) {
		digit = (c2 >> (24 - 6 * (i - 5))) & 0x3f;
		str += char_array.charAt(digit);
	}
	for (var i = 0; i < ((zoom + 8) % 3); ++i) {
		str += "=";
	}
	return str;
}

// functions
(function() {
	var sendSMS = document.querySelector("#send-sms");
	if (sendSMS) {
		sendSMS.onclick = function() {
			var sms = new MozActivity({
				name: "new", // Possible compose-sms in future versions
				data: {
					type: "websms/sms",
					number: "",
					body: "Hey, I'm here! "
							+ "http://osm.org/go/"
							+ makeShortCode(locationMarkerLat, locationMarkerLng, 16)
							+ "?m"
					/*
							+ "http://www.openstreetmap.org/?"
							+ "mlat=" + locationMarkerLat
							+ "&mlon=" + locationMarkerLng
							+ "#map=" + mapZoom
							+ "/" + locationMarkerLat
							+ "/" + locationMarkerLng
					*/
				}
			});
		}
	}

})();
