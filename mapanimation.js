mapboxgl.accessToken = 'pk.eyJ1IjoiZXJpY3NlYW5qb2huc29uIiwiYSI6ImNrdGVxZTBiYjAwMGEyb3J6NDl2bTVzdHIifQ.5N-sZ2hG-e_MdqaoCCws5g'

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-112.074036, 33.448376],
  zoom: 12
});

const nav = new mapboxgl.NavigationControl();
  map.addControl(nav, 'top-left');

const el = document.createElement('div');
  el.className = 'marker';

var marker = new mapboxgl.Marker(el)
  .setLngLat([-112.074036, 33.448376])
  .addTo(map);

// MTBA Data Packaging

async function run() {
    // get bus data    
	const locations = await getBusLocations();
	const lat = locations.entity[1].vehicle.position.latitude;
  const long = locations.entity[1].vehicle.position.longitude;
  const longLat = [];
  longLat.push(long, lat);
  marker.setLngLat(longLat);
  map.flyTo({'center': longLat, 'zoom': 17});
	console.log(new Date());
  console.log('Longitude is: ' + locations.entity[1].vehicle.position.longitude);
	console.log('Latitude is: ' + locations.entity[1].vehicle.position.latitude);
	// timer
	setTimeout(run, 15000);
}

// Request bus data from MBTA

async function getBusLocations() {
	const url = 'https://app.mecatran.com/utw/ws/gtfsfeed/vehicles/valleymetro?apiKey=4f22263f69671d7f49726c3011333e527368211f&asJson=true';
	const response = await fetch(url);
	const json     = await response.json();
	return json;

}

run();