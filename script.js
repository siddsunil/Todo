const tasksElement = document.querySelector(".tasks");
const tasksLeftElement = document.querySelector(".task-info-bottom p");
const addTaskInput = document.querySelector(".container > input");
const completeTasksElement = document.querySelectorAll(".task-info-top p")[0];
const clearCompleteTasksElement =
  document.querySelectorAll(".task-info-top p")[1];
const changeShowStatus = document.querySelectorAll(".task-info-bottom p span");

let Alltasks = [];

let tasks = Alltasks;

function render() {
  tasksElement.innerHTML = "";
  let tasksLeft = 0;

  if (tasks.length === 0) {
    tasksElement.innerHTML = `<div class="task">
		<p>Nothing to show here</p>
	</div>`;
  }

  for (let task of tasks) {
    let taskCompleted = task.completed ? "checked" : "";
    if (!task.completed) tasksLeft++;

    let taskElement = `<div class="task" data-id=${task.id}>
		<div>
		  <input type="checkbox" class="checkbox" ${taskCompleted} />
		  <p>${task.title}</p>
		</div>
		<p class="remove"><i class="fa-regular fa-circle-xmark"></i></p>
	</div>`;

    tasksElement.innerHTML += taskElement;
  }

  tasksLeftElement.innerHTML = `${tasksLeft} tasks left`;

  initializeCheckboxEventListeners();
  initializeDeleteEventListeners();
}

function addTask(title) {
  let task = {
    id: tasks.length + 1,
    title: title,
    completed: false,
  };

  tasks.push(task);
  render();
}

function toggleTask(id) {
  let task = tasks.find((task) => task.id === id);
  task.completed = !task.completed;
  render();
}

function initializeCheckboxEventListeners() {
  const taskToggleCheckboxes = document.querySelectorAll(".task .checkbox");

  for (let checkbox of taskToggleCheckboxes) {
    checkbox.addEventListener("change", function (event) {
      let taskId = event.target.parentElement.parentElement.dataset.id;
      toggleTask(parseInt(taskId));
    });
  }
}

function removeTask(id) {
  tasks = tasks.filter((task) => {
    return task.id != id;
  });

  render();
}

function initializeDeleteEventListeners() {
  const taskDeleteButtons = document.querySelectorAll(".remove i");
  console;

  for (let taskDeleteButton of taskDeleteButtons) {
    taskDeleteButton.addEventListener("click", function (event) {
      let taskId = event.target.parentElement.parentElement.dataset.id;
      removeTask(parseInt(taskId));
    });
  }
}

function initialise() {
  document.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      let title = addTaskInput.value;
      if (title) addTask(title);
      addTaskInput.value = "";
    }
  });

  completeTasksElement.addEventListener("click", function () {
    for (let task of tasks) {
      task.completed = true;
    }
    render();
  });

  clearCompleteTasksElement.addEventListener("click", function () {
    tasks = tasks.filter((task) => {
      return !task.completed;
    });
    render();
  });

  for (let button of changeShowStatus) {
    button.addEventListener("click", function (e) {
      changeShowStatus[0].classList.remove("text-active");
      changeShowStatus[1].classList.remove("text-active");
      changeShowStatus[2].classList.remove("text-active");

      let status = e.target.innerHTML.toLowerCase();
      if (status === "all") {
        tasks = Alltasks;
      } else if (status === "uncompleted") {
        tasks = Alltasks.filter((task) => {
          return !task.completed;
        });
      } else if (status === "completed") {
        tasks = Alltasks.filter((task) => {
          return task.completed;
        });
      }

      e.target.classList.add("text-active");
      render();
    });
  }

  render();
}

initialise();
