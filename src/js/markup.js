export { markupListCountriesEl, markupItemCountryEl };

function markupListCountriesEl(countries) {
  return countries
    .map(
      ({ name: { official }, flags: { svg } }) => `<li class="country-item">
      <img src="${svg}" alt="flag" width=30/>
      <span class="country-item__name">${official}</span>
    </li>`
    )
    .join('');
}

function markupItemCountryEl({
  name: { official },
  capital,
  population,
  flags: { svg },
  languages,
}) {
  let listOFLanguages = Object.values(languages).join(', ');

  return `<div class="country-info">
            <h2 class="country-title">
                <img src="${svg}" alt="flag" class="country-img" width=30/>
                ${official}
            </h2>
            <p class="country-text"><b>Capital:</b> ${capital}</p>
            <p class="country-text"><b>Population:</b> ${population}</p>
            <p class="country-text"><b>Languages:</b> ${listOFLanguages}</p>
        </div>`;
}
