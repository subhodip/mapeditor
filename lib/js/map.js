$(document).ready(function () {
    var map = L.map('map').setView([19.0407, 72.85618], 13);
    var latlngStore = [];
    var addressStore = [];
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    }).addTo(map);


    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
        latlngStore.push(e.latlng.toString());
        console.log(latlngStore);
    }

    function showPopup(e) {

        $('#mapPopUpModal').find("#latlongshow").val(e.latlng.toString());
        $('#mapPopUpModal').find("#showAddress").val("");
        $('#mapPopUpModal').modal({
            show: true,
            backdrop: true,
            keyboard: true
        });
        $('#mapPopUpModal').find("#reverseLookup").on('click', function () {
            var lat = e.latlng.lat;
            var lon = e.latlng.lng;
            var fireUrl = "http://nominatim.openstreetmap.org/reverse?format=xml&lat=" + lat + "&lon=" + lon + "&zoom=18&addressdetails=1";
            $.ajax({
                url: fireUrl,
                success: function (data) {
                    L.marker([lat, lon]).addTo(map).bindPopup("<p>" + $(data).find("result ").text() + "</p>").openPopup()
                    geocoder($(data).find("result ").text());
                }
            });

        });
    }

    function geocoder(data) {


        $('#mapPopUpModal').find("#showAddress").val(data);
        addressStore.push(data);
        showAddressList();
    }

    function showAddressList() {
        $("#showList").children("ul").html("");
        for (count = 0; count < addressStore.length; count++) {
            console.log(count);

            $("#showList ul").append("<li>" + addressStore[count] + "</li>");
        }
        console.log(addressStore);
    }



    map.on('click', showPopup);
});
