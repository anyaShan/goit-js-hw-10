export { fetchCountries };

function fetchCountries(name) {
  const URL_API = `https://restcountries.com/v3.1/name/`;
  const FILTER_VALUES = `fields=name,capital,population,flags,languages`;

  return fetch(`${URL_API}${name}?${FILTER_VALUES}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
