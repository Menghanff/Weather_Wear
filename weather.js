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

    generateClothingRecommendation({ temperature, precip, wind_speed, humidity });
  }
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

function generateClothingRecommendation({ temperature, precip, wind_speed, humidity }) {
  const list = document.getElementById("recommendationList");
  list.innerHTML = "";

  if (temperature >= 28) {
    list.innerHTML += `
      <li>
        🧢 Wear light clothing like t-shirts and shorts<br>
        <img src="https://cdn-icons-png.flaticon.com/512/3210/3210104.png" alt="T-shirt" width="50">
        <img src="https://cdn-icons-png.flaticon.com/512/2093/2093798.png" alt="Shorts" width="50">
      </li>`;
  } else if (temperature >= 18) {
    list.innerHTML += `
      <li>
        👕 A t-shirt with jeans or light jacket is ideal<br>
        <img src="https://cdn-icons-png.flaticon.com/512/3210/3210104.png" alt="T-shirt" width="50">
        <img src="https://cdn-icons-png.flaticon.com/512/664/664466.png" alt="Jeans" width="50">
      </li>`;
  } else if (temperature >= 8) {
    list.innerHTML += `
      <li>
        🧥 Wear a warm jacket and long pants<br>
        <img src="https://cdn-icons-png.flaticon.com/512/892/892458.png" alt="Jacket" width="50">
        <img src="https://cdn-icons-png.flaticon.com/512/664/664466.png" alt="Pants" width="50">
      </li>`;
  } else {
    list.innerHTML += `
      <li>
        🧣 Bundle up with a coat, hat, and gloves<br>
        <img src="https://cdn-icons-png.flaticon.com/512/207/207687.png" alt="Coat" width="50">
        <img src="https://cdn-icons-png.flaticon.com/512/680/680348.png" alt="Hat" width="50">
        <img src="https://static.vecteezy.com/system/resources/previews/004/867/842/non_2x/protective-rubber-hypoallergenic-gloves-line-icon-free-vector.jpg" alt="Gloves" width="50">
      </li>`;
  }

  if (precip > 0.1) {
    list.innerHTML += `
      <li>
        🌧 Bring an umbrella or wear a raincoat<br>
        <img src="https://cdn-icons-png.flaticon.com/512/89/89762.png" alt="Umbrella" width="50">
        <img src="https://cdn-icons-png.flaticon.com/512/1965/1965183.png" alt="Raincoat" width="50">
      </li>`;
  }

  if (wind_speed > 20) {
    list.innerHTML += `
      <li>
        💨 Consider a windbreaker for strong wind<br>
        <img src="https://cdn-icons-png.flaticon.com/512/614/614281.png" alt="Windbreaker" width="50">
      </li>`;
  }

  if (humidity >= 80) {
    list.innerHTML += `
      <li>
        💦 High humidity — wear breathable fabrics<br>
        <img src="https://static.thenounproject.com/png/2384240-200.png" alt="Breathable Fabric" width="50">
      </li>`;
  }

  document.getElementById("recommendationSection").style.display = "block";
}


