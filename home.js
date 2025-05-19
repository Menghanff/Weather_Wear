document.addEventListener('DOMContentLoaded', function() {
  const searchBtn = document.getElementById('searchBtn');
  const gpsBtn = document.getElementById('gpsBtn');
  const locationInput = document.getElementById('locationInput');
  const weatherDashboard = document.getElementById('weatherDashboard');
  const recentSearches = document.getElementById('recentSearches');
  
  // Sample data - replace with actual API calls
  searchBtn.addEventListener('click', function() {
      const location = locationInput.value.trim();
      if (location) {
          fetchWeather(location);
      }
  });
  
  gpsBtn.addEventListener('click', function() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
              fetchWeather(`${position.coords.latitude},${position.coords.longitude}`);
          });
      } else {
          alert("Geolocation is not supported by your browser.");
      }
  });
  
  function fetchWeather(location) {
      // Simulate API call
      weatherDashboard.classList.remove('hidden');
      recentSearches.classList.remove('hidden');
      
      // Update UI with sample data
      document.getElementById('locationTitle').textContent = location;
      document.getElementById('currentTemp').textContent = '22';
      document.getElementById('feelsLike').textContent = 'Feels Like: 24°C';
      document.getElementById('humidity').textContent = 'Humidity: 65%';
      document.getElementById('windSpeed').textContent = '15 km/h';
      document.getElementById('precipitation').textContent = '10%';
      document.getElementById('uvIndex').textContent = '5 (Moderate)';
      document.getElementById('weatherDescription').textContent = 'Partly Cloudy';
      
      // Generate outfit recommendation
      generateOutfitRecommendation(22, 10, 15, 65);
      
      // Add to recent searches
      addRecentSearch(location);
  }
  
  function generateOutfitRecommendation(temp, precip, wind, humidity) {
      const outfitGrid = document.getElementById('outfitRecommendation');
      const weatherTips = document.getElementById('weatherTips');
      
      outfitGrid.innerHTML = '';
      weatherTips.innerHTML = '';
      
      // Upper body
      let upperBody = '';
      if (temp >= 28) {
          upperBody = '<i class="fas fa-tshirt"></i> Light T-shirt';
      } else if (temp >= 18) {
          upperBody = '<i class="fas fa-shirt"></i> T-shirt + Light Jacket';
      } else if (temp >= 8) {
          upperBody = '<i class="fas fa-jacket"></i> Warm Jacket';
      } else {
          upperBody = '<i class="fas fa-scarf"></i> Heavy Coat';
      }
      
      // Lower body
      let lowerBody = '';
      if (temp >= 20) {
          lowerBody = '<i class="fas fa-shorts"></i> Shorts';
      } else {
          lowerBody = '<i class="fas fa-pants"></i> Pants';
      }
      
      // Accessories
      let accessories = [];
      if (precip > 30) accessories.push('<i class="fas fa-umbrella"></i> Umbrella');
      if (wind > 20) accessories.push('<i class="fas fa-wind"></i> Windbreaker');
      if (temp < 10) accessories.push('<i class="fas fa-mitten"></i> Gloves');
      
      // Build outfit grid
      outfitGrid.innerHTML = `
          <div class="outfit-item">
              <i class="fas fa-arrow-up"></i>
              <h3>Upper Body</h3>
              <p>${upperBody}</p>
          </div>
          <div class="outfit-item">
              <i class="fas fa-arrow-down"></i>
              <h3>Lower Body</h3>
              <p>${lowerBody}</p>
          </div>
          <div class="outfit-item">
              <i class="fas fa-glasses"></i>
              <h3>Accessories</h3>
              <p>${accessories.join('<br>') || 'None needed'}</p>
          </div>
      `;
      
      // Add weather tips
      if (temp > 25 && humidity > 70) {
          weatherTips.innerHTML = '<p><i class="fas fa-temperature-high"></i> Hot and humid - wear breathable fabrics and stay hydrated!</p>';
      } else if (temp < 5) {
          weatherTips.innerHTML = '<p><i class="fas fa-temperature-low"></i> Very cold - layer up and cover exposed skin!</p>';
      }
  }
  
  function addRecentSearch(location) {
      // In a real app, you would save to localStorage
      const recentItems = document.getElementById('recentItems');
      const item = document.createElement('div');
      item.className = 'recent-item';
      item.textContent = location;
      item.addEventListener('click', () => {
          locationInput.value = location;
          fetchWeather(location);
      });
      recentItems.prepend(item);
  }
});





//refresh 
document.querySelector('.outfit-actions').addEventListener('click', function() {
  // This would regenerate the outfit in a real app
  const temp = parseFloat(document.getElementById('currentTemp').textContent);
  const precip = parseFloat(document.getElementById('precipitation').textContent);
  const wind = parseFloat(document.getElementById('windSpeed').textContent.split(' ')[0]);
  const humidity = parseFloat(document.getElementById('humidity').textContent.split('%')[0]);
  
  generateOutfitRecommendation(temp, precip, wind, humidity);
  
  // For demo purposes - rotate through sample images
  const outfitImages = [
      'https://imerikamarie.com/wp-content/uploads/2023/08/School-Outfit-Ideas.png',
      'https://images.squarespace-cdn.com/content/v1/66a25b02229bd8685eca9476/f81ca24d-6bfd-417a-a6ec-d936e614d103/Date+Night+Outfit+Ideas+-+Outdoor+Date+%28Sherpa+Jacket+%2B+Jeans%29.jpg',
      'https://images.squarespace-cdn.com/content/v1/66a25b02229bd8685eca9476/f81ca24d-6bfd-417a-a6ec-d936e614d103/Date+Night+Outfit+Ideas+-+Outdoor+Date+%28Sherpa+Jacket+%2B+Jeans%29.jpg'
  ];
  const currentSrc = document.querySelector('.outfit-image').src;
  const currentIndex = outfitImages.findIndex(img => currentSrc.includes(img));
  const nextIndex = (currentIndex + 1) % outfitImages.length;
  document.querySelector('.outfit-image').src = outfitImages[nextIndex];
});