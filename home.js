document.getElementById("searchBtn").addEventListener("click", getWeather);

function getWeather() {
  const location = document.getElementById("location").value;
  const key = "YOUR_API_KEY"; // Replace with your Weatherstack key
  const url = `http://api.weatherstack.com/current?access_key=${key}&query=${location}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.success === false) {
        document.getElementById("weather-card").innerHTML = `<p>Error: ${data.error.info}</p>`;
        return;
      }

      const weatherHTML = `
        <h2>Weather in ${data.location.name}</h2>
        <p>Temperature: ${data.current.temperature}°C</p>
        <p>Feels Like: ${data.current.feelslike}°C</p>
        <p>Condition: ${data.current.weather_descriptions[0]}</p>
        <p>Humidity: ${data.current.humidity}%</p>
        <p>Wind Speed: ${data.current.wind_speed} km/h</p>
      `;
      document.getElementById("weather-card").innerHTML = weatherHTML;

      const temp = data.current.feelslike;
      const precip = data.current.precip;
      const uv = data.current.uv_index;

      let outfit = "";
      if (temp < 0) {
        outfit = "Heavy coat, gloves, and scarf.";
      } else if (temp < 10) {
        outfit = "Coat and layers recommended.";
      } else if (temp < 20) {
        outfit = "Light jacket and long sleeves.";
      } else if (temp < 30) {
        outfit = "T-shirt and pants or skirt.";
      } else {
        outfit = "Tank top, shorts, sunscreen.";
      }

      if (precip > 0.3) outfit += " Bring an umbrella.";
      if (uv > 5) outfit += " Use sunscreen or wear sunglasses.";

      document.getElementById("outfit-card").innerHTML = `<h3>What to Wear:</h3><p>${outfit}</p>`;
    })
    .catch(err => {
      document.getElementById("weather-card").innerHTML = `<p>Failed to fetch weather data.</p>`;
    });
}