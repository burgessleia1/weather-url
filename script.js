// weather-header.js

const apiKey = "b1122ec5871b8915791ca0070108b396";
const city = "tooele"; // You can change this to your city

// Weather API URL
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

// Fetch weather data
fetch(weatherURL)
  .then(response => response.json())
  .then(jsObject => {
    console.log(jsObject); // optional: check your data in console
    displayWeather(jsObject);
  })
  .catch(error => console.error("Error fetching weather data:", error));

function displayWeather(jsObject) {
  // Get elements from HTML
  const stats = document.querySelector("#stats");
  const summary = document.querySelector("#summary");
  const desc = document.querySelector("#current-desc");
  const temp = document.querySelector("#current-temp");
  const humid = document.querySelector("#current-humid");
  const windSpeed = document.querySelector("#current-windSpeed");
  const windChill = document.querySelector("#current-windChill");

  // Assign data from API
  summary.textContent = `Current weather in ${jsObject.name}`;
  desc.textContent = jsObject.weather[0].description;
  temp.textContent = `${Math.round(jsObject.main.temp)}°F`;
  humid.textContent = `Humidity: ${jsObject.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${jsObject.wind.speed} mph`;

  // Calculate and display wind chill
  const chill = calculateWindChill(jsObject.main.temp, jsObject.wind.speed);
  windChill.textContent = chill ? `Wind Chill: ${chill}°F` : "Wind Chill: N/A";

  // Optional: display all stats inside one container (cleanly)
  stats.innerHTML = `
    <h2>Current Weather in ${jsObject.name}</h2>
    <p>${jsObject.weather[0].description}</p>
    <p>Temperature: ${Math.round(jsObject.main.temp)}°F</p>
    <p>Humidity: ${jsObject.main.humidity}%</p>
    <p>Wind Speed: ${jsObject.wind.speed} mph</p>
    <p>${chill ? `Wind Chill: ${chill}°F` : "Wind Chill: N/A"}</p>
  `;
}

// Formula for Wind Chill (US National Weather Service)
function calculateWindChill(temp, windSpeed) {
  if (temp <= 50 && windSpeed > 3) {
    const chill = 35.74 + (0.6215 * temp) - (35.75 * (windSpeed ** 0.16)) + (0.4275 * temp * (windSpeed ** 0.16));
    return Math.round(chill);
  } else {
    return null;
  }
}

const newsApiKey = '60993872ddb349b49c4c31e96f0825d9';  
const newsUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`;

async function fetchNews() {
  try {
    const response = await fetch(newsUrl);
    const data = await response.json();
    if (data.articles) {
      displayNews(data.articles);
    }
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}


// Dynamic Footer Year
const year = new Date().getFullYear();
document.querySelector("#footer").textContent = `© ${year} Weather & News App`;
