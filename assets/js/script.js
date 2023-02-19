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
var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`;

//function to render 
function renderSearchHistory() {
	searchHistoryContainer.innerHTML = "";

	for(var i = searchHistory.length -1; i>=0; i--) {
		var btn = document.createElement('button')
		btn.setAttribute('type', 'button')
		btn.setAttribute('class', 'history-btn')
		btn.setAttribute('data-search', searchHistory[i])
		btn.textContent = searchHistory[i]
		searchHistoryContainer.append(btn)
	}
}
//function to store city in local storage
function addToHistory(search) {
	if(searchHistory.indexOf(search) !== -1) {
		return;
	}
	searchHistory.push(search)
	localStorage.setItem('search-history', JSON.stringify(searchHistory))
	renderSearchHistory();
}
//function to get the city saved in local storage
function getHistory() {
	var history = localStorage.getItem('search-history')
	if(history) {
		searchHistory = JSON.parse(history)
	}
	renderSearchHistory();
}
//Function to render the data to get the current weather
function renderWeather(city, weather) {
console.log(city, weather);


	var date = dayjs().format('M/D/YYYY')
	var resultsContainer = document.querySelector("#weather-results");

	var city = document.createElement("h1").innerHTML = `${city}` + ' ' + `${date}`;
	city.textContent = `${city}` + `${date}`;
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

	var iconURL = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
	var icon = document.createElement("img");
	icon.setAttribute('src', iconURL) ;
	resultsContainer.append(icon);
	
};


//function to render the data for the forecast for the next five days
function renderForecast(forecast) {
console.log(forecast);	
	
	
	var fday = dayjs().format('M/D/YYYY');
	var forecastWeatherResults = document.querySelector(".forecast-weather-results");
	
	var fday = document.createElement("span").innerHTML = `${fday}`;
	fday.textContent = `${fday}`;
	forecastWeatherResults.append(fday);

	
	var ftemp = document.createElement("p");
	ftemp.textContent = "Temp:" + forecast.main.temp + "F";
	forecastWeatherResults.append(ftemp);
	
	
	var fhumidity = document.createElement("p");
	fhumidity.textContent = "Humidity:" + forecast.main.humidity + "%";
	forecastWeatherResults.append(fhumidity);
	
	var fwind = document.createElement("p");
	fwind.textContent = "Wind Speed:" + forecast.wind.speed + "mph";
	forecastWeatherResults.append(fwind);
	
	var iconURL = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
	var ficon = document.createElement("img");
	ficon.setAttribute('src', iconURL) ;
	forecastWeatherResults.append(ficon);
	
};

//function to display the five day forecast
function displayFiveDayForecast(forecast) {
	console.log(forecast); 
	forecastWeatherResults.innerHTML = "";
	
	for (var i = 0; i < forecast.length; i++) {
		var dayBlock = document.createElement('div')
		dayBlock.textContent('city', temp.name)
		dayBlock.textContent('weather', temp.weather[0].main)
		dayBlock.textContent('temp', temp.main.temp)
		dayBlock.textContent('humidity', humidity.main.humidity)
		dayBlock.textContent('wind', wind.speed.wind)
		icon.setAttribute('src', iconURL)
		dayBlock.setAttribute('display-data', forecastWeather[i])
		dayBlock.textContent = forecastWeather[i]
		forecastWeatherResults.append(dayBlock);
	};	
};
//function to render items for both the current weather and forecast
function renderItems(city, data) {
	//call function to render current weather
	renderWeather(city, data.list[0], data.city.timeZone);
	//call function to render forecast
	renderForecast(data.list[24], data.city.timeZone);
	
};		
//fetching weather data
function fetchWeather(location) {
	var {lat} = location;
	var {lon} = location;
	var city = location.name;
	var APIUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;
	fetch(APIUrl)
	.then(function(res){
		return res.json()
	}).then(function(data){
		renderItems(city, data)		
	})
	.catch(function(err){
		console.log(err)
	})
};
//fectching the data for coordinates of the city
function fetchCords(search) {
	var APIUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${APIKey}`;
	fetch(APIUrl)
	.then(function(res){
		return res.json()
	})
	.then(function(data){
		if(!data[0]){
			alert('location not found')
		}else {
			addToHistory(search)
			fetchWeather(data[0])
		}
	})
	.catch(function(err) {
		console.log(err)
	})
};

function renderCities() {
	var cityName = localStorage.getItem("cityName");

	if (!cityName === null ) {
		return;
	}
	userCitySpan.textContent = cityName;
}

searchBtnEl.addEventListener("click", function(event) {
	event.preventDefault();

var cityName = document.querySelector("#cityName").value;

	fetchCords(cityName)
});

