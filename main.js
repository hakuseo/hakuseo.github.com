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

function paintToDo(text) {
  text = text.trim();
  if (text === '') {
    alert.style.display = 'flex';
    return false;
  } else if (text.length > 50) {
    console.log('none');
    return false;
  } else {
    const newId = toDos.length + 1;
    const toDoObject = {
      text: text,
      id: newId,
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
    input.addEventListener('click', (e) => {
      const chkBox = e.target;
      const chkBoxState = chkBox.checked;
      toDoObject.check = chkBoxState;
    });
    toDos.push(toDoObject);
    saveToDos();
  }
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

// function keyEvent() {
//   window.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter') {
//       invisibleBtn.style.visibility = 'hidden';
//       setTimeout(function () {
//         newBtn.style.transition = '700ms ease';
//         newBtn.classList.add('btn-transition');
//         invisibleBtn.classList.add('btn-transition');
//         listing.style.visibility = 'visible';
//       }, 100);
//     }
//   });

//   window.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape') {
//       listing.style.visibility = 'hidden';
//       newBtn.style.transition = '700ms ease';
//       newBtn.classList.remove('btn-transition'),
//         invisibleBtn.classList.remove('btn-transition');
//       setTimeout(function () {
//         invisibleBtn.style.visibility = 'visible';
//       }, 600);
//     }
//   });
// }

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
