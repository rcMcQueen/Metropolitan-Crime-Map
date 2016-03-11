var geocoder = new google.maps.Geocoder();

function searchAddress() {
    var address = $('#addressSearch').val();
    var year = $('#year option:selected').val();
    if (year = "yr") {
        year = "fifteen";
        // if option isn't selected, default to 2015
    }
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8888/addressSearch/' + address,
        async: false,
        dataType: 'json',
        useDefaultHxrHeader: false,
        success: function (data) {
            var rows = data;
            rows = JSON.stringify(rows);
        },
        error: function (data) {
            window.alert('No data found' + data)
        },
        // check if the address exists and if it does get the information, if not
        // send a pop up to let the user know
    });
    console.log(rows);
    var addressObj = JSON.parse(rows);
    var infoString = '<div id="crimeInfo"><p>';
    for (i = 0; i < addressObj.length(); i++) {
        infoString += addressObj[i].TYPE + " " + addressObj[i].YEAR + " "
            + addressObj[i].MONTH + " " + addressObj[i].HUNDRED_BLOCK + " "
            + addressObj[i].N_HOOD + "<br>";
    }

    geocoder.geocode({'address': address}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var mapDiv = document.getElementById('map');
            var map = new google.maps.Map(mapDiv, {center: (results[0].geometry.location), zoom: 15});
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
            marker.setMap(map);
        } else {
            alert('Geocode was not successful for the following reason: '
                + status);
        }
        // use the geocode to find the lat and long variables and create a marker
        // with the information about the crime at that address
    });
}