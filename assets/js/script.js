var cityInputEl = document.querySelector("#cityName");
var currentWeatherContainerEl = document.querySelector("#weather-results");
var forecastContainerEl = document.querySelector("#forecast-results");
var dateDisplayEl = document.querySelector(".current-date");
var searchBtnEl = document.querySelector('.search');

var cities = 0;

var APIKey = "0a3422ed44f463b4f5d64da245e2cb6f";
var APIUrl = "https://api.openweathermap.org/data/2.5/weather?q=city&appid=APIkey&units=imperial";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
var iconURL = 'http://openweathermap.org/img/wn/icon.png';

function displayDate() {
	var rightNow = dayjs().format('M/D/YYYY');
	dateDisplayEl.textContent(rightNow);
}


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

function renderWeatherForecast(forecast) {
	console.log(forecast);

	var resultsForecastContainerEl = document.querySelector("#forecast-results");

	var fTemp = document.createElement("p");
	fTemp.textContent = "Temp:" + forecast.main.fTemp + "F";
	resultsForecastContainerEl.append(fTemp);

	var fHumidity = document.createElement("p");
	fHumidity.textContent = "Humidity:" + forecast.main.fHumidity + "%";
	resultsForecastContainerEl.append(fHumidity);

	var fWind = document.createElement("p");
	fWind.textContent = "Wind Speed:" + forecast.fWind.speed + "mph";
	resultsForecastContainerEl.append(fWind);

	//weatherInfo.append("")
}

var lat = " ";
var lon = " ";
var APIUrlForecast = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}&units=imperial"
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";
//Fetch weather forecast
async function getWeatherForecast(fiveDayForecast) {
	var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=Orlando&appid=0a3422ed44f463b4f5d64da245e2cb6f&units=imperial";

	var response = await fetch(queryURL)
	.then(function (response) {
			if (response.ok) {
				console.log(response);
				response.json().then(function (data) {
					console.log(data);
					renderWeatherForecast(data, fiveDayForecast);
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
 
function displayMessage(type, message) {
	msgDiv.textContent = message;
	msgDiv.setAttribute("class", type);
}

function renderCities() {
	var cityName = localStorage.getItem("cityName");

	if (!cityName || !weather) {
		return;
	}
	userCitySpan.textContent = cityName;
}



