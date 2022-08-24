import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
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
  //   refs.listCountriesEl.innerHTML = '';
  //   refs.infoOfCountryEl.innerHTML = '';

  fetchCountries(searchValue);
}

function fetchCountries(inputData) {
  fetch(`${URL_API}${inputData}?${FILTER_VALUES}`)
    .then(respons => {
      return respons.json();
    })
    .then(markup);
}

function markup(allCountries) {
  let amountOfCountries = allCountries.length;

  if (amountOfCountries > 10) {
    Notiflix.Notify.failure(
      'Too many matches found. Please enter a more specific name.'
    );
  }

  if (amountOfCountries >= 2 && amountOfCountries <= 10) {
    return markupListCountriesEl(allCountries);
  }

  //   markupItemCountryEl(allCountries);
}

// function noMarkupEl() {
//   alert('Too many matches found. Please enter a more specific name.');
// }

function markupListCountriesEl(countries) {
  const countriesmarkUp = countries
    .map(
      ({ name: { official }, flags: { svg } }) => `<li class="country-item">
      <img src="${svg}" alt="flag" width=70/>
      ${official}
    </li>`
    )
    .join('');

  refs.listCountriesEl.insertAdjacentHTML('beforeend', countriesmarkUp);
}

// function markupItemCountryEl({
//   name: { official },
//   capital,
//   population,
//   flags: { svg },
//   languages,
// }) {
//   const listOFLanguages = Object.values(languages);

//   const countrymarkUp = `<div class="country-info">
//             <h2 class="country-title">
//                 <img src="${svg}" alt="flag" class="country-img"/>
//                 ${official}
//             </h2>
//             <p class="country-text">Capital: ${capital}</p>
//             <p class="country-text">Population: ${population}</p>
//             <p class="country-text">Languages: ${listOFLanguages}</p>
//         </div>`;

//   refs.infoOfCountryEl.insertAdjacentHTML('beforeend', countrymarkUp);
// }
