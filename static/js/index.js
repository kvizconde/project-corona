window.onload = () => {
  document.getElementById('initialClick').click();
  bulmaMobile();
};

function bulmaMobile() {
  const width = document.documentElement.clientWidth;

  if (width < 512) {
    const bulmaElement = document.getElementById('bulmaSelect');
    const bulmaValue = document.getElementById('selectValue');

    bulmaElement.classList.remove('is-multiple');
    bulmaValue.removeAttribute('multiple');
    bulmaValue.size = 1;
  }
}

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

function extractValue() {
  let extract = document.getElementById('selectValue').value;

  extract = extract.replace(/'/g, '"');
  extract = extract.split(',');

  const extractCases = extract[1].split(': ')[1];
  const extractRecover = extract[5].split(': ')[1];
  const exctractDeaths = extract[3].split(': ')[1];
  const extractFlag = extract[12].split(' ')[1] || '🌎';

  const cases = document.getElementById('cases');
  const recovered = document.getElementById('recovered');
  const deaths = document.getElementById('deaths');

  cases.textContent =
    extractCases !== 'None'
      ? `${extractFlag} ${extractCases.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
      : 'N/A 😔';

  recovered.textContent =
    extractRecover !== 'None' ? extractRecover.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 'N/A 😔';
  deaths.textContent =
    exctractDeaths !== 'None' ? exctractDeaths.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 'N/A 😔';

  const rPercent = document.getElementById('recoverPercent');
  const dPercent = document.getElementById('deathPercent');

  rPercent.textContent = `${((extractRecover / extractCases) * 100 || 0).toFixed(2)} %`;
  dPercent.textContent = `${((exctractDeaths / extractCases) * 100 || 0).toFixed(2)} %`;
}
