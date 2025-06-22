
const mainCard = document.getElementById("card1");
const secCard = document.getElementById("card2");
const thirdCard = document.getElementById("card3");


let now = new Date();
let day = now.getDate();
let monthNumber = now.getMonth();
let dayName = now.toLocaleDateString("en-US", { weekday: "long" });

let monthNames = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];
let monthName = monthNames[monthNumber];


let tomorrow = new Date(now);
tomorrow.setDate(now.getDate() + 1);
let day2 = tomorrow.toLocaleDateString("en-US", { weekday: "long" });

let dayAfterTomorrow = new Date(now);
dayAfterTomorrow.setDate(now.getDate() + 2);
let day3 = dayAfterTomorrow.toLocaleDateString("en-US", { weekday: "long" });



async function CurrentWeather(res) {
  let blackBox = "";
  blackBox += `
    <div class="header-custom-light card-header d-flex justify-content-between">
      <div class="day">${dayName}</div>
      <div class="date">${day} ${monthName}</div>
    </div>
    <div class="body-custom-light card-body ">
      <h5 class="card-title">${res.location.name}</h5>
      <div class="card-text">
        <div class="degree d-flex justify-content-between ">
          <h1>${res.current.temp_c}<sub class="sub-top">o</sub>C</h1>
          <img src="https:${res.current.condition.icon}" alt="weather icon">
        </div>
        <p class="weatherCondition">${res.current.condition.text}</p>
        <span class="px-2"><img src="https://cdn-icons-png.flaticon.com/128/1163/1163657.png" alt="umbrella"> ${res.forecast.forecastday[0].day.daily_chance_of_rain}%</span>
        <span class="px-2"><img src="images/icon-wind@2x.png" alt=""> ${res.current.wind_kph}km/h</span>
        <span class="px-2"><img src="images/icon-compass@2x.png" alt=""> ${res.current.wind_dir}</span>
      </div>
    </div>
  `;
  mainCard.innerHTML = blackBox;
}


async function secondWeather(res) {
  let blackBox = "";
  blackBox += `
    <div class="header-custom-dark card-header d-flex justify-content-center">
      <div class="day">${day2}</div>
    </div>
    <div class="body-custom-dark card-body text-center ">
      <div class="cardImg">
        <img src="https:${res.forecast.forecastday[1].day.condition.icon}" alt="">
      </div>
      <div class="degreeAfter">
        <h4>${res.forecast.forecastday[1].day.maxtemp_c}<sub class="sub-top">o</sub>C</h4>
        <small>${res.forecast.forecastday[1].day.mintemp_c}<sub class="sub-top">o</sub></small>
        <p class="weatherCondition">${res.forecast.forecastday[1].day.condition.text}</p>
      </div>
    </div>
  `;
  secCard.innerHTML = blackBox;
}


async function thirdWeather(res) {
  let blackBox = "";
  blackBox += `
    <div class="header-custom-light card-header d-flex justify-content-center">
      <div class="day">${day3}</div>
    </div>
    <div class="body-custom-light2 card-body text-center ">
      <div class="cardImg">
        <img src="https:${res.forecast.forecastday[2].day.condition.icon}" alt="">
      </div>
      <div class="degreeAfter">
        <h4>${res.forecast.forecastday[2].day.maxtemp_c}<sub class="sub-top">o</sub>C</h4>
        <small>${res.forecast.forecastday[2].day.mintemp_c}<sub class="sub-top">o</sub></small>
        <p class="weatherCondition">${res.forecast.forecastday[2].day.condition.text}</p>
      </div>
    </div>
  `;
  thirdCard.innerHTML = blackBox;
}


async function fetchProcess(x = "Cairo") {
  try {
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f42b69e041644993ba4172858251906&q=${x}&days=3&aqi=no&alerts=no`);
    let res = await data.json();
    console.log(res);

    if (res.error) {
      console.error("Error: ", res.error.message);
      return;
    }

    await CurrentWeather(res);
    await secondWeather(res);
    await thirdWeather(res);
  } catch (err) {
    console.error("Failed to fetch weather data:", err);
  }
}


fetchProcess("Cairo");


let searchBtn = document.getElementById("searchBtn").addEventListener("click", () => {
  let country = document.getElementById("countrySearch").value;
  fetchProcess(country);
});

let input = document.getElementById("countrySearch").addEventListener("input", () => {
  let country = document.getElementById("countrySearch").value;
  fetchProcess(country);
});
