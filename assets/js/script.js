var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var forecastContainerEl = document.querySelector("#forecast-container");
var forecastDisplayEl = document.querySelector("#forecast");
var searchButtonEl = document.querySelector('.btn');

var city = [];
//var randomCity = city(Math.floor(Math.random() * city.length));

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
//console.log(formSubmitHandler);

var buttonClickHandler = function (event) {
	var forecast = event.target.getAttribute("data-forecast");

	if (forecast) {
		getFeaturedCity(forecast);

		forecastContainerEl.textContent = "";
	}
};
//console.log(buttonClickHandler);

fetch("http://api.openweathermap.org/data/2.5/forecast?q=city&appid=0a3422ed44f463b4f5d64da245e2cb6f", {
	method: "GET",
	cache: "reload",
})
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		console.log(data);
	});
	

function renderCityFromStorage() {
	var cities = localStorage.getItem('cities');
	if (cities) {
	  cities = JSON.parse(cities);
	} else {
	  cities = [];
	}
	return cities;
  }
  console.log(renderCityFromStorage);
  
  function saveCityToStorage(cities) {
	localStorage.setItem('cities', JSON.stringify(cities));
  }
  
  
  function printCityData() {
	  
	
	var cities = renderCityFromStorage();
  
	 
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

	renderCityFromStorage();
	//displayForecast();
	//getCity();
	//searchButtonEl.addEventListener("submit", getCity);
	