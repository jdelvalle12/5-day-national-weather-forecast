var nameInputEl = document.querySelector(".city-name");
var searchBtnEl = document.querySelector(".search-btn");
var currentWeatherContainerEl = document.querySelector("#weather-results");
var forecastContainerEl = document.querySelector("#forecast-results");






var cities = [];
var APIKey = "0a3422ed44f463b4f5d64da245e2cb6f";
var APIUrl = "https://api.openweathermap.org/data/2.5/weather?q={cityname}&appid={APIkey}&units=imperial";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + nameInputEl + "&appid=" + APIKey + "&units=imperial";
var iconURL = 'http://openweathermap.org/img/wn/' + icon + '.png';

function renderWeather(weather) {
console.log(weather);
	
	var resultsContainer = document.querySelector("#weather-results");

	var city = document.createElement("h1");
	city.textContent = weather.name;
	resultsContainer.append(city);

	var temp = document.createElement("p");
	temp.textContent = "Temp:" + weather.main.temp + "F";
	resultsContainer.append(temp);

	var humidity = document.createElement("p");
	humidity.textContent = "Humidity:" + weather.main.humidity + "%";
	resultsContainer.append(humidity);

	var wind = document.createElement("p");
	wind.textContent = "Wind:" + weather.wind.speed + "mph";
	resultsContainer.append(wind);

	//weatherInfo.append("")
};

//Fetch weather by city
async function getWeather(currentWeather) {
	var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Orlando&appid=0a3422ed44f463b4f5d64da245e2cb6f&units=imperial";

	var response = await fetch(queryURL)
	.then(function (response) {
			if (response.ok) {
				console.log(response);
				response.json().then(function (data) {
					console.log(data);
					renderWeather(data, currentWeather);
				});
			} else {
				alert("Error: " + response.statusText);
			}
		})
		.catch(function (error) {
			alert("Unable to get data");
		});
};
getWeather();

function renderForecast(forecast) {
	console.log(forecast);

	var resultsForecastContainerEl = document.querySelector("#forecast-results");

	var temp = document.createElement("p");
	temp.textContent = "Temp:" + forecast.main.temp + "F";
	resultsForecastContainerEl.append(temp);

	var humidity = document.createElement("p");
	humidity.textContent = "Humidity:" + forecast.main.humidity + "%";
	resultsForecastContainerEl.append(humidity);

	var wind = document.createElement("p");
	wind.textContent = "Wind Speed:" + forecast.wind.speed + "mph";
	resultsForecastContainerEl.append(wind);

	//weatherInfo.append("")
}

var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=Orlando&appid=0a3422ed44f463b4f5d64da245e2cb6f&units=imperial"
//Fetch weather forecast
async function getWeatherForecast(forecast) {
	var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=Orlando&appid=0a3422ed44f463b4f5d64da245e2cb6f&units=imperial";

	var forecast = await fetch(queryURL)
	.then(function (response) {
			if (response.ok) {
				console.log(response);
				response.json().then(function (data) {
					console.log(data);
					renderForecast(data, forecast);
				});
			} else {
				alert("Error: " + response.statusText);
			}
		})
		.catch(function (error) {
			alert("Unable to get data");
		});
};

getWeatherForecast();
 
function storeCity(cities) {
	var city = document.getElementById("cityInput").value;
	localStorage.setItem("cities", JSON.stringify(cities));
}
//console.log(storeCity);

var formSubmitHandler = function (event) {
	event.preventDefault();
	if (nameInputEl) {
		getWeather(nameInputEl);

		currentWeatherContainerEl.textContent = "";
		nameInputEl.value = "";
} else {
	alert("Please enter a city name");
}
};

var buttonClickHandler = function (event) {
	var city = event.target.getAttribute("city");

	if (city) {
		getFeaturedRepos(city);

		currentWeatherContainerEl.textContent = "";
	}
};

