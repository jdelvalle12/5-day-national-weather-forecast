var cityInputEl = document.querySelector("#cityName");
var resultsContainer = document.querySelector("#weather-results");
var resultsForecastContainer = document.querySelector(".forecast-results");
var dateDisplayEl = document.querySelector(".current-date");
var searchBtnEl = document.querySelector('.search-btn');
var searchHistoryContainer = document.querySelector('#history');
var searchHistory = [];
var city = [];

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
	console.log(forecast); 
	var forecastDisplayEl = document.querySelector(".forecast-results");
	// var day1 = data.daily[1].temp;
	// var day1 = data.daily[1].humidity;
	// var day1 = data.daily[1].wind.speed;
	// var day1 = data.daily[1].weather[0].icon;


	var fday1 = dayjs().format('M/D/YYYY');
	var resultsContainer = document.querySelector(".weather-results");

	var fday1 = document.createElement("h1").innerHTML = `${fday1}` + `${fday1}`;
	// city.textContent = `${city}` + `${date}`;
	// resultsContainer.append(city);

	var ftemp1 = document.createElement("p");
	ftemp1.textContent = "Temp:" + forecast.main.temp + "F";
	resultsContainer.append(ftemp1);

	var fhumidity1 = document.createElement("p");
	fhumidity1.textContent = "Humidity:" + forecast.main.humidity + "%";
	resultsContainer.append(fhumidity1);

	var fwind1 = document.createElement("p");
	fwind1.textContent = "Wind Speed:" + forecast.wind.speed + "mph";
	resultsContainer.append(fwind1);

	var iconURL = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
	var ficon1 = document.createElement("img");
	ficon1.setAttribute('src', iconURL) ;
	resultsContainer.append(ficon1);
	

	var fday2 = dayjs().format('M/D/YYYY');
	var resultsContainer = document.querySelector(".weather-results");

	var fday2 = document.createElement("h1").innerHTML = `${fday2}`;
	// city.textContent = `${city}` + `${date}`;
	// resultsContainer.append(city);

	var ftemp2 = document.createElement("p");
	ftemp2.textContent = "Temp:" + forecast.main.temp + "F";
	resultsContainer.append(ftemp2);

	var fhumidity2 = document.createElement("p");
	fhumidity2.textContent = "Humidity:" + forecast.main.humidity + "%";
	resultsContainer.append(fhumidity2);

	var fwind2 = document.createElement("p");
	fwind2.textContent = "Wind Speed:" + forecast.wind.speed + "mph";
	resultsContainer.append(fwind2);

	var iconURL = `https://openweathermap.org/img/w/${weather.weather[1].icon}.png`;
	var ficon2 = document.createElement("img");
	ficon2.setAttribute('src', iconURL) ;
	resultsContainer.append(ficon2);
	
};


function renderItems(city, data) {
	
	renderWeather(city, data.list[0], data.city.timeZone);

	//call function to render forecast
	renderForecast(data.list[1], data.timeZone);
	renderForecast(data.list[2], data.timeZone);
	// forecast.eachDay(days) 
	// 	var date = days().format('M/D/YYYY');
	// 	var days = [];
	// 	var name = days[date.getDay()];
	// 	var dayBlock = document.createElement('div');
	// 	dayBlock.innerHTML = "";
	// 	forecast.append(dayBlock);
	}
	

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

