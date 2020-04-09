mapboxgl.accessToken = 'pk.eyJ1IjoiZXNpcmVtYWxheXNpYSIsImEiOiJjazh0ZDQ3N2EwZGd4M21sOTRyYmE0c2k2In0.dr-_TcRmrVC7FA3V3X_X5w';

if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL');
} else {
    ipLookUp();
    var locationText = document.getElementById("location");
    var information = document.getElementById("information");

    let as = localStorage.getItem('as');
    let org = localStorage.getItem('org');
    let ip = localStorage.getItem('ip');
    let continent = localStorage.getItem('continent');
    let country = localStorage.getItem('country');
    let region = localStorage.getItem('region');
    let city = localStorage.getItem('city');
    let postal = localStorage.getItem('postal');
    let lat = localStorage.getItem('lat');
    let lng = localStorage.getItem('lng');
    let call = localStorage.getItem('call');
    let currency = localStorage.getItem('currency');
    let languages = localStorage.getItem('languages');

    var user_location = [lng, lat];
    var my_location = [
        [5.074171, 47.312321]
    ];
    var map = new mapboxgl.Map({
        style: 'mapbox://styles/mapbox/light-v9',
        center: user_location,
        zoom: 15.5,
        pitch: 45,
        bearing: -17.6,
        container: 'map'
    });
}
var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
});

map.addControl(geocoder);
map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new mapboxgl.NavigationControl());

// Add geolocate control to the map.
map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
}));

//Add Itineraire
/*
map.addControl(new MapboxDirections({
accessToken: mapboxgl.accessToken
}), 'top-left');
*/

// Display Map in 3d
map3d(map);

//Add marker
var marker;
map.on('click', function (e) {
    marker.remove();
    addMarker(e.lngLat, 'click');
    //console.log(e.lngLat.lat);
    user_location = [e.lngLat.lng, e.lngLat.lat];
    locationText.value = ' lat : ' + user_location[1] + ' | lng : ' + user_location[0];
    information.value = ' as : ' + as + ' | org : ' + org + ' | ip : ' + ip + ' | continent : ' + continent + ' | country : ' + country + ' | region : ' + region + ' | city : ' + city + ' | postal : ' + postal + ' | lat : ' + lat + ' ; lng : ' + lng + ' | country_calling_code : ' + call + ' | currency : ' + currency + ' | languages : ' + languages;
    map.flyTo({
        center: user_location
    });

});


//Change map's style
var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');
for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}

function switchLayer(layer) {
    var layerId = layer.target.id;
    if (layerId == '3d') {
        map.setStyle('mapbox://styles/mapbox/light-v9');
        location.reload();
        map.update(true);
        map.flyTo({
            center: user_location
        });
    } else {
        map.setStyle('mapbox://styles/mapbox/' + layerId + '-v9');
    }
}

function map3d(map) {
    map.on('load', function () {
        addMarker(user_location, 'load');
        add_markers(my_location);
    information.value = ' as : ' + as + ' | org : ' + org + ' | ip : ' + ip + ' | continent : ' + continent + ' | country : ' + country + ' | region : ' + region + ' | city : ' + city + ' | postal : ' + postal + ' | lat : ' + lat + ' ; lng : ' + lng + ' | country_calling_code : ' + call + ' | currency : ' + currency + ' | languages : ' + languages;

        // Insert the layer beneath any symbol layer.
        var layers = map.getStyle().layers;

        var labelLayerId;
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                labelLayerId = layers[i].id;
                break;
            }
        }

        map.addLayer({
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                'fill-extrusion-color': '#aaa',

                // use an 'interpolate' expression to add a smooth transition effect to the
                // buildings as the user zooms in
                'fill-extrusion-height': [
                    "interpolate", ["linear"],
                    ["zoom"],
                    15, 0,
                    15.05, ["get", "height"]
                ],
                'fill-extrusion-base': [
                    "interpolate", ["linear"],
                    ["zoom"],
                    15, 0,
                    15.05, ["get", "min_height"]
                ],
                'fill-extrusion-opacity': .6
            }
        }, labelLayerId);
        geocoder.on('result', function (ev) {
            marker.remove();
            user_location = [ev.result.geometry.coordinates[0], ev.result.geometry.coordinates[1]];
            addMarker(user_location, 'click');
            //console.log('result', user_location);
        });
    });

}

function addMarker(ltlng, event) {

    if (event === 'click') {
        user_location = ltlng;
    }
    marker = new mapboxgl.Marker({
            draggable: true,
            color: "#d02922"
        })
        .setLngLat(user_location)
        .addTo(map)
        .on('dragend', onDragEnd);
}

function add_markers(coordinates) {

    var geojson = (my_location == coordinates ? my_location : '');

    //console.log(geojson);
    // add markers to map
    geojson.forEach(function (marker) {
        //console.log(marker);
        // make a marker for each feature and add to the map
        new mapboxgl.Marker()
            .setLngLat(marker)
            .addTo(map);
    });
}

function onDragEnd() {
    var lngLat = marker.getLngLat();
    user_location = [lngLat.lng, lngLat.lat];
    locationText.value = ' lat : ' + user_location[1] + ' | lng : ' + user_location[0];
    information.value = ' as : ' + as + ' | org : ' + org + ' | ip : ' + ip + ' | continent : ' + continent + ' | country : ' + country + ' | region : ' + region + ' | city : ' + city + ' | postal : ' + postal + ' | lat : ' + lat + ' ; lng : ' + lng + ' | country_calling_code : ' + call + ' | currency : ' + currency + ' | languages : ' + languages;
    //console.log('lng: ' + lngLat.lng + '<br />lat: ' + lngLat.lat);
}

//TRACKING IP
function ipLookUp() {
    $.ajax('https://api.ipdata.co/?api-key=eea524946a3985bb179d8a684e5a2008b0869bc1edb2948509721bff')
        .then(
            function success(response) {
                console.log('Location Data is ', response);

                as = response.asn.toString();
                org = response.organisation.toString();
                ip = response.ip.toString();
                continent = response.country_name.toString();
                country = response.country_name.toString();
                region = response.region.toString();
                city = response.city.toString();
                postal = response.postal.toString();
                lat = response.latitude.toString();
                lng = response.longitude.toString();
                call = ' +' + response.calling_code.toString();
                currency = response.currency.name.toString() + ' ( ' +response.currency.symbol.toString() + ' )';
                languages = response.languages[0].name.toString();

                localStorage.setItem('as', as);
                localStorage.setItem('org', org);
                localStorage.setItem('ip', ip);
                localStorage.setItem('continent', continent);
                localStorage.setItem('country', country);
                localStorage.setItem('region', region);
                localStorage.setItem('city', city);
                localStorage.setItem('postal', postal);
                localStorage.setItem('lat', lat);
                localStorage.setItem('lng', lng);         
                localStorage.setItem('call', call);
                localStorage.setItem('currency', currency);
                localStorage.setItem('languages', languages);
            },

            function fail(data, status) {
                console.log('Request failed.  Returned status of',
                    status);
            }
        );
}
