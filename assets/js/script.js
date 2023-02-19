var cityInputEl = document.querySelector("#cityName");
var resultsContainer = document.querySelector("#weather-results");
var resultsForecastWeatherContainer = document.querySelector(".forecast-weather-results");
// var dateDisplayEl = document.querySelector(".current-date");
var searchBtnEl = document.querySelector('.search-btn');
var searchHistoryContainer = document.querySelector('#history');
var fiveDayForecastContainer = document.querySelector('.div');
var searchHistory = [];
var city = [];
var forecast = [];

var APIKey = "0a3422ed44f463b4f5d64da245e2cb6f";
var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`;
//var iconURL = "http://openweathermap.org/img/wn/" + icon + ".png";

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

function addToHistory(search) {
	if(searchHistory.indexOf(search) !== -1) {
		return;
	}
	searchHistory.push(search)
	localStorage.setItem('search-history', JSON.stringify(searchHistory))
	renderSearchHistory();
}

function getHistory() {
	var history = localStorage.getItem('search-history')
	if(history) {
		searchHistory = JSON.parse(history)
	}
	renderSearchHistory();
}

function renderWeather(city, weather) {
console.log(weather);


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



function renderForecast(forecast) {
// console.log(forecast);	
	
	var fday = dayjs().format('M/D/YYYY');
	var resultsForecastWeatherContainer = document.querySelector(".forecast-weather-results");
	
	var fday = document.createElement("h1").innerHTML = `${fday}`;
	fday.textContent = `${fday}`;
	resultsForecastWeatherContainer.append(fday);
	
	var ftemp = document.createElement("p");
	ftemp.textContent = "Temp:" + forecast.main.temp + "F";
	resultsForecastWeatherContainer.append(ftemp);
	
	var fhumidity = document.createElement("p");
	fhumidity.textContent = "Humidity:" + forecast.main.humidity + "%";
	resultsForecastWeatherContainer.append(fhumidity);
	
	var fwind = document.createElement("p");
	fwind.textContent = "Wind Speed:" + forecast.wind.speed + "mph";
	resultsForecastWeatherContainer.append(fwind);

	var iconURL = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
	var ficon = document.createElement("img");
	ficon.setAttribute('src', iconURL) ;
	resultsForecastWeatherContainer.append(ficon);
	
};

function displayFiveDayForecast(forecast) {
	console.log(forecast); 
	resultsForecastWeatherContainer.innerHTML = "";
	
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
		resultsForecastWeatherContainer.append(dayBlock);
		
		};	
	};

// 	for (var i = forecast.length + 5; i > 0; i++) {
// 	for (var i = 1; i < data.list.length; i++) {
// 		var date = data.list[i].dt_txt.indexOf(dayjs().format('M/D/YYYY'));
// 		if (date > -1) {
// 			temp.push( data.list[i].main.temp);
// 			humidity.push( data.list[i].main.humidity);
// 			wind.push(data.list[i].wind.speed);
// 			icon.push(date.list[i].forecast[0].id);
// 			}
// 		};	
// 	};
// }


	// forecast.eachDay(days) 
	// var date = dayjs().format('M/D/YYYY');
	// var days = [];
	// var name = days[date.getDay()];			
	// dayBlock.innerHTML = "";
	// forecast.append(dayBlock);
	// 		var city = data.city.name;
	// 		var temp = data.list[i].main.temp;
	// 		var humidity = data.list[i].main.humidity
	// 		var wind = data.list[i].wind.speed;
	// 		var icon = date.list[i].forecast[0].icon;


function renderItems(city, data ) {
	//call function to render current weather
	renderWeather(city, data.list[0]);
	//call function to render forecast

	renderForecast(_data_.list[0]);
};		

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

