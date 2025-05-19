Project Title:

WeatherWear

Description:

WeatherWear is a weather-responsive outfit recommendation web application. It uses real-time, forecast, and historical weather data to generate smart clothing suggestions based on temperature, humidity, wind speed, and precipitation.


Users can:
- Enter any location (city or ZIP code)
- Auto-detect location via IP
- View current weather conditions
- Check tomorrow’s forecast
- Retrieve historical weather for any date since 2008

The app dynamically displays personalized clothing advice alongside representative icons, helping users dress appropriately for the weather.
Target Browsers and Platforms
The application has been tested and optimized for:
- Google Chrome (Desktop and Mobile)
- Safari (iOS)
- Firefox (Desktop and Android)
- Microsoft Edge (Desktop)

The UI is fully responsive and mobile-friendly.
Developer Manual
This section is intended for future developers who will continue development on WeatherWear. It includes setup instructions, API documentation, known issues, and a roadmap.
Project Structure

weather-wear/
├── index.html           # Main entry point
├── style.css            # App styling
├── script.js            # App logic and API interaction
├── /docs/
│   └── README.md        # Developer documentation
├── /assets/             # Image or icon resources (if any)

Installation Instructions
1. Clone the repository:
   git clone https://github.com/your-team/weather-wear.git
   cd weather-wear
2. No build steps or package managers required – This is a static HTML/CSS/JS project.
3. Open the app:
   open index.html
   Or right-click the file and open it in your browser.
Running on a Server
For development testing on a local server (to avoid CORS issues or IP-based location limitations):

Using Python 3.x:
   python -m http.server 8000

Or using Node.js and http-server:
   npm install -g http-server
   http-server

Visit: http://localhost:8000
Weather API Integration
This project uses the Weatherstack API (https://weatherstack.com/). Sign up to get your API key and insert it in script.js:

const apiKey = "your_api_key_here";

Endpoints used:

/current?access_key=KEY&query=       [GET] Fetch current weather for a location
/forecast?access_key=KEY&query=&forecast_days=1   [GET] Fetch 1-day forecast
/historical?access_key=KEY&query=&historical_date=   [GET] Fetch weather for a specific date

Testing
No unit tests are currently implemented.

If expanding the project with a backend or more complex frontend logic, consider integrating:
- Jest for JS testing
- Cypress for UI testing
Known Bugs / Limitations:

•	- IP-based auto-location may be blocked on some networks or produce inaccurate city names.
•	- Historical forecast is limited to a single date per request due to API limitations.
•	- Forecast is limited to 1 day on the free Weatherstack plan.
•	- No offline mode support.
Roadmap for Future Development:

•	- Add 3-day and 7-day forecast support (API upgrade required)
•	- Add persistent recent searches (using localStorage or backend)
•	- Add user preferences (e.g., activity type, indoor/outdoor)
•	- Implement unit and integration tests
•	- Integrate geolocation API for precise coordinates
•	- Dark mode and accessibility improvements
•	- Package into a Progressive Web App (PWA)

Contact:
Please contact the original developer team via GitHub for any issues or questions.
