import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { fetchCountries } from './js/fetchCountries';
import { markupListCountriesEl, markupItemCountryEl } from './js/markup';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchEl: document.querySelector('#search-box'),
  listCountriesEl: document.querySelector('.country-list'),
  infoOfCountryEl: document.querySelector('.country-info'),
};

refs.searchEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  event.preventDefault();

  const searchValue = refs.searchEl.value.trim();

  refs.listCountriesEl.innerHTML = '';
  refs.infoOfCountryEl.innerHTML = '';

  fetchCountries(searchValue).then(markup).catch(error);
}
function markup(allCountries) {
  let amountOfCountries = allCountries.length;

  if (amountOfCountries > 10) {
    return noMarkupEl();
  }

  if (amountOfCountries > 1 && amountOfCountries <= 10) {
    return renderListCountries(allCountries);
  }

  renderItemCountry(allCountries);
}

function renderListCountries(allCountries) {
  refs.infoOfCountryEl.innerHTML = '';

  const markupListOfCountries = markupListCountriesEl(allCountries);

  refs.listCountriesEl.insertAdjacentHTML('beforeend', markupListOfCountries);
}

function renderItemCountry(allCountries) {
  refs.listCountriesEl.innerHTML = '';

  const country = allCountries[0];

  const markupOfCountry = markupItemCountryEl(country);

  refs.infoOfCountryEl.insertAdjacentHTML('beforeend', markupOfCountry);
}

function noMarkupEl() {
  Notiflix.Notify.failure(
    'Too many matches found. Please enter a more specific name.'
  );
}

function error() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

// function markup(allCountries) {
//   let amountOfCountries = allCountries.length;

//   allCountries.map(country => {
//     if (amountOfCountries === 1) {
//       const markupOfCountry = markupItemCountryEl(country);
//       renderItemCountry(markupOfCountry);
//     } else if (amountOfCountries > 1) {
//       const markupListOfCountries = markupListCountriesEl(country);
//       renderListCountries(markupListOfCountries);
//     } else if (amountOfCountries > 10) {
//       noMarkupEl();
//     }
//   });
// }

// function renderListCountries(markupListOfCountries) {
//   refs.infoOfCountryEl.innerHTML = '';
//   refs.listCountriesEl.insertAdjacentHTML('beforeend', markupListOfCountries);
// }

// function renderItemCountry(markupOfCountry) {
//   refs.listCountriesEl.innerHTML = '';
//   refs.infoOfCountryEl.insertAdjacentHTML('beforeend', markupOfCountry);
// }

// function noMarkupEl() {
//   Notiflix.Notify.failure(
//     'Too many matches found. Please enter a more specific name.'
//   );
// }

// function error() {
//   Notiflix.Notify.failure('Oops, there is no country with that name');
// }
