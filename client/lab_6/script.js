async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  // const cities = [];

  const request = await fetch(endpoint)

  const cities = await request.json()

  function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.city.match(regex) || place.state.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, cities);
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

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt) });
}
window.onload = windowActions;