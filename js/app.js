 const app = {
  todo: document.getElementById('todo'),
  list: null,
  counter: null,
  init: () => {
    app.createTitle();
    app.createForm();
    app.createCount();
    app.createList();
    
    app.createTask('CP 1 Maquetter une application.', true);
    app.createTask('CP 2 Réaliser une interface statique et adaptable.', true);
    app.createTask('CP 3 Développer une interface utilisateur web dynamique.', false);
  },
  createTitle:() => {
    const title = document.createElement('h1');
    title.id = "todo-title";
    title.textContent = "TODO List !";
    
    app.todo.appendChild(title);
  },
  createForm: () => {
    
    const form = document.createElement('form');
    form.id = 'todo-form';
    
    form.addEventListener('submit', app.onSubmit);

    const input = document.createElement('input');
    input.type = 'text';
    input.setAttribute('placeholder', 'Ajouter une tâche');
    input.id = 'todo-input';
    input.name = 'newTask';

    form.appendChild(input);

    app.todo.appendChild(form);
  },
  createCount: () => {
    app.counter = document.createElement('div');
    app.counter.id = 'todo-counter';

    app.todo.appendChild(app.counter);
  },
  createList: () => {
    app.list = document.createElement('ul');
    app.list.id = 'todo-list';

    app.todo.appendChild(app.list);
  },
  createTask: (taskName, done) => {
    const task = document.createElement('li');
    task.className = done ? 'todo-item todo-item--done' : 'todo-item';

    const check = document.createElement('input');
    check.className = 'todo-item-cb';
    check.type = 'checkbox';

    const newId = document.querySelectorAll('.todo-item').length + 1;
    check.id = newId;
    check.checked = done;
    check.addEventListener('change', app.onCheckboxChange);

    task.appendChild(check);

    const label = document.createElement('label');
    label.className = 'todo-item-text';
    label.setAttribute('for', newId);
    label.textContent = taskName;
    task.appendChild(label);

    app.list.appendChild(task);
  
    app.updateCounter();
  },
  onSubmit: (event) => {
    event.preventDefault();

    app.createTask(event.target.childNodes[0].value, false);
    
    event.target.childNodes[0].value = '';
  },
  onCheckboxChange: (event) => {
    event.target.closest('li').classList.toggle('todo-item--done');
    app.updateCounter();
  },
  updateCounter: () => {
    const taskNumber = document.querySelectorAll('.todo-item:not(.todo-item--done)').length;
    if (taskNumber === 1) {
      app.counter.textContent = 'Une tâche en cours';
    } else if (taskNumber === 0) {
      app.counter.textContent = 'Aucune tâche en cours';
    } else {
      app.counter.textContent = taskNumber + " taches en cours";
    }
  }
};

document.addEventListener('DOMContentLoaded', app.init);