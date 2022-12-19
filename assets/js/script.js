var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var cityNameSpan = document.querySelector('#city-name');
var cityListEl = document.querySelector('#city-list');
var cityButtonsEl = document.querySelector("#city-buttons");
var dateDisplayEl = document.querySelector('#date-display');
var forecastContainerEl = document.querySelector("#forecast-container");
var forecastDisplayEl = document.querySelector("#forecast");
var searchButtonEl = document.querySelector('.btn');


var cities = [];


var apiKey = "0a3422ed44f463b4f5d64da245e2cb6f";
var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;



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


var buttonClickHandler = function (event) {
	var forecast = event.target.getAttribute("data-forecast");

	if (forecast) {
		getFeaturedCity(forecast);

		forecastContainerEl.textContent = "";
	}
};
var getFeaturedForecast = function (forecast) {
	var apiUrl =
	"http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + "0a3422ed44f463b4f5d64da245e2cb6f";

	fetch(apiUrl).then(function (response) {
		if (response.ok) {
			response.json().then(function (data) {
				displayForecast(data.items, forecast);
			});
		} 
	});
};

function printForecastData() {
	
	forecastDisplayEl.empty();
	
	var cities = renderCity();
  
	 
	for (var i = 0; i < cities.length; i += 1) {
	  var city = cities[i];
	  
	}


	var displayForecast = function (cities, forecast) {
		if (cities.length === 0) {
			forecastContainerEl.textContent = "";
			return;
		}
	
		forecast.textContent = forecast;
	
		for (var i = 0; i < forecast.length; i++) {
			var cityName = forecast[i] + "/" + city[i].name;
	
			var forecastDisplayEl = document.createElement("a");
			forecastDisplayEl.classList = "list-item flex-row justify-space-between align-center";
			forecastDisplayEl.setAttribute(cityName);
	
			var titleEl = document.createElement("span");
			titleEl.textContent = cityName;
	
			forecastDisplayEl.appendChild(titleEl);
	
			var statusEl = document.createElement("span");
			statusEl.classList = "flex-row align-center";
	
			if (repos[i].open_issues_count > 0) {
				statusEl.innerHTML =
					"<i class='fas fa-times status-icon icon-danger'></i>" +
					repos[i].open_issues_count +
					" issue(s)";
			} else {
				statusEl.innerHTML =
					"<i class='fas fa-check-square status-icon icon-success'></i>";
			}
	
			forecastDisplayEl.appendChild(statusEl);
	
			forecastContainerEl.appendChild(forecastDisplayEl);
		}

	};
}
	init();
	
	//displayForecast();
	