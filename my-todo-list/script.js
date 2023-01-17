let todoList = [];

const todoFrom = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoItems = document.querySelector(".todo-items");
const todoItem = document.querySelector(".todo-item");
const todoDes = document.querySelector(".default-description");
const title = document.querySelector(".app-title");

const tick = document.querySelector(".tick");
const delTodo = document.querySelector(".delete");

function renderTodoItem(item) {
  localStorage.setItem("todoList", JSON.stringify(todoList));

  const isDone = item.done ? "done" : "";
  const todo = document.createElement("li");
  const todoIm = document.querySelector(`[data-key='${item.id}']`);

  todo.innerHTML = `
  <input id="${item.id}" type="checkbox" />
  <label for="${item.id}" class="tick"> </label><span>${item.input}</span> <ion-icon name="close" class="delete icon "></ion-icon>`;
  todo.setAttribute("class", `todo-item grid ${isDone}`);
  todo.setAttribute("data-key", item.id);

  todoDes.classList.add("hidden");
  title.classList.add("active");

  if (item.deleted) {
    todoIm.remove();

    if (todoList.length === 0) {
      todoDes.classList.remove("hidden");
      title.classList.remove("active");
      todoItems.innerHTML = "";
    }
    return;
  }

  if (todoIm) {
    todoItems.replaceChild(todo, todoIm);
  } else {
    todoItems.append(todo);
  }
}

function AddTodo(input) {
  const todo = {
    input,
    done: false,
    id: Date.now(),
  };
  todoList.push(todo);

  renderTodoItem(todo);
}

todoFrom.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = todoInput.value.trim();
  if (input !== "") {
    AddTodo(input);
    todoInput.value = "";
    todoInput.focus();
  }
});

const items = todoItems.addEventListener("click", (e) => {
  if (e.target.classList.contains("tick")) {
    const itemKey = e.target.parentElement.dataset.key;

    tickTodo(itemKey);
  } else if (e.target.classList.contains("delete")) {
    const itemKey = e.target.parentElement.dataset.key;

    deleteTodo(itemKey);
  }
});

function tickTodo(key) {
  const index = todoList.findIndex((ele) => ele.id === Number(key));

  todoList[index].done = !todoList[index].done;
  renderTodoItem(todoList[index]);
}

function deleteTodo(key) {
  const index = todoList.findIndex((ele) => ele.id === Number(key));
  const todo = {
    deleted: true,
    ...todoList[index],
  };

  todoList = todoList.filter((ele) => ele.id !== Number(key));

  renderTodoItem(todo);
}

document.addEventListener("DOMContentLoaded", () => {
  const localSto = localStorage.getItem("todoList");

  if (localSto) {
    todoList = JSON.parse(localSto);
    todoList.forEach((ele) => {
      renderTodoItem(ele);
    });
  }
});
