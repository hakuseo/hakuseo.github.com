const newBtn = document.querySelector('.new-btn');
const listForm = document.querySelector('.list__form');
const todoLists = document.querySelector('.todoLists');
const listing = document.querySelector('.listing');
const invisibleBtn = document.querySelector('.invisible-btn');
const todayDate = document.querySelector('.date');
const alert = document.querySelector('.alert');
const alertOkayBtn = document.querySelector('.alert__okay');
const TodosLocal = 'toDos';

let toDos = [];

const dateDate = new Date();
let week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let years = dateDate.getFullYear();
let month = dateDate.getMonth() + 1;
let date = dateDate.getDate();
let today = dateDate.getDay();
let todayLabel = week[today];

function saveToDos() {
  localStorage.setItem(TodosLocal, JSON.stringify(toDos));
}

function dateSet() {
  todayDate.innerText = `${years}년 ${month}월 ${date}일 ${todayLabel}.`;
}

let toDoObject = {};

function paintToDo(text, id, checked = false) {
  text = text.trim();
  if (text === '') {
    alert.style.display = 'flex';
    return false;
  } else {
    const newId = toDos.length + 1;
    toDoObject = {
      text: text,
      id: newId,
      check: checked,
    };

    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const input = document.createElement('input');
    delBtn.className = 'del-btn';

    li.innerHTML = `
        <label for="${newId}">
          <span class="check-btn"></span>
          <span class="text">${text}</span>
        </label>
        `;

    input.type = 'checkbox';
    input.id = `${newId}`;
    li.prepend(input);
    li.appendChild(delBtn);
    todoLists.appendChild(li);
    li.className = newId;
    delBtn.innerHTML = `<i class="far fa-trash-alt"></i>`;
    delBtn.addEventListener('click', deleteList);
    todoLists.addEventListener('change', inputCheck);
    toDos.push(toDoObject);
    saveToDos();

    const inputEl = document.getElementById(id);
    if (inputEl === null) {
      return false;
    } else {
      inputEl.checked = toDoObject.check;
    }
  }
}

function inputCheck(e) {
  const targetId = e.target.id - 1;
  const targetCheck = e.target.checked;
  const input = e.target;
  toDos[targetId].check = targetCheck;
  input.setAttribute('checked', targetCheck);
  saveToDos();
}

function alertBtnClick() {
  alertOkayBtn.addEventListener('click', () => {
    alert.style.display = 'none';
  });
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
  const currentValue = listing.value;
  paintToDo(currentValue);
  listing.value = '';
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TodosLocal);

  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text, toDo.id, toDo.check);
    });
  }
}

function inputEvent() {
  invisibleBtn.addEventListener('click', (e) => {
    invisibleBtn.style.visibility = 'hidden';
    setTimeout(function () {
      newBtn.style.transition = '700ms ease';
      newBtn.classList.add('btn-transition');
      invisibleBtn.classList.add('btn-transition');
      listing.style.visibility = 'visible';
    }, 300);
  });

  newBtn.addEventListener('click', (e) => {
    listing.style.visibility = 'hidden';
    newBtn.style.transition = '700ms ease';
    newBtn.classList.remove('btn-transition');
    invisibleBtn.classList.remove('btn-transition');
    setTimeout(function () {
      invisibleBtn.style.visibility = 'visible';
    }, 600);
    e.preventDefault();
    const currentValue = listing.value;
    paintToDo(currentValue);
    listing.value = '';
  });
}

function init() {
  loadToDos();
  listForm.addEventListener('submit', handleSubmit);
  inputEvent();
  dateSet();
  alertBtnClick();
}

init();
