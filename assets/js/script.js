var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var forecastContainerEl = document.querySelector("#forecast-container");
var forecast = document.querySelector("#forecast");
var timeDisplayEl = document.querySelector('#time-display');

var locations = [];

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

var displayForecast = function (city, forecast) {
	if (city.length === 0) {
		forecastContainerEl.textContent = "No forecast found.";
		return;
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

}

	getCity();
	//displayTime();
	//setInterval(displayTime, 1000);