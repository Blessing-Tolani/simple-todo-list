let todos;
let noOfTodos;
let editTodoIndex;
let oldTodoItem;

let todosContainer = document.querySelector('.todos-container');
let addTodoButton = document.querySelector('.add-todo');
let saveTodoButton = document.querySelector('.save-todo');
let pTag = document.createElement('p');
let todoInput = document.querySelector('input');

saveTodoButton.style.display = 'none';

const emptyTodo = () => {
  pTag.innerText = "Sleep all day.. There's nothing to do";
  todosContainer.classList.add('empty-todo');
  todosContainer.classList.remove('todo-list');
  todosContainer.appendChild(pTag);
};

function getTodos() {
  const todoList = JSON.parse(localStorage.getItem('todoList'));
  if (todoList?.length) {
    todos = todoList;
    noOfTodos = todoList.length; //
  } else {
    todos = [];
    noOfTodos = 0;
  }
  showAllTodos(todos);
}
getTodos();

addTodoButton.addEventListener('click', () => {
  if (todoInput.value) {
    noOfTodos += 1;

    if (noOfTodos === 1) {
      todosContainer.removeChild(pTag);
      todosContainer.classList.remove('empty-todo');
      todosContainer.classList.add('todo-list');
    }

    todos.push(todoInput.value);
    localStorage.setItem('todoList', JSON.stringify(todos));
    createTodo(todoInput.value);
    todoInput.value = '';
  }
});

saveTodoButton.addEventListener('click', () => {
  todos[editTodoIndex] = todoInput.value;
  localStorage.setItem('todoList', JSON.stringify(todos));
  const todoTextsTag = document.querySelectorAll('.todo-text');

  for (let i = 0; i < todoTextsTag.length; i++) {
    if (todoTextsTag[i].innerText == oldTodoItem) {
      todoTextsTag[i].innerText = todoInput.value;
      break;
    }
  }
  todoInput.value = '';
  addTodoButton.style.display = 'block';
  saveTodoButton.style.display = 'none';
});

function showAllTodos(todos) {
  if (todos.length) {
    todos.map((todo) => {
      createTodo(todo);
      todosContainer.classList.add('todo-list');
    });
  } else {
    emptyTodo();
  }
}

function createTodo(value) {
  let divTodoWrapper = document.createElement('div');
  let pTextTag = document.createElement('p');
  let iconDivTag = document.createElement('div');
  let deleteSpanTag = document.createElement('span');
  let editSpanTag = document.createElement('span');

  divTodoWrapper.classList.add('todo-wrapper');
  todosContainer.prepend(divTodoWrapper);
  divTodoWrapper.prepend(pTextTag);
  pTextTag.innerText = value;
  pTextTag.classList.add('todo-text');
  divTodoWrapper.append(iconDivTag);
  iconDivTag.classList.add('icons');
  iconDivTag.appendChild(deleteSpanTag);
  iconDivTag.prepend(editSpanTag);
  deleteSpanTag.innerHTML =
    '<i class="fa fa-trash text-red-700  cursor-pointer" aria-hidden="true"></i>';
  editSpanTag.innerHTML =
    '<i class="fa text-blue-900 cursor-pointer fa-pencil" aria-hidden="true"></i>';

  deleteSpanTag.addEventListener('click', () => {
    todosContainer.removeChild(divTodoWrapper);
    noOfTodos -= 1;
    todos.splice(todos.indexOf(value), 1);
    localStorage.setItem('todoList', JSON.stringify(todos));
    if (!todos.length) {
      emptyTodo();
    }
  });

  editSpanTag.addEventListener('click', () => {
    todoInput.value = pTextTag.innerText;
    addTodoButton.style.display = 'none';
    saveTodoButton.style.display = 'block';
    editTodoIndex = todos.indexOf(pTextTag.innerText);
    oldTodoItem = pTextTag.innerText;
  });
}
