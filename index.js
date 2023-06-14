const timeEl = document.querySelector(".time");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const author = document.querySelector(".auhtor");

// Get random background images for body.
// document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1493246507139-91e8fad9978e?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODY3NTE0MTJ8&ixlib=rb-4.0.3&q=85)`;

fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    author.textContent = `${data.user.first_name} ${data.user.last_name}`;
  })
  .catch((err) => {
    console.log(err);
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1493246507139-91e8fad9978e?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODY3NTE0MTJ8&ixlib=rb-4.0.3&q=85)`;
  });

// Show Current Time.
setInterval(() => {
  const date = new Date();
  timeEl.textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" });
}, 1000);

// Show wheather data.
navigator.geolocation.getCurrentPosition((position) => {
  const longitude = position.coords.longitude;
  const latitude = position.coords.latitude;
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      temp.textContent = `${Math.round(data.main.temp)}°C`;
      city.textContent = data.name;
    });
});
