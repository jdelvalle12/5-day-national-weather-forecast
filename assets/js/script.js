var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var cityNameSpan = document.querySelector('#city-name');
var cityListEl = document.querySelector('#city-list');
var cityButtonsEl = document.querySelector("#city-buttons");
var forecastContainerEl = document.querySelector("#forecast-container");
var forecastDisplayEl = document.querySelector("#forecast");
var searchButtonEl = document.querySelector('.btn');


var cities = [];
var forecast = [];

var apiKey = "0a3422ed44f463b4f5d64da245e2cb6f";
var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

async function getWeather () {
	var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

	var data = await fetch(apiUrl)
		.then(function (response) {
			if (response.ok) {
				console.log(response);
				response.json().then(function (data) {
					console.log(data);
					displayRepos(data, user);
				});
			} else {
				alert("Error: " + response.statusText);
			}
		})
		.catch(function (error) {
			alert("Unable to connect to GitHub");
		});
};

async function getWeather() {
    // variable for url for CURRENT weather
    var city = document.querySelector('input').value; // changes default value to user entered text

    var apiUrl = "http://api.openweathermap.org/data/2.5/current?q=" + city + "&appid=" + apiKey;

    var data = fetch(apiUrl)
        .then(function (response) {
            console.log("Fetch Status: " + response.status);
            if (response.status !== 200) { 
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

var temp = data.current.temp + "F"; 
var windspeed = data.current.mph + "MPH"; 
var humidty = data.current.humidity + " "; 
console.log("cityInput: " + city + " - Temp: " + temp + " Wind: " + windSpeed + " | Humidity: " + humidity);

$('#name').text(city);
    $('#temp').text("Temp: " + temp);
    $('#windspeed').text("Wind Speed: " + windSpeed);
    $('#humidity').text("Wind Direction: " + humidity);

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

	init();
	cityButtonsEl.addEventListener("click", buttonClickHandler);
	//displayForecast();
	