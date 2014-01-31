$(document).ready(function(){
var map = L.map('map').setView([51.505, -0.09], 13);
var latlngStore = [];
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
}).addTo(map);
L.marker([51.5, -0.09]).addTo(map)
			.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

		var popup = L.popup();

		function onMapClick(e) {
			popup
				.setLatLng(e.latlng)
				.setContent("You clicked the map at " + e.latlng.toString())
				.openOn(map);
			latlngStore.push(e.latlng.toString());
			console.log(latlngStore);
		}
		function showPopup(e){
			alert("Hello"+e.latlng.toString());
		}

		map.on('click', showPopup);
});		