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
			$('#mapPopUpModal').find("#latlongshow").val(e.latlng.toString());
			$('#mapPopUpModal').find("#showAddress").val("");
			$('#mapPopUpModal').modal({show: true , backdrop : true , keyboard: true});
			$('#mapPopUpModal').find("#reverseLookup").on('click', function(){
				var lat = e.latlng.lat;
				var lon = e.latlng.lng;
				var fireUrl = "http://nominatim.openstreetmap.org/reverse?format=xml&lat="+lat+"&lon="+lon+"&zoom=18&addressdetails=1";
				$.ajax({
						url: fireUrl,
						success: function(data) {
							geocoder(data);
						}
				});
				
			});
		}
		function geocoder(data){
			
			$('#mapPopUpModal').find("#showAddress").val($(data).find("result ").text());
		}
		

		map.on('click', showPopup);
});		