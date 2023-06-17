const todoLink = document.querySelector(".todo-link");
const newTodoBtn = document.querySelector(".add");
const todoPopup = document.querySelector(".todo-popup");
const closeTodoPopup = document.querySelector(".close");
const todoForm = document.querySelector(".todo-form");
const addTodoSection = document.querySelector(".add-todo");
const addNewTodoInput = document.querySelector("#new-todo");
const allTodosSection = document.querySelector(".todos");

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
