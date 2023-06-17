import { getRandomBg, getRandomQuote, getWeather } from "./apiCalls.js";
const timeEl = document.querySelector(".time");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const author = document.querySelector(".auhtor");
const mantra = document.querySelector(".mantra");
const greet = document.querySelector(".greet");

// Get random background images for body.
// Get background from localStorage.
const defaultImg =
  "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODY4MDY4MTJ8&ixlib=rb-4.0.3&q=85";
const bgImg = JSON.parse(localStorage.getItem("bgImage")) ?? defaultImg;
const authorName = JSON.parse(localStorage.getItem("author")) ?? "Kevin";
document.body.style.backgroundImage = `url(${bgImg})`;
author.textContent = authorName;
// Setting a timeInterval for setting bg img of body to 6 Hours for boosting load time of site.
const timeWindow = 6 * 60 * 60;
setInterval(() => {
  getRandomBg().then((data) => {
    console.log(data.urls.full);
    localStorage.setItem("bgImage", JSON.stringify(data.urls.full));
    localStorage.setItem("author", JSON.stringify(data.user.last_name));
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    author.textContent = `${data.user.first_name} ${data.user.last_name}`;
  });
}, timeWindow * 1000);

// Show Current Time.
setInterval(() => {
  const date = new Date();
  timeEl.textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" });
}, 1000);

// Interval for changing quotes and greet msg.
setInterval(() => {
  greet.classList.toggle("hidden");
  mantra.classList.toggle("hidden");
}, 100000);

// Show wheather data.
navigator.geolocation.getCurrentPosition((position) => {
  const longitude = position.coords.longitude;
  const latitude = position.coords.latitude;
  getWeather(latitude, longitude).then((data) => {
    temp.textContent = `${Math.round(data.main.temp)}°`;
    city.textContent = data.name;
  });
});

// Mantra for the day.
getRandomQuote().then((res) => {
  mantra.textContent = res.content;
});
