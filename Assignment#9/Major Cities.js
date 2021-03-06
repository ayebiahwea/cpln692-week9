<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8' />
    <title>MajorCities in Ghana slideshow</title>
    <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
    <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.js'></script>
    <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.css' rel='stylesheet' />
	
    <style>
        body { margin:0; padding:0; }
        #map { position:absolute; top:0; bottom:0; width:100%; }
    </style>
</head>
<body>

<style>
.map-overlay-container {
    position: absolute;
    width: 25%;
    top: 0;
    left: 0;
    padding: 10px;
    z-index: 1;
}

.map-overlay {
    font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
    background-color: #fff;
    border-radius: 3px;
    padding: 10px;
    box-shadow:0 1px 2px rgba(0,0,0,0.20);
}

.map-overlay h2,
.map-overlay p {
    margin: 0 0 10px;
}
</style>
<script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v3.1.6/mapbox-gl-geocoder.min.js'></script>
<link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v3.1.6/mapbox-gl-geocoder.css' type='text/css' />
<div id='map'></div>

<div class='map-overlay-container'>
  <div class='map-overlay'>
    <h2 id='location-title'></h2>
    <p id='location-description'></p>
    <small>Text credit: <a target='_blank' href='http://www.ghana.travel/'>visitGhana.com</a></small>
  </div>
</div>

<script>
mapboxgl.accessToken = 'pk.eyJ1IjoiYXllYmlhaHdlYSIsImEiOiJjanRrZWdqeTQzYTAwNDRvOXRmMjE2dmQzIn0.egyoNyK7vAjxrhsqDgeDqQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-1.6244,6.6885 ],
    maxZoom: 16,
    minZoom: 9,
    zoom: 9.68
});
map.addControl(new MapboxGeocoder({
accessToken: mapboxgl.accessToken
}));
var title = document.getElementById('location-title');
var description = document.getElementById('location-description');

var locations = [{
    "id": "2",
    "title": "Kumasi",
    "description": "Kumasi is the capital city of the Ashanti Region, in southern Ghana. It’s known as a center for Ashanti culture..",
    "camera": {
        center: [-1.6244,6.6885],
        zoom: 12.21,
        pitch: 50
    }
}, {
    "id": "3",
    "title": "Accra",
    "description": "DescriptionAccra is the capital of Ghana, on the Atlantic coast of West Africa.Popular seafront spots Labadi Beach and Kokrobite Beach offer golden sand and high-energy nightlife",
    "camera": {
        center: [-0.1969, 5.55602],
        bearing: -8.9,
        zoom: 11.68
    }
}, {
    "id": "1",
    "title": "Cape Coast",
    "description": "Cape Coast is the capital of the Central Region, in southern Ghana. It’s known for its role in the transatlantic slave trade. Overlooking the Gulf of Guinea, Cape Coast Castle is a large whitewashed fort built by the Swedish in the 17th century.",
    "camera": {
        center: [-1.2466,5.10535],
        bearing: 25.3,
        zoom: 11.5
    }
}, {
    "id": "4",
    "title": "Sekondi-Takoradi",
    "description": "Sekondi-Takoradi, a city comprising the twin cities of Sekondi and Takoradi. It is the capital of Sekondi – Takoradi Metropolitan District and the Western Region of Ghana. Sekondi-Takoradi is the region's largest city and an industrial and commercial centre, with a population of 445,205 people.",
    "camera": {
        center: [-1.7137,4.934],
        bearing: 36,
        zoom: 11.37
    }
}, {
    "id": "5",
    "title": "Tamale",
    "description": "Tamale is the capital city of the Northern Region of Ghana, West Africa. It’s known for its traditional mosques and large Central Mosque. The Centre for National Culture sells handicrafts and stages music and dance performances.",
    "camera": {
        center: [-0.8393,9.40079],
        bearing: 28.4,
        zoom: 11.64
    }
}, {
    "title": "Ghana",
    "description": "Ghana, a nation on West Africa’s Gulf of Guinea, is known for diverse wildlife, old forts and secluded beaches, such as at Busua. Coastal towns Elmina and Cape Coast contain posubans (native shrines), colonial buildings and castles-turned-museums that serve as testimonials to the slave trade. North of Cape Coast, vast Kakum National Park has a treetop-canopy walkway over the rainforest.",
    "camera": {
        center: [-1.0307, 7.9528],
        zoom: 9.68,
        bearing: 0,
        pitch: 0
    }
}];

function highlightBorough(code) {
    // Only show the polygon feature that cooresponds to `borocode` in the data
    map.setFilter('highlight', ["==", "borocode", code]);
}

function playback(index) {
    title.textContent = locations[index].title;
    description.textContent = locations[index].description;

    highlightBorough(locations[index].id ? locations[index].id : '');

    // Animate the map position based on camera properties
    map.flyTo(locations[index].camera);

    map.once('moveend', function() {
        // Duration the slide is on screen after interaction
        window.setTimeout(function() {
            // Increment index
            index = (index + 1 === locations.length) ? 0 : index + 1;
            playback(index);
        }, 9000); // After callback, show the location for 3 seconds.
    });
}

// Display the last title/description first
title.textContent = locations[locations.length - 1].title;
description.textContent = locations[locations.length - 1].description;

map.on('load', function() {

    map.addLayer({
        "id": "highlight",
        "type": "fill",
        "source": {
            "type": "vector",
            "url": "mapbox://mapbox.8ibmsn6u"
        },
        "source-layer": "original",
        "paint": {
            "fill-color": "#fd6b50",
            "fill-opacity": 0.25
        },
        "filter": ["==", "borocode", ""]
    }, 'settlement-subdivision-label'); // Place polygon under the neighborhood labels.

    // Start the playback animation for each borough
    playback(0);
});
</script>

</body>
</html>