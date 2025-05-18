const apiKey = "ff77221635c55c688bf3942493dd1919";
const resultDiv = document.getElementById("weatherResult");
const form = document.getElementById("weatherForm");
const input = document.getElementById("locationInput");
const autoFetchBtn = document.getElementById("autoFetchBtn");
const forecastBtn = document.getElementById("forecastBtn");
const historyBtn = document.getElementById("historyBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = input.value.trim();
  if (location) {
    await getWeather(location);
  }
});

autoFetchBtn.addEventListener("click", async () => {
  await getWeather("fetch:ip");
});

forecastBtn.addEventListener("click", async () => {
  const location = input.value.trim();
  if (location) {
    await getForecast(location);
  } else {
    await getForecast("fetch:ip");
  }
});

historyBtn.addEventListener("click", async () => {
  const location = input.value.trim();
  const date = prompt("Enter date in YYYY-MM-DD format (after 2008-07-01):");
  if (location && date) {
    await getHistorical(location, date);
  } else {
    alert("Please enter a valid location and date.");
  }
});

async function getWeather(query) {
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(query)}&units=m`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayWeather(data, "Current Weather");
  } catch (err) {
    showError(err);
  }
}

async function getForecast(query) {
  const url = `http://api.weatherstack.com/forecast?access_key=${apiKey}&query=${encodeURIComponent(query)}&forecast_days=1&units=m`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const date = Object.keys(data.forecast)[0];
    const forecast = data.forecast[date];
    displayForecast(data.location, forecast, date);
  } catch (err) {
    showError(err);
  }
}

async function getHistorical(query, date) {
  const url = `http://api.weatherstack.com/historical?access_key=${apiKey}&query=${encodeURIComponent(query)}&historical_date=${date}&hourly=1&units=m`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const history = data.historical[date];
    displayHistorical(data.location, history, date);
  } catch (err) {
    showError(err);
  }
}

function displayWeather(data, title) {
  if (data.error) {
    resultDiv.innerHTML = `<p>Error: ${data.error.info}</p>`;
  } else {
    const { name, country, region, localtime } = data.location;
    const {
      temperature, feelslike, humidity, uv_index, weather_descriptions,
      weather_icons, wind_speed, precip, pressure, visibility
    } = data.current;

    resultDiv.innerHTML = `
      <h3>${title} - ${name}, ${region}, ${country}</h3>
      <p><strong>Local Time:</strong> ${localtime}</p>
      <p><img src="${weather_icons[0]}" alt="${weather_descriptions[0]}"/> ${weather_descriptions[0]}</p>
      <p><strong>Temperature:</strong> ${temperature}°C</p>
      <p><strong>Feels Like:</strong> ${feelslike}°C</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Wind Speed:</strong> ${wind_speed} km/h</p>
      <p><strong>Precipitation:</strong> ${precip} mm</p>
      <p><strong>UV Index:</strong> ${uv_index}</p>
      <p><strong>Pressure:</strong> ${pressure} mb</p>
      <p><strong>Visibility:</strong> ${visibility} km</p>
    `;
  }
  resultDiv.style.display = "block";
}

function displayForecast(location, forecast, date) {
  resultDiv.innerHTML = `
    <h3>Forecast for ${location.name}, ${location.country} on ${date}</h3>
    <p><strong>Avg Temp:</strong> ${forecast.avgtemp}°C</p>
    <p><strong>Min Temp:</strong> ${forecast.mintemp}°C</p>
    <p><strong>Max Temp:</strong> ${forecast.maxtemp}°C</p>
    <p><strong>UV Index:</strong> ${forecast.uv_index}</p>
    <p><strong>Sunrise:</strong> ${forecast.astro.sunrise}</p>
    <p><strong>Sunset:</strong> ${forecast.astro.sunset}</p>
  `;
  resultDiv.style.display = "block";
}

function displayHistorical(location, history, date) {
  resultDiv.innerHTML = `
    <h3>Historical Weather for ${location.name}, ${location.country} on ${date}</h3>
    <p><strong>Avg Temp:</strong> ${history.avgtemp}°C</p>
    <p><strong>Min Temp:</strong> ${history.mintemp}°C</p>
    <p><strong>Max Temp:</strong> ${history.maxtemp}°C</p>
    <p><strong>Sunrise:</strong> ${history.astro.sunrise}</p>
    <p><strong>Sunset:</strong> ${history.astro.sunset}</p>
  `;
  resultDiv.style.display = "block";
}

function showError(err) {
  resultDiv.innerHTML = `<p>Error fetching data. Please try again.</p>`;
  resultDiv.style.display = "block";
  console.error(err);
}
