var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector(".city-input");
var cityNameSpan = document.querySelector('#city-name');
var cityListEl = document.querySelector('#city-list');
var cityButtonsEl = document.querySelector("#city-buttons");
var forecastContainerEl = document.querySelector("#forecast-container");
var forecastDisplayEl = document.querySelector("#forecast");
var searchButtonEl = document.querySelector('.btn');


var cities = [];
var forecast = [];

var apiKey = "0a3422ed44f463b4f5d64da245e2cb6f";
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";

async function getWeather () {

	var searchWeatherArr = document.location.search.split('&');

	var query = searchWeatherArr[0].split('=').pop();
	var format = searchWeatherArr[1].split('=').pop();

	searchApi(query, format);

	var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";

	var city = await fetch(apiUrl)
		.then(function (response) {
			console.log("Fetch Status: " + response.status);
			if (response.status !== 200) {
				console.log(response);
				response.json().then(function (data) {
					console.log(data);
					displayForecast(data, city);
				});
			} else {
				alert("Error reaching Server" + "\n Status Code: " + response.status);
            }
            return response.json(); 
        })

}

//fetch("http://api.openweathermap.org/data/2.5/current?q=city&appid=0a3422ed44f463b4f5d64da245e2cb6f", {
	//method: "GET",
	//header: "",
//})
	//.then(function (response) {
		//return response.json();
	//})
	//.then(function (data) {
	//	console.log(data);
	//});   

var currentTemp = document.data.currentTemp;
var currentWindSpeed = document.data.currentWindSpeed; 
var currentHumidity = document.data.currentHumidity; 

console.log("cityInput: " + city + " - Temp: " + currentTemp + " Wind: " + currentWindSpeed + " Humidity: " + currentHumidity);

$('#name').text(city);
$('#temperature').text("Temperature: " + currentTemp);
$('#windspeed').text("Wind Speed: " + currentWindSpeed);
$('#humidity').text("Humidity: " + currentHumidity);

function renderCity() {
    cityListEl.innerHTML = "";
    cityNameSpan.textContent = cities.length;

    for (var i = 0; i < cities.length; i++) {
		var city = cities[i];

        var li = document.createElement("li");
        li.textContent = city;
        li.setAttribute("data-index", i);

        var button = document.createElement("button");
        button.textContent = "";

        li.appendChild(button);
        cityListEl.appendChild(li);
    }
}

function init() {
    // Get stored cities from localStorage
    var storedCities = JSON.parse(localStorage.getItem("cities"));
  
    // If cities were retrieved from localStorage, update the cities array to it
    if (storedCities !== null) {
      cities = storedCities;
    }
  
    // This is a helper function that will render cities to the DOM
    renderCity();
  }

  function storeCity() {
    //Stringify and set key in localStorage to cities array
    localStorage.setItem("cities", JSON.stringify(cities));
}   

	

var buttonClickHandler = function (event) {
	var forecast = event.target.getAttribute("data-forecast");

	if (forecast) {
		getFeaturedCity(forecast);

		forecastContainerEl.textContent = "";
	}
};


function printForecastData() {
	
	forecastDisplayEl.empty();
	
	var cities = renderCity();
  
	 
	for (var i = 0; i < cities.length; i ++) {
	  var city = cities[i];
	  
	}
}


function displayForecast(cities, forecast) {
		if (cities.length === 0) {
			forecastContainerEl.textContent = "";
			return;
		}

		forecast.textContent = forecast;

		for (var i = 0; i < forecast.length; i++) {
			var cityName = forecast[i];

			var forecastDisplayEl = document.createElement("a");
			forecastDisplayEl.classList = "list-item flex-row justify-space-between align-center";
			forecastDisplayEl.setAttribute(cityName);
	}
};

cityFormEl.addEventListener("submit", function (event) {
	event.preventDefault();

	var cityText = cityInputEl.value.trim();

	if (cityText === "") {
		return;
	}
        cities.push(cityText);
        cityInputEl.value = "";

     	storeCity();
     	renderCity();  		
    });

cityListEl.addEventListener("click", function(event) {
	var element = event.target;

	if (element.matches("button") === true) {
		var index = element.parentElement.getAttribute("data-index");
		cities.splice(index, 1 );

		storeCity();
		renderCity();
	}
});

var buttonClickHandler = function (event) {
	var forecast = event.target.getAttribute("data-forecast");

	if (forecast) {
		getFeaturedCity(forecast);

		forecastContainerEl.textContent = "";
	}
};


function printForecastData(forecast) {
	console.log(forecast);
	
	forecastDisplayEl.empty();
	
	var cities = renderCity();
  
	 
	for (var i = 0; i < cities.length; i ++) {
	  var city = cities[i];
	  
	}
}

function displayForecast(cities, forecast) {
		if (cities === " ") {
			forecastContainerEl.textContent = "";
			return;
		}

		forecastDisplayEl.textContent = forecast;

		for (var i = 0; i < forecast.length; i++) {
			var cityName = forecast[i];

			var forecastDisplayEl = document.createElement("a");
			forecastDisplayEl.classList = "list-item flex-row justify-space-between align-center";
			forecastDisplayEl.setAttribute(cityName);
	}
};


$(function () { // waits for page to load before any code is executed
    $('.search-Btn').on('click', getWeather); // listener for search button
    // insert what function to start above ^^^^^^^^^^^ set to getWeather now and includes other apis fetches in same funciton
});
	init();
	cityButtonsEl.addEventListener("click", buttonClickHandler);
	//displayForecast();
	