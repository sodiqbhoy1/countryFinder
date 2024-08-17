const searchBtn = document.getElementById("searchBtn");
const inputContainer = document.querySelector(".input-container");

searchBtn.addEventListener("click", () => {
  const error = document.getElementById("error");
  const cityName = document.getElementById("city").value.trim();
  const result = document.getElementById("result");
  const loader = document.getElementById("loader");

  result.innerHTML = "";
  result.style.opacity = 0;
  error.textContent = "";

  if (cityName === "") {
    error.textContent = "Input cannot be empty";
    return;
  }

  loader.style.display = "flex";
  inputContainer.style.display = "none";

  const url = `https://restcountries.com/v3.1/name/${cityName}?fullText=true`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      loader.style.display = "none";

      if (data.status === 404) {
        error.textContent = "Country not found";
        inputContainer.style.display = "flex";
        return;
      }

      const country = data[0];
      result.innerHTML = `
                <div class="card">
                    <div class="flag">
                        <img src="${country.flags.svg}" alt="Flag">
                        <img src="${country.coatOfArms.svg}" alt="Coat of Arms">
                    </div>
                    <h2 class="country">${country.name.common}</h2>
                    <p>Capital: <span>${country.capital}</span></p>
                    <p>Population: <span>${country.population.toLocaleString()}</span></p>
                    <p>Continent: <span>${country.continents}</span></p>
                    <p>Currency: <span>${
                      country.currencies[Object.keys(country.currencies)[0]]
                        .name
                    }</span></p>
                    <p>Currency Symbol: <span>${
                      country.currencies[Object.keys(country.currencies)[0]]
                        .symbol
                    }</span></p>
                    <p>Official Language(s): <span>${Object.values(
                      country.languages
                    ).join(", ")}</span></p>
                </div>
            `;
      result.style.opacity = 1;
    })
    .catch(() => {
      loader.style.display = "none";
      inputContainer.style.display = "flex";
      error.textContent = "Something went wrong. Please try again later.";
    });
});
