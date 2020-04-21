window.onload = () => {
  document.getElementById('initialClick').click();
};

function extractCountry(country = 'World', flag = '🌎 ') {
  const cases = document.getElementById('cases');
  const recovered = document.getElementById('recovered');
  const deaths = document.getElementById('deaths');

  cases.textContent =
    country.cases !== null
      ? `${flag} ${country.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
      : 'N/A 😔';
  recovered.textContent =
    country.recovered !== null
      ? country.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      : 'N/A 😔';
  deaths.textContent =
    country.deaths !== null
      ? country.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      : 'N/A 😔';

  const rPercent = document.getElementById('recoverPercent');
  const dPercent = document.getElementById('deathPercent');

  rPercent.textContent = `${((country.recovered / country.cases) * 100).toFixed(2)} %`;
  dPercent.textContent = `${((country.deaths / country.cases) * 100).toFixed(2)} %`;
}

const inputTouch = document.querySelectorAll('.onTouch');

inputTouch.forEach(e => {
  e.addEventListener('click', extractCountry, false);
});
