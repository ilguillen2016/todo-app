// ./node_modules/.bin/eslint ./resources/js/app.js

console.log('JS successfully loaded');

const todoList = {
    todos: [],
    addTodo(todoText) {
        this.todos.push({
            todoText,
            status: false
        });
    },
    changeTodo(index, todoText) {
        this.todos[index].todoText = todoText;
    },
    deleteTodo(index) {
        this.todos.splice(index, 1);
    },
    toggleStatus(index) {
        const todo = this.todos[index];
        todo.status = !todo.status;
    },
    toggleAll() {
        const totalTodos = this.todos.length;
        let completedTodos = 0;

        // Get number of completed Todos
        this.todos.forEach((todo) => {
            if (todo.status === true) {
                completedTodos++;
            }
        });

        // Toggle All
        this.todos.forEach((todo) => {
            completedTodos === totalTodos ?
                todo.status = false :
                todo.status = true;
        });
    }
};

// Access buttons
const addButton = document.getElementById('btn-add');
const addTextInput = document.getElementById('input-add');

const changeButton = document.getElementById('btn-change');
const changePositionInput = document.getElementById('input-position-change');
const changeTextInput = document.getElementById('input-change');

const toggleOneButton = document.getElementById('btn-completed');
const togglePositionInput = document.getElementById('input-position-completed');

const toggleAllButton = document.getElementById('btn-toggle');

// Refactoring code
const view = {
    displayTodos() {
        const ul = document.querySelector('ul');
        ul.innerHTML = '';

        todoList.todos.forEach((todo, index) => {
            const li = document.createElement('li');
            let todoWithCheckMark = '';

            todoWithCheckMark =
                (todo.status === true ?
                    `(x) ${todo.todoText}` :
                    `( ) ${todo.todoText}`);

            li.id = index;
            li.textContent = todoWithCheckMark;
            li.appendChild(this.createDeleteButton());
            ul.appendChild(li);
        }, this);
    },
    createDeleteButton() {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn-delete';
        return deleteButton;
    },
    setUpEventListeners() {
        const todosUl = document.querySelector('ul');
        todosUl.addEventListener('click', (event) => {
            // Get the element that was clicked on
            const elementClicked = event.target;

            // Check if elementClicked is a delete button
            if (elementClicked.className === 'btn-delete') {
                // Run deleteButton(index)
                deleteTodo(parseInt(elementClicked.parentNode.id, 10));
            }
        });
    }
};

view.setUpEventListeners();

// Run functions
addButton.addEventListener('click', () => {
    todoList.addTodo(addTextInput.value);
    addTextInput.value = '';
    view.displayTodos();
});

function deleteTodo(index) {
    todoList.deleteTodo(index);
    view.displayTodos();
}

changeButton.addEventListener('click', () => {
    todoList.changeTodo(changePositionInput.valueAsNumber, changeTextInput.value);
    changePositionInput.value = '';
    changeTextInput.value = '';
    view.displayTodos();
});

toggleOneButton.addEventListener('click', () => {
    todoList.toggleStatus(togglePositionInput.valueAsNumber);
    togglePositionInput.value = '';
    view.displayTodos();
});

toggleAllButton.addEventListener('click', () => {
    todoList.toggleAll();
    view.displayTodos();
});
