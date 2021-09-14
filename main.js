const newBtn = document.querySelector('.new-btn');
const listForm = document.querySelector('.list-form');
const todoLists = document.querySelector('.todoLists');
const exit = document.querySelector('.exit');
const title = document.querySelector('.title');
const plus = document.querySelector('.plus');
const listing = document.querySelector('.listing');
const invisibleBtn = document.querySelector('.invisible-btn');
const todayDate = document.querySelector('.date');
const alert = document.querySelector('.alert');
const alertOkayBtn = document.querySelector('.alert__okay');
const TodosLocal = 'toDos';

let toDos = [];

const dateDate = new Date();
let week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let month = dateDate.getMonth() + 1;
let date = dateDate.getDate();
let today = dateDate.getDay();
let todayLabel = week[today];

function saveToDos() {
  localStorage.setItem(TodosLocal, JSON.stringify(toDos));
}

function dateSet() {
  todayDate.innerText = `${month}/${date} ${todayLabel}.`;
}

function paintToDo(text) {
  // for (let i = 0; i < text.length; i++) {
  //   console.log(text);
  // }
  text = text.trim();
  if (text == '') {
    alert.style.display = 'flex';

    return false;
  } else if (text.length > 50) {
    alert('너무길어');
    return false;
  } else {
    const newId = toDos.length + 1;
    const toDoObject = {
      text: text,
      id: newId,
    };

    const li = document.createElement('li');
    const delBtn = document.createElement('button');

    delBtn.className = 'del-btn';
    li.innerHTML = `
        <input type="checkbox" id="${newId}">
        <label for="${newId}">
          <span class="check-btn"></span>
          <span class="text">${text}</span>
        </label>
        `;

    li.appendChild(delBtn);
    todoLists.appendChild(li);
    li.className = newId;
    delBtn.innerHTML = `<i class="far fa-trash-alt"></i>`;
    delBtn.addEventListener('click', deleteList);
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

// function enterEvent() {
//   window.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter') {
//       invisibleBtn.style.visibility = 'hidden';
//       newBtn.style.transition = '700ms ease';
//       newBtn.style.transform = 'translate(115px)';
//       listing.style.visibility = 'visible';
//       listing.classList.add('fade-in');
//       listing.classList.remove('fade-out');
//     }
//   });
// }

// function escEvent() {
//   window.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape') {
//       newBtn.style.transform = 'translate(-50px)';
//       listing.style.visibility = 'hidden';
//       invisibleBtn.style.visibility = 'visible';
//       listing.classList.add('fade-out');
//       listing.classList.remove('fade-in');
//     }
//   });
// }

// function inputEvent() {
//   invisibleBtn.addEventListener('click', (e) => {
//     invisibleBtn.style.visibility = 'hidden';
//     newBtn.style.transition = '700ms ease';
//     newBtn.style.transform = 'translate(115px)';
//     listing.classList.add('fade-in');
//     listing.classList.remove('fade-out');
//     listing.style.visibility = 'visible';
//   });

//   newBtn.addEventListener('click', (e) => {
//     invisibleBtn.style.visibility = 'visible';
//     newBtn.style.transform = 'translate(-50px)';
//     listing.style.visibility = 'hidden';
//     listing.classList.add('fade-out');
//     listing.classList.remove('fade-in');
//     e.preventDefault();
//     const currentValue = listing.value;
//     paintToDo(currentValue);
//     listing.value = '';
//   });
// }

// function lineThrough() {
//   const spanText = document.querySelector('.text');
//   spanText.addEventListener('click', (e) => {
//     spanText.style.textDecoration = 'line-through';
//     spanText.style.color = 'var(--color-gray4)';
//     spanText.style.transition = '500ms ease';
//   });
// }

let windowWidth = window.innerWidth;
console.log(windowWidth);

function windowWidthEffects() {
  if (windowWidth < 768) {
    function enterEvent() {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          invisibleBtn.style.visibility = 'hidden';
          newBtn.style.transition = '700ms ease';
          newBtn.style.transform = 'translate(60px)';
          listing.style.visibility = 'visible';
          listing.classList.add('fade-in');
          listing.classList.remove('fade-out');
        }
      });
    }

    function escEvent() {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          newBtn.style.transform = 'translate(-45px)';
          listing.style.visibility = 'hidden';
          invisibleBtn.style.visibility = 'visible';
          listing.classList.add('fade-out');
          listing.classList.remove('fade-in');
        }
      });
    }

    function inputEvent() {
      invisibleBtn.addEventListener('click', (e) => {
        invisibleBtn.style.visibility = 'hidden';
        newBtn.style.transition = '700ms ease';
        newBtn.style.transform = 'translate(52px)';
        listing.classList.add('fade-in');
        listing.classList.remove('fade-out');
        listing.style.visibility = 'visible';
      });

      newBtn.addEventListener('click', (e) => {
        invisibleBtn.style.visibility = 'visible';
        newBtn.style.transform = 'translate(-45px)';
        listing.style.visibility = 'hidden';
        listing.classList.add('fade-out');
        listing.classList.remove('fade-in');
        e.preventDefault();
        const currentValue = listing.value;
        paintToDo(currentValue);
        listing.value = '';
      });
    }
    enterEvent();
    escEvent();
    inputEvent();
  } else {
    console.log('desktop');
    function enterEvent() {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          invisibleBtn.style.visibility = 'hidden';
          newBtn.style.transition = '700ms ease';
          newBtn.style.transform = 'translate(115px)';
          listing.style.visibility = 'visible';
          listing.classList.add('fade-in');
          listing.classList.remove('fade-out');
        }
      });
    }

    function escEvent() {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          newBtn.style.transform = 'translate(-50px)';
          listing.style.visibility = 'hidden';
          invisibleBtn.style.visibility = 'visible';
          listing.classList.add('fade-out');
          listing.classList.remove('fade-in');
        }
      });
    }

    function inputEvent() {
      invisibleBtn.addEventListener('click', (e) => {
        invisibleBtn.style.visibility = 'hidden';
        newBtn.style.transition = '700ms ease';
        newBtn.style.transform = 'translate(115px)';
        listing.classList.add('fade-in');
        listing.classList.remove('fade-out');
        listing.style.visibility = 'visible';
      });

      newBtn.addEventListener('click', (e) => {
        invisibleBtn.style.visibility = 'visible';
        newBtn.style.transform = 'translate(-50px)';
        listing.style.visibility = 'hidden';
        listing.classList.add('fade-out');
        listing.classList.remove('fade-in');
        e.preventDefault();
        const currentValue = listing.value;
        paintToDo(currentValue);
        listing.value = '';
      });
    }
    enterEvent();
    escEvent();
    inputEvent();
  }
}

