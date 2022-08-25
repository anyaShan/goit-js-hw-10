export { markupListCountriesEl, markupItemCountryEl };

function markupListCountriesEl(countries) {
  return countries
    .map(
      ({ name: { official }, flags: { svg } }) => `<li class="country-item">
      <img src="${svg}" alt="flag" width=30/>
      <p class="country-item__name">${official}</p>
    </li>`
    )
    .join('');
}

// function markupListCountriesEl({ name: { official }, flags: { svg } }) {
//   return `<li class="country-item">
//       <img src="${svg}" alt="flag" width=30/>
//       <p class="country-item__name">${official}</p>
//     </li>`;
// }

function markupItemCountryEl({
  name: { official },
  capital,
  population,
  flags: { svg },
  languages,
}) {
  let listOFLanguages = Object.values(languages);

  return `<div class="country-info">
            <h2 class="country-title">
                <img src="${svg}" alt="flag" class="country-img" width=30/>
                ${official}
            </h2>
            <p class="country-text">Capital: ${capital}</p>
            <p class="country-text">Population: ${population}</p>
            <p class="country-text">Languages: ${listOFLanguages}</p>
        </div>`;
}
