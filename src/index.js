/** @format */

// ⏰Feature #1

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
document.querySelector(
  "#date"
).innerHTML = `${day.toUpperCase()} ${hour}:${minute}`;

//🙀Bonus Feature
let celsiusDegree = true;
let far = document.querySelector("#fahrenheit-link");
far.addEventListener("click", function c2f() {
  if (celsiusDegree) {
    let degree = document.querySelector("#temperature").innerHTML;
    document.querySelector("#temperature").innerHTML = Math.round(
      (degree * 9) / 5 + 32
    );
    celsiusDegree = false;
  }
});
let cel = document.querySelector("#celsius-link");
cel.addEventListener("click", function f2c() {
  if (!celsiusDegree) {
    let degree = document.querySelector("#temperature").innerHTML;
    console.log(degree);
    document.querySelector("#temperature").innerHTML = Math.round(
      ((degree - 32) * 5) / 9
    );
    celsiusDegree = true;
  }
});

let apiKey = "a2e6113ea75155225ff8f0f04ddc7b8f";
let currentButton = document.querySelector("#current-city-button");
let searchButton = document.querySelector("#search-city-button");

currentButton.addEventListener("click", (e) => {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let h1City = document.querySelector("#city");
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then((response) => {
      h1City.innerHTML = response.data.name;
      let temperature = Math.round(response.data.main.temp);
      let h1temp = document.querySelector("#temperature");
      h1temp.innerHTML = temperature;
    });
  });
});

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  let ncity = document.querySelector("#city-input").value;
  let h1City = document.querySelector("#city");
  if (ncity) h1City.innerHTML = ncity;
  else {
    ncity = "New York";
    h1City.innerHTML = ncity;
  }
  let nurl = `https://api.openweathermap.org/data/2.5/weather?q=${ncity}&appid=${apiKey}&units=metric`;
  axios
    .get(nurl)
    .then((response) => {
      let temperature = Math.round(response.data.main.temp);
      let h1temp = document.querySelector("#temperature");
      h1temp.innerHTML = temperature;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
});