windowWidthEffects();

let mobileVer = window.matchMedia('screen and (max-width: 768px)');
mobileVer.addListener(function (e) {
  console.log(e);
  if (e.matches) {
    function enterEvent() {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          invisibleBtn.style.visibility = 'hidden';
          newBtn.style.transition = '700ms ease';
          newBtn.style.transform = 'translate(60px)';
          listing.style.visibility = 'visible';
          listing.classList.add('fade-in');
          listing.classList.remove('fade-out');
        }
      });
    }

    function escEvent() {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          newBtn.style.transform = 'translate(-45px)';
          listing.style.visibility = 'hidden';
          invisibleBtn.style.visibility = 'visible';
          listing.classList.add('fade-out');
          listing.classList.remove('fade-in');
        }
      });
    }

    function inputEvent() {
      invisibleBtn.addEventListener('click', (e) => {
        invisibleBtn.style.visibility = 'hidden';
        newBtn.style.transition = '700ms ease';
        newBtn.style.transform = 'translate(52px)';
        listing.classList.add('fade-in');
        listing.classList.remove('fade-out');
        listing.style.visibility = 'visible';
      });

      newBtn.addEventListener('click', (e) => {
        invisibleBtn.style.visibility = 'visible';
        newBtn.style.transform = 'translate(-45px)';
        listing.style.visibility = 'hidden';
        listing.classList.add('fade-out');
        listing.classList.remove('fade-in');
        e.preventDefault();
        const currentValue = listing.value;
        paintToDo(currentValue);
        listing.value = '';
      });
    }
    enterEvent();
    escEvent();
    inputEvent();
  } else {
    console.log('desktop');
    function enterEvent() {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          invisibleBtn.style.visibility = 'hidden';
          newBtn.style.transition = '700ms ease';
          newBtn.style.transform = 'translate(115px)';
          listing.style.visibility = 'visible';
          listing.classList.add('fade-in');
          listing.classList.remove('fade-out');
        }
      });
    }

    function escEvent() {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          newBtn.style.transform = 'translate(-50px)';
          listing.style.visibility = 'hidden';
          invisibleBtn.style.visibility = 'visible';
          listing.classList.add('fade-out');
          listing.classList.remove('fade-in');
        }
      });
    }

    function inputEvent() {
      invisibleBtn.addEventListener('click', (e) => {
        invisibleBtn.style.visibility = 'hidden';
        newBtn.style.transition = '700ms ease';
        newBtn.style.transform = 'translate(115px)';
        listing.classList.add('fade-in');
        listing.classList.remove('fade-out');
        listing.style.visibility = 'visible';
      });

      newBtn.addEventListener('click', (e) => {
        invisibleBtn.style.visibility = 'visible';
        newBtn.style.transform = 'translate(-50px)';
        listing.style.visibility = 'hidden';
        listing.classList.add('fade-out');
        listing.classList.remove('fade-in');
        e.preventDefault();
        const currentValue = listing.value;
        paintToDo(currentValue);
        listing.value = '';
      });
    }
    enterEvent();
    escEvent();
    inputEvent();
  }
});

function init() {
  loadToDos();
  listForm.addEventListener('submit', handleSubmit);
  // inputEvent();
  // enterEvent();
  // escEvent();
  dateSet();
  alertBtnClick();
  // lineThrough();
}

init();
