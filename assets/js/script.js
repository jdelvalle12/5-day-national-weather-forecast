var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var forecastContainerEl = document.querySelector("#forecast-container");
var forecastDisplayEl = document.querySelector("#forecast");
var searchButtonEl = document.querySelector('.btn');
var cityNameSpan = document.querySelector('#city-name');

var city = [];


var apiKey = "0a3422ed44f463b4f5d64da245e2cb6f";
var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

cityFormEl.addEventListener("submit", function (event) {
	event.preventDefault();

	var cityText = cityInputEl.value.trim();

	if (cityText === "") {
		return;

        cities.push(cityText);
        cityInputEl.value = "";

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
	

function renderCity() {
    cityList.innerHTML = "";
    cityNameSpan.textContent = cities.length;

    for (var i = 0; i < cities.length; i++) {
		var city = cities[i];

        var li = document.createElement("li");
        li.textContent = todo;
        li.setAttribute("data-index", i);

        var button = document.createElement("button");
        button.textContent = "";

        li.appendChild(button);
        todoList.appendChild(li);
    }
}

function init() {
    // Get stored todos from localStorage
    var storedCities = JSON.parse(localStorage.getItem("cities"));
  
    // If todos were retrieved from localStorage, update the todos array to it
    if (storedCities !== null) {
      cities = storedCities;
    }
  
    // This is a helper function that will render todos to the DOM
    renderCity();
  }

  function storeCity() {
    // Stringify and set key in localStorage to todos array
    localStorage.setItem("cities", JSON.stringify(cities));
}  
    var cities = localStorage.getItem('cities');
	if (cities) {
	  cities = JSON.parse(cities);
	} else {
	  cities = [];
	}
	return cities;
  }
  
  
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

	//renderCityFromStorage();
	//displayForecast();
	//getCity();
	//searchButtonEl.addEventListener("submit", getCity);
	