function $(selector) {
  return document.querySelector(selector);
}

function buildQueryURL(locationParam) {
  return `https://weatherapi-com.p.rapidapi.com/current.json?q=${locationParam}`;
}

const form = $("form");
const locationInputField = form.querySelector("input");

const weatherIcon = $(".weather-icon");
const weatherCondition = $(".weather-condition");

const farenheitTemp = $(".farenheit");
const celsiusTemp = $(".celsius");

const cityName = $(".name");
const countryName = $(".country");

const windSpeed = $(".wind-speed");
const humidity = $(".humidity");
const pressure = $(".pressure");

function updateUI(data) {
  weatherIcon.src = data.current.condition.icon;
  weatherCondition.textContent = data.current.condition.text;

  farenheitTemp.textContent = `${data.current.temp_f}°F`;
  celsiusTemp.textContent = `${data.current.temp_c}°C`;

  cityName.textContent = data.location.name;
  countryName.textContent = data.location.country;

  windSpeed.textContent = `${data.current.wind_mph}m/h`;
  humidity.textContent = `${data.current.humidity}%`;
  pressure.textContent = `${data.current.pressure_in} inches`;
}

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    "X-RapidAPI-Key": "cb87cf4eb0mshd2de9a7491735a1p19c3b1jsn9a98abd923f8",
  },
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  getWeather(locationInputField.value).then(
    (data) => {
      updateUI(data);
    },
    (err) => {
      alert(err);
    }
  );
});

async function getWeather(location) {
  if (location.trim() === "") {
    locationInputField.value = "";
    throw new Error("You passed invalid data");
  }

  const queryUrl = buildQueryURL(location);
  const response = await fetch(queryUrl, options);
  if (!response.ok) {
    return Promise.reject(`Request for weather data of ${location} failed.`);
  }
  const jsonData = await response.json();
  return jsonData;
}

// INIT
(() => {
  getWeather("Lagos").then(
    (data) => {
      updateUI(data);
    },
    (err) => {
      alert(err);
    }
  );
})();
