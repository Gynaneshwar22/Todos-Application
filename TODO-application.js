
        
let todoInput = document.getElementById('todoInput');
let todosList = document.getElementById('todos');

// Load saved todos from localStorage when the page loads
window.onload = () => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
        savedTodos.forEach(todo => {
            addTodoToList(todo.text, todo.completed);
        });
    }
};

function addTodo() {
    const todoText = todoInput.value.trim();

    if (todoText === '') {
        alert('Please enter a todo!');
        return;
    }

    // Add the todo to the list and localStorage
    addTodoToList(todoText, false);
    
    // Clear the input field
    todoInput.value = '';
}

function addTodoToList(text, completed) {
    // Create a new todo item
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');

    // Create a checkbox for marking completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.checked = completed;
    checkbox.onclick = () => {
        todoTextElement.classList.toggle('completed');
        saveTodos();
    };

    // Create text element for the todo
    const todoTextElement = document.createElement('span');
    todoTextElement.classList.add('todo-text');
    todoTextElement.textContent = text;
    if (completed) {
        todoTextElement.classList.add('completed');
    }

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
        todosList.removeChild(todoItem);
        saveTodos();
    };

    // Append checkbox, text, and button to the todo item
    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoTextElement);
    todoItem.appendChild(deleteButton);

    // Append the todo item to the list
    todosList.appendChild(todoItem);

    // Save the todos in localStorage
    saveTodos();
}

function saveTodos() {
    const todos = [];
    const todoItems = document.querySelectorAll('.todo-item');
    todoItems.forEach(item => {
        const todoText = item.querySelector('.todo-text').textContent;
        const isCompleted = item.querySelector('.checkbox').checked;
        todos.push({ text: todoText, completed: isCompleted });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}