**Overview**
  This is a weather forecasting web application built using React, where users can search for cities and view both the current weather and a 5-day forecast. The data is fetched from the    OpenWeatherMap API. The application also features an infinite scroll city table, sorting, filtering, and the ability to navigate to detailed weather pages for specific cities.

**Features**
  City Search and Selection: Search cities with dynamic filtering and infinite scroll to browse results.
  Weather Information: View the current weather data (temperature, humidity, wind speed, etc.) for any selected city.
  5-Day Forecast: See the forecast for the next 5 days.
  Interactive Table: Sort, filter, and explore cities with dynamic content loading.
  Responsive Navigation: Left-click to view weather details in the same tab, or right-click to open in a new tab.
  Weather Icons: Displays relevant icons for different weather conditions.
  
**Technologies Used**
  React: Frontend JavaScript library for building user interfaces.
  React Router: For routing between different pages of the application.
  Axios: To fetch data from the OpenWeatherMap API and city dataset.
  InfiniteScroll: For dynamically loading more cities as the user scrolls.
  OpenWeatherMap API: Source of weather data.
  CSS: For styling the application.

**Installation:**
**11.Clone the repository:**
    git clone https://github.com/singaramdivya/weatherreactapp.git
    
**2.Navigate to the project directory:**
    cd weather-app
**3.Install dependencies:**
    npm install
**Get your API key from OpenWeatherMap and replace the value of API_KEY in the WeatherPage component.**

**Start the development server:**
    npm start
Open your browser and go to http://localhost:3000.

**App.js:** Main component where routes are defined.
**CitiesTable.js:** Displays the list of cities with infinite scroll, sorting, filtering, and navigation.
**WeatherPage.js:** Fetches and displays current weather and 5-day forecast for the selected city.
**style.css:** Contains all styles for the application.

**Usage**:

**City Search and Filtering** 
-> You can search cities using the input field at the top.
-> Infinite scrolling allows you to load more cities as you scroll down.
-> Click on column headers to sort cities by name, country, or timezone.
-> Use the filter dropdowns to filter cities by name, country, or timezone.

**Viewing Weather**
-> Select a city from the table to view its current weather data and 5-day forecast.
-> Navigate to the weather page by either left-clicking (opens in same tab) or right-clicking (opens in a new tab).

**API Information**
-> OpenWeatherMap API
-> The weather data is fetched from OpenWeatherMap using two API endpoints:
    Current Weather: https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric
    5-Day Forecast: https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric
    Make sure to replace {city} with the desired city name and {API_KEY} with your OpenWeatherMap API key.

**City Data API**
  City data (used in the city search table) is fetched from the public dataset:
  Cities with Population Over 1000: https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q={searchTerm}&start={start}&rows=20

