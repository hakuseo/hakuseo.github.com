const newBtn = document.querySelector('.new-btn');
const listForm = document.querySelector('.list-form');
const toDoInput = listForm.querySelector('input');
const todoList = document.querySelector('.todoList');
const exit = document.querySelector('.exit');
const title = document.querySelector('.title');
const plus = document.querySelector('.plus');
const btnInput = document.querySelector('.listing');
const TodosLocal = 'toDos';

const toDos = [];
console.log(toDos);

function paintToDo(text) {
  const li = document.createElement('li');
  todoList.appendChild(li);

  const toDoObject = {
    text: text,
    id: toDos.length + 1,
  };

  li.innerHTML = `<input type="checkbox" id="${toDoObject.id}">
  <label for="${toDoObject.id}"><span></span>${text}
  </label>`;

  toDos.push(toDoObject);
}

function handleSubmit(event) {
  event.preventDefault();
  const currenValue = toDoInput.value;
  paintToDo(currenValue);
  toDoInput.value = '';
  listForm.classList.remove('act');
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TodosLocal);
  if (loadedToDos !== null) {
  }
}

function clickEvent() {
  newBtn.addEventListener('click', () => {
    listForm.classList.add('act');
  });

  exit.addEventListener('click', () => {
    listForm.classList.remove('act');
  });

  plus.addEventListener('click', (event) => {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = '';
    listForm.classList.remove('act');
  });
}

function init() {
  loadToDos();
  listForm.addEventListener('submit', handleSubmit);
  clickEvent();
}

init();
