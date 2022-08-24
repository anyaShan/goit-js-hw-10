import debounce from 'lodash.debounce';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const URL_API = `https://restcountries.com/v3.1/name/`;
const FILTER_VALUES = `fields=name,capital,population,flags,languages`;

const refs = {
  searchEl: document.querySelector('#search-box'),
  listCountriesEl: document.querySelector('.country-list'),
  infoOfCountryEl: document.querySelector('.country-info'),
};

refs.searchEl.addEventListener('input', onSearch);

function onSearch(event) {
  event.preventDefault();

  const searchValue = event.currentTarget.value;
  fetchCountries(searchValue);
}

function fetchCountries(name) {
  fetch(`${URL_API}${name}?${FILTER_VALUES}`)
    .then(respons => {
      return respons.json();
    })
    .then(markup);
}

function markup(allCountries) {
  let amountOfCountries = allCountries.length;

  if (amountOfCountries > 10) {
    return alert('Too many matches found. Please enter a more specific name.');
  }

  if (amountOfCountries >= 2 && amountOfCountries <= 10) {
    return markupListCountriesEl(countries);
  }
}

// function noMarkupEl() {
//   alert('Too many matches found. Please enter a more specific name.');
// }

function markupListCountriesEl(countries) {
  return countries
    .map(
      ({ name: { official }, flags: { svg } }) => `<li class="country-item">
      <img src="${svg}" alt="flag"/>
      ${official}
    </li>`
    )
    .join('');
}
// refs.listCountriesEl.insertAdjacentHTML('beforeend', markupListCountriesEl);

// function markupItemCountryEl({
//   name: { official },
//   capital,
//   population,
//   flags: { svg },
//   languages,
// }) {
//   const listOFLanguages = Object.values(languages);

//   return `<div class="country-info">
//             <h2 class="country-title">
//                 <img src="${svg}" alt="flag" class="country-img"/>
//                 ${official}
//             </h2>
//             <p class="country-text">Capital: ${capital}</p>
//             <p class="country-text">Population: ${population}</p>
//             <p class="country-text">Languages: ${listOFLanguages}</p>
//         </div>`;
// }

// refs.infoOfCountryEl.insertAdjacentHTML('beforeend', markupItemCountryEl);
