// ./node_modules/.bin/eslint ./resources/js/app.js

console.log('JS successfully loaded');

const todoList = {
    todos: [],
    displayTodos() {
        if (this.todos.length === 0) {
            console.log('TODO list is empty!');
        } else {
            console.log('TODOs:');
            for (let i = 0; i < this.todos.length; i++) {
                console.log(
                    this.todos[i].status === true ?
                        `(x) ${this.todos[i].todoText}` :
                        `( ) ${this.todos[i].todoText}`);
                // if (this.todos[i].status === true) {
                //     console.log('(x)', this.todos[i].todoText);
                // } else {
                //     console.log('( )', this.todos[i].todoText);
                // }
            }
        }
    },
    addTodo(todoText) {
        this.todos.push({
            todoText,
            status: false
        });
        this.displayTodos();
    },
    changeTodo(index, todoText) {
        this.todos[index].todoText = todoText;
        this.displayTodos();
    },
    deleteTodo(index) {
        this.todos.splice(index, 1);
        this.displayTodos();
    },
    toggleStatus(index) {
        const todo = this.todos[index];
        todo.status = !todo.status;
        this.displayTodos();
    },
    toggleAll() {
        const totalTodos = this.todos.length;
        let completedTodos = 0;
        // Get number of completed Todos
        for (let i = 0; i < totalTodos; i++) {
            if (this.todos[i].status === true) {
                completedTodos++;
            }
        }
        // Toggle All
        for (let i = 0; i < totalTodos; i++) {
            (completedTodos === totalTodos) ?
                this.todos[i].status = false :
                this.todos[i].status = true;
        }
        this.displayTodos();
    }
};

// Access buttons
const displayButton = document.getElementById('btn-display');

const addButton = document.getElementById('btn-add');
const addTextInput = document.getElementById('input-add');

const changeButton = document.getElementById('btn-change');
const changePositionInput = document.getElementById('input-position-change');
const changeTextInput = document.getElementById('input-change');

const deleteButton = document.getElementById('btn-delete');
const deletePositionInput = document.getElementById('input-position-delete');

const toggleOneButton = document.getElementById('btn-completed');
const togglePositionInput = document.getElementById('input-position-completed');

const toggleAllButton = document.getElementById('btn-toggle');

// Run functions
displayButton.addEventListener('click', () => {
    todoList.displayTodos();
});

addButton.addEventListener('click', () => {
    todoList.addTodo(addTextInput.value);
    addTextInput.value = '';
});

changeButton.addEventListener('click', () => {
    todoList.changeTodo(changePositionInput.valueAsNumber, changeTextInput.value);
    changePositionInput.value = '';
    changeTextInput.value = '';
});

deleteButton.addEventListener('click', () => {
    todoList.deleteTodo(deletePositionInput.valueAsNumber);
    deletePositionInput.value = '';
});

toggleOneButton.addEventListener('click', () => {
    todoList.toggleStatus(togglePositionInput.valueAsNumber);
    togglePositionInput.value = '';
});

toggleAllButton.addEventListener('click', () => {
    todoList.toggleAll();
});
