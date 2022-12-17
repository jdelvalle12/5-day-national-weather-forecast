var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var forecastContainerEl = document.querySelector("#forecast-container");
var forecastDisplayEl = document.querySelector("#forecast");
var timeDisplayEl = document.querySelector('.time-display');
var searchButtonEl = document.querySelector('.btn');

var city = [];

var apiKey = "0a3422ed44f463b4f5d64da245e2cb6f";
var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

var formSubmitHandler = function (event) {
	event.preventDefault();

	var city = cityInputEl.value.trim();

	if (city) {
		getCity(city);

		forecastContainerEl.textContent = "";
		cityInputEl.value = "";
	} else {
		alert("Please enter a city");
	}
};

var getCity = function (city) {
	var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=city&appid=0a3422ed44f463b4f5d64da245e2cb6f";

	fetch(apiUrl)
		.then(function (response) {
			if (response.ok) {
				console.log(response);
				response.json().then(function (data) {
					console.log(data);
					displayForecast(data, city);
				});
			} else {
				alert("Error: " + response.statusText);
			}
		})
};

function readCityFromStorage() {
	var cities = localStorage.getItem('cities');
	if (cities) {
	  cities = JSON.parse(cities);
	} else {
	  cities = [];
	}
	return cities;
  }
  
  // Takes an array of projects and saves them in localStorage.
  function saveCityToStorage(cities) {
	localStorage.setItem('cities', JSON.stringify(cities));
  }
  
  // Gets city data from local storage and displays it
  function printCityData() {
	  
	// get cities from localStorage
	var cities = readCityFromStorage();
  
	// loop through each city 
	for (var i = 0; i < cities.length; i += 1) {
	  var city = cities[i];
	  
	}
var displayForecast = function (city, forecast) {
	if (forecast.length === 0) {
		forecastContainerEl.textContent = "No forecast found.";
		return;
	}
}
	forecastContainerEl.textContent = forecast;

	for (var i = 0; i < city.length; i++) {
		var cityName = cities[i];

		var cityEl = document.createElement("a");
		

		var titleEl = document.createElement("span");
		titleEl.textContent = cityName;

		cityEl.appendChild(titleEl);

		var statusEl = document.createElement("span");
		statusEl.classList = "flex-row align-center";

		cityEl.appendChild(statusEl);

		forecastContainerEl.appendChild(cityEl);
	}

};

	getCity();
	searchButtonEl.addEventListener("submit", getCity);
	