const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'

const cities = [];

fetch(endpoint, function(data) {
  console.log(data);
});

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map((place) => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class = 'hl'>${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class = 'hl'>${this.value}</span>`);
    return `
      <li> 
        <span class = 'name'>${cityName}, ${stateName}</span>
        <span class = 'population'>${place.population}</span>
      <li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);