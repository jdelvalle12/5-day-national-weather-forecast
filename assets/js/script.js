var cityInputEl = document.querySelector("#cityName");
var resultsContainer = document.querySelector("#weather-results");
var resultsForecastWeatherContainer = document.querySelector(".forecast-weather-results");
// var dateDisplayEl = document.querySelector(".current-date");
var searchBtnEl = document.querySelector('.search-btn');
var searchHistoryContainer = document.querySelector('#history');
var forecastWeatherResults = document.querySelector('.forecast-weather-results');
var searchHistory = [];
var city = [];
var forecast = [];
var date = [];


var APIKey = "0a3422ed44f463b4f5d64da245e2cb6f";
var queryURL = `https://api.openweathermap.org/data/2.5/weather?appid=${APIKey}&units=imperial&q=`;

var queryURLForecast = `https://api.openweathermap.org/data/2.5/forecast?appid=${APIKey}&units=imperial&q=`;

// Get current date and time
if (dateDisplayEl) {
	var currentDate = dayjs().format('dddd, MMMM D, YYYY');
	dateDisplayEl.innerHTML = `${currentDate}`;
  }


// Get search history from local storage
function getSearchHistory() {
  var storedSearchHistory = localStorage.getItem('searchHistory');
  if (storedSearchHistory) {
    searchHistory = JSON.parse(storedSearchHistory);
    renderSearchHistory();
  }
}

// Render search history
function renderSearchHistory() {
  searchHistoryContainer.innerHTML = '';
  for (var i = 0; i < searchHistory.length; i++) {
    var city = searchHistory[i];
    var li = document.createElement('li');
    li.textContent = city;
    li.setAttribute('data-city', city);
    li.setAttribute('class', 'list-group-item');
    searchHistoryContainer.appendChild(li);
  }
}

// Save search history to local storage
function saveSearchHistory(city) {
  if (searchHistory.indexOf(city) === -1) {
    searchHistory.push(city);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    renderSearchHistory();
  }
}

// Get current weather and display it on the page
function getCurrentWeather(city) {
  var queryURLWithCity = queryURL + city;
  fetch(queryURLWithCity)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      resultsContainer.innerHTML = '';
      cityInputEl.value = '';
      var cityName = data.name;
      var temp = data.main.temp;
      var humidity = data.main.humidity;
      var windSpeed = data.wind.speed;
      var weatherIcon = data.weather[0].icon;
      var weatherDescription = data.weather[0].description;
      var weatherIconUrl = `https://openweathermap.org/img/w/${weatherIcon}.png`;

      var cityEl = document.createElement('h2');
      var tempEl = document.createElement('p');
      var humidityEl = document.createElement('p');
      var windEl = document.createElement('p');
      var weatherIconEl = document.createElement('img');
      var weatherDescriptionEl = document.createElement('p');

      cityEl.textContent = cityName;
      tempEl.textContent = `Temperature: ${temp}°F`;
      humidityEl.textContent = `Humidity: ${humidity}%`;
      windEl.textContent = `Wind Speed: ${windSpeed} MPH`;
      weatherIconEl.setAttribute('src', weatherIconUrl);
      weatherDescriptionEl.textContent = weatherDescription;

      resultsContainer.appendChild(cityEl);
      resultsContainer.appendChild(tempEl);
      resultsContainer.appendChild(humidityEl);
      resultsContainer.appendChild(windEl);
      resultsContainer.appendChild(weatherIconEl);
      resultsContainer.appendChild(weatherDescriptionEl);
	});
};

// Get 5-day forecast and display it on the page
function getFiveDayForecast(city) {
	var queryURLWithCity = queryURLForecast + city;
	fetch(queryURLWithCity)
	  .then(function(response) {
		return response.json();
	  })
	  .then(function(data) {
		resultsForecastContainer.innerHTML = '';
		var forecastArray = data.list;
		for (var i = 0; i < forecastArray.length; i++) {
		  var forecastObj = forecastArray[i];
		  var forecastDate = forecastObj.dt_txt.split(' ')[0];
		  var forecastTime = forecastObj.dt_txt.split(' ')[1];
		  if (forecastTime === '12:00:00') {
			var forecastTemp = forecastObj.main.temp;
			var forecastHumidity = forecastObj.main.humidity;
			var forecastWind = forecastObj.wind.speed;
			var forecastIcon = forecastObj.weather[0].icon;
			var forecastIconUrl = `https://openweathermap.org/img/w/${forecastIcon}.png`;
  
			var forecastCardEl = document.createElement('div');
			forecastCardEl.setAttribute('class', 'card forecast-card');
  
			var forecastDateEl = document.createElement('h5');
			forecastDateEl.textContent = dayjs(forecastDate).format('ddd, MMM D');
  
			var forecastIconEl = document.createElement('img');
			forecastIconEl.setAttribute('src', forecastIconUrl);
  
			var forecastTempEl = document.createElement('p');
			forecastTempEl.textContent = `Temp: ${forecastTemp}°F`;
  
			var forecastHumidityEl = document.createElement('p');
			forecastHumidityEl.textContent = `Humidity: ${forecastHumidity}%`;

			var forecastWindEl = document.createElement('p');
			forecastWindEl.textContent = `Wind: ${forecastWind}MPH`;
  
			forecastCardEl.appendChild(forecastDateEl);
			forecastCardEl.appendChild(forecastIconEl);
			forecastCardEl.appendChild(forecastTempEl);
			forecastCardEl.appendChild(forecastHumidityEl);
			forecastCardEl.appendChild(forecastWindEl);

			resultsForecastContainer.appendChild(forecastCardEl);
		  }
		}
	  });
  }
  
  // Handle search button click event
  searchBtnEl.addEventListener('click', function(event) {
	event.preventDefault();
	var city = cityInputEl.value.trim();
	if (city) {
	  saveSearchHistory(city);
	  getCurrentWeather(city);
	  getFiveDayForecast(city);
	}
  });
  
  // Handle search history click event
  searchHistoryContainer.addEventListener('click', function(event) {
	var city = event.target.getAttribute('data-city');
	if (city) {
	  getCurrentWeather(city);
	  getFiveDayForecast(city);
	}
  });
  
  // Initialize the app
  getSearchHistory();
  if (searchHistory.length > 0) {
	var lastSearchedCity = searchHistory[searchHistory.length - 1];
	getCurrentWeather(lastSearchedCity);
	getFiveDayForecast(lastSearchedCity);
  };


