import { getRandomBg, getRandomQuote, getWeather } from "./apiCalls.js";
const timeEl = document.querySelector(".time");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const author = document.querySelector(".auhtor");
const mantra = document.querySelector(".mantra");
const greet = document.querySelector(".greet");
const focusForm = document.querySelector(".main-focus-form");
const newTodoBtn = document.querySelector(".add");
const todoPopup = document.querySelector(".todo-popup");
const closeTodoPopup = document.querySelector(".close");
const todoForm = document.querySelector(".todo-form");
const addTodoSection = document.querySelector(".add-todo");
const addNewTodoInput = document.querySelector("#new-todo");
const allTodosSection = document.querySelector(".todos");
const todoLink = document.querySelector(".todo-link");

// Get random background images for body.
// document.body.style.backgroundImage =
//   "url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODY4MDY4MTJ8&ixlib=rb-4.0.3&q=85)";
getRandomBg().then((data) => {
  console.log(data.urls.full);
  document.body.style.backgroundImage = `url(${data.urls.full})`;
  author.textContent = `${data.user.first_name} ${data.user.last_name}`;
});

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
// Need to Re-factor the API calling. We can get the 1 quote per day store it in a local storage and use it. Instead calling API on every page refresh.
getRandomQuote().then((res) => {
  mantra.textContent = res.content;
});

// Display Main Focus Task for today
focusForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = document.getElementById("main-focus").value;
  if (task) {
    const focusSection = document.querySelector(".focus-added");
    focusSection.classList.remove("hidden");
    document.querySelector(".task-name").textContent = task;
    focusForm.classList.add("hidden");
  }
});

// OPEN Todo Popup
todoLink.addEventListener("click", () => {
  todoPopup.classList.toggle("hidden");
});

// Close Todo Popup by clikcing on Close button.
closeTodoPopup.addEventListener("click", () => {
  todoPopup.classList.add("hidden");
});

// TODO section.
newTodoBtn.addEventListener("click", () => {
  todoForm.classList.remove("hide");
  addTodoSection.classList.add("hidden");
});

// Adding new todo.
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTodo = addNewTodoInput.value;
  if (newTodo) {
    allTodosSection.classList.remove("hidden");
    allTodosSection.innerHTML += `
      <div class="todo">
        <i class="fa-regular fa-circle-check"></i>
        <p>${newTodo}</p>
      </div>
    `;
    addNewTodoInput.value = "";
  }
});
