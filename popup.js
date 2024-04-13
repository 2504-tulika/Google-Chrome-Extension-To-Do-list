document.addEventListener('DOMContentLoaded', function() {
  loadTasks();

  document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      addTask();
    }
  });
});

function addTask() {
  var taskInput = document.getElementById('taskInput');
  var taskText = taskInput.value.trim();

  if (taskText !== '') {
    var taskList = document.getElementById('taskList');
    var newTask = document.createElement('li');

    // Create checkbox
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        newTask.classList.add('completed');
        setTimeout(() => {
          taskList.removeChild(newTask);
          saveTasks();
        }, 2000);
      } else {
        newTask.classList.remove('completed');
      }
    });

    // Create label for task text
    var label = document.createElement('label');
    label.textContent = taskText;

    newTask.appendChild(checkbox);
    newTask.appendChild(label);

    taskList.appendChild(newTask);
    taskInput.value = '';
    saveTasks();
  }
}

function loadTasks() {
  chrome.storage.sync.get('tasks', function(data) {
    if (data.tasks) {
      var taskList = document.getElementById('taskList');
      data.tasks.forEach(function(taskText) {
        var newTask = document.createElement('li');

        // Create checkbox
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', function() {
          if (this.checked) {
            newTask.classList.add('completed');
            setTimeout(() => {
              taskList.removeChild(newTask);
              saveTasks();
            }, 2000);
          } else {
            newTask.classList.remove('completed');
          }
        });

        // Create label for task text
        var label = document.createElement('label');
        label.textContent = taskText;

        newTask.appendChild(checkbox);
        newTask.appendChild(label);

        taskList.appendChild(newTask);
      });
    }
  });
}

function saveTasks() {
  var tasks = [];
  document.querySelectorAll('#taskList li label').forEach(function(label) {
    tasks.push(label.textContent);
  });
  chrome.storage.sync.set({ 'tasks': tasks });
}
