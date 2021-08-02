const newBtn = document.querySelector('.new-btn');
const listForm = document.querySelector('.list-form');
const toDoInput = listForm.querySelector('input');
const todoLists = document.querySelector('.todoLists');
const exit = document.querySelector('.exit');
const title = document.querySelector('.title');
const plus = document.querySelector('.plus');
const listing = document.querySelector('.listing');

const TodosLocal = 'toDos';
let toDos = [];

function saveToDos() {
  localStorage.setItem(TodosLocal, JSON.stringify(toDos));
}
function paintToDo(text) {
  const newId = toDos.length + 1;
  const toDoObject = {
    text: text,
    id: newId,
  };

  if (listing.value.length === 0) {
    return false;
  }

  if (listing.value.length > 14) {
    return false;
  }

  console.log(listing.value.length);

  const li = document.createElement('li');
  const delBtn = document.createElement('button');

  delBtn.className = 'del-btn';
  li.innerHTML = `
    <input type="checkbox" id="${newId}">
    <label for="${newId}">
      <span></span>${text}
    </label>
    `;

  li.appendChild(delBtn);
  todoLists.appendChild(li);
  li.className = newId;
  delBtn.innerHTML = `<i class="far fa-trash-alt"></i>`;
  delBtn.addEventListener('click', deleteList);
  toDos.push(toDoObject);
  saveToDos();

  // console.log(listing.value.length);
}

function deleteList(event) {
  const btn = event.target;
  const li = btn.parentNode.parentNode;
  todoLists.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.className);
  });
  toDos = cleanToDos;
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = '';
  listForm.classList.remove('act');
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TodosLocal);
  //LocalStorage란?
  //데이터를 사용자 로컬에 보존하는 방식.
  //데이터를 저장, 덮어쓰기, 삭제 등 조작 가능.
  //자바스크립트(JavaScript)로 조작.
  //모바일에서도 사용 가능

  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function enterEvent() {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      listForm.classList.add('act');
      listing.focus();
    }
  });
}

function escEvent() {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      listForm.classList.remove('act');
    }
  });
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
  enterEvent();
  escEvent();
}

init();
