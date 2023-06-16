import { getRandomBg, getRandomQuote, getWeather } from "./apiCalls.js";
const timeEl = document.querySelector(".time");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const author = document.querySelector(".auhtor");
const mantra = document.querySelector(".mantra");
const greet = document.querySelector(".greet");
const focusForm = document.querySelector(".main-focus-form");
const mainFocus = document.querySelector(".task-name");
const focusSection = document.querySelector(".focus-added");
const newTodoBtn = document.querySelector(".add");
const todoPopup = document.querySelector(".todo-popup");
const closeTodoPopup = document.querySelector(".close");
const todoForm = document.querySelector(".todo-form");
const addTodoSection = document.querySelector(".add-todo");
const addNewTodoInput = document.querySelector("#new-todo");
const allTodosSection = document.querySelector(".todos");
const todoLink = document.querySelector(".todo-link");
const newLink = document.querySelector(".new-link");
const linksDisplay = document.querySelector(".links-display");
const linksForm = document.querySelector(".links-form-display");
const goBack = document.querySelector(".go-back");
const closeLinksPopup = document.querySelector(".close-links");
const openPopup = document.querySelector(".open-popup");
const linksDiv = document.querySelector(".all-links");
const removeMainFocus = document.querySelector(".remove");

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

// ****** MAINFOCUS SECTION ******

// Check if mainFocus is already there in localStorage or not.
const mainFocusLocalStore = JSON.parse(localStorage.getItem("mainFocus"));
if (mainFocusLocalStore) {
  renderMainFocus(mainFocusLocalStore);
}

function renderMainFocus(task) {
  focusSection.classList.remove("hidden");
  focusForm.classList.add("hidden");
  document.querySelector(".task").textContent = task;
}

// Display Main Focus Task for today
focusForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = document.getElementById("main-focus").value;
  if (task) {
    // Store it to localStorage.
    localStorage.setItem("mainFocus", JSON.stringify(task));
    document.getElementById("main-focus").value = "";
    renderMainFocus(task);
  }
});

mainFocus.addEventListener("mouseenter", () => {
  removeMainFocus.style.display = "block";
});

mainFocus.addEventListener("mouseleave", () => {
  removeMainFocus.style.display = "none";
});

removeMainFocus.addEventListener("click", () => {
  localStorage.removeItem("mainFocus");
  focusSection.classList.add("hidden");
  focusForm.classList.remove("hidden");
});

// ****** MAINFOCUS SECTION ENDS ******

// ****** TO-DO SECTION ******

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

let availableTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
if (availableTodos.length > 0) {
  todoForm.classList.remove("hide");
  addTodoSection.classList.add("hidden");
  renderTodo(availableTodos);
}

function renderTodo(todos) {
  let todoHtml = "";
  for (const todo of todos) {
    const { id, task } = todo;
    todoHtml += `
      <div class="todo">
        <i class="fa-regular fa-circle-check"></i>
        <p>${task}</p>
        <i class="fa-regular fa-trash-can todo-remove" data-todoID=${id}></i>
      </div>
    `;
  }

  allTodosSection.innerHTML = todoHtml;
  const removeTodo = document.querySelectorAll(".todo-remove");
  removeTodo.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const removeID = e.target.dataset.todoid;
      availableTodos = availableTodos.filter((todo) => {
        return todo.id !== removeID;
      });
      localStorage.setItem("todos", JSON.stringify(availableTodos));
      renderTodo(availableTodos);
    });
  });
  allTodosSection.classList.remove("hidden");
}
// Adding new todo.
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTodo = addNewTodoInput.value;
  if (newTodo) {
    const todoId = new Date().getTime().toString();
    availableTodos.push({ id: todoId, task: newTodo });

    localStorage.setItem("todos", JSON.stringify(availableTodos));
    renderTodo(availableTodos);
    addNewTodoInput.value = "";
  }
});

// ****** TO-DO SECTION ENDS ******

// ****** LINKS SECTION ******

// LINKS SECTION
newLink.addEventListener("click", () => {
  linksDisplay.style.display = "none";
  linksForm.style.display = "flex";
});

goBack.addEventListener("click", () => {
  linksForm.style.display = "none";
  linksDisplay.style.display = "flex";
});

closeLinksPopup.addEventListener("click", () => {
  linksDisplay.style.display = "none";
});

openPopup.addEventListener("click", () => {
  if (linksDisplay.style.display === "none") {
    linksDisplay.style.display = "flex";
  } else {
    linksDisplay.style.display = "none";
  }
});

let availableLinks = JSON.parse(localStorage.getItem("links")) ?? [];
if (availableLinks.length > 0) {
  renderLinks(availableLinks);
  linksDisplay.style.display = "none";
}
function renderLinks(links) {
  let linkHtml = "";
  links.forEach((link) => {
    const { id, name, address } = link;
    linkHtml += `
    <div class="individual-link">
      <i class="fa-solid fa-link"></i>
      <a href="${address}">${name}</a>
      <i class="fa-regular fa-trash-can link-remove" data-linkID=${id}></i>
    </div>
    `;
  });
  linksDiv.innerHTML = linkHtml;
  // Go back to the links popup
  linksForm.style.display = "none";
  linksDisplay.style.display = "flex";

  document.querySelectorAll(".link-remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const removeID = e.target.dataset.linkid;
      availableLinks = availableLinks.filter((link) => {
        return link.id !== removeID;
      });
      localStorage.setItem("links", JSON.stringify(availableLinks));
      renderLinks(availableLinks);
    });
  });
}

linksForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const linkName = document.querySelector("#links-name").value;
  const linkAddress = document.querySelector("#links-address").value;

  if (linkName && linkAddress) {
    const linkId = new Date().getTime().toString();
    availableLinks.push({ id: linkId, name: linkName, address: linkAddress });
    localStorage.setItem("links", JSON.stringify(availableLinks));
    document.querySelector("#links-name").value = "";
    document.querySelector("#links-address").value = "";
    renderLinks(availableLinks);
  }
});

// ****** LINKS SECTION ENDS ******
