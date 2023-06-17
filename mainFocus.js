const focusSection = document.querySelector(".focus-added");
const focusForm = document.querySelector(".main-focus-form");
const mainFocus = document.querySelector(".task-name");
const removeMainFocus = document.querySelector(".remove");

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
