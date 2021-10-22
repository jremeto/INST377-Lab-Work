async function windowActions() {
  function maplnit() {
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1Ijoiam9yZGFucmVtZXRvIiwiYSI6ImNrdXl1MXdmbTc2ancyb21ueDZvMWQ1MnkifQ.JI5aDXjPQko2rtT4KgjnTw'
    }).addTo(mymap);
  }

  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  const request = await fetch(endpoint);

  const cities = await request.json();

  const mymap = L.map('mapid').setView([51.505, -0.09], 13);

  const marker = [];

  function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.city.match(regex) || place.state.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, cities);
    const listLimiter = matchArray.slice(0, 5);
    listLimiter.forEach(p => {
        if (p.hasOwnProperty('geocoded_column_1')) {
            const point = p.geocoded_column_1;
            const latlog = point.coordinates;
            const mark = latlog.reverse();
            marker.push(L.marker(markers).addTo(mymap));
        }
    });

    const html = matchArray.map((place) => {
      const regex = new RegExp(this.value, 'gi');
      const cityName = place.city.replace(regex, `<span class = 'hl'>${this.value}</span>`);
      const stateName = place.state.replace(regex, `<span class = 'hl'>${this.value}</span>`);
      return `
        <li> 
          <span class = 'name'>${place.city}, ${place.state}</span>
          <span class = 'restaurant'>${place.name}</span>
        <li>
      `;
    }).join('');
    suggestions.innerHTML = html;
  }

  const searchInput = document.querySelector('.input');
  const suggestions = document.querySelector('.suggestions');
  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt) });
}
window.onload = windowActions;