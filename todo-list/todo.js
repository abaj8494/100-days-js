const todos = []; // can be const!
//localStorage.setItem('todos', todos) // todos are array of str, not str.

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTodo();
    }
})

function renderTodoList() {
    let todosHTML = '';

    for (let i = 0; i < todos.length; i++) {
        let todo = todos[i];
        const todoHTML = `
        <div>${todo.name}</div>
        <div>${todo.dueDate}</div>
        <button class="delete-button" onclick="
            todos.splice(${i}, 1);
            renderTodoList();
        ">Delete</button>
        `;
        todosHTML += todoHTML;
    }

    document.querySelector('.js-todo-list').innerHTML = todosHTML;
}

function addTodo() {
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;

    if (name === '') {
        alert("You must enter a Todo!");
        return;
    }
    const dueDate = document.querySelector('.js-date-input').value;
    /*
    I think these two are the same:
        todoInstance = {'name' : name, 'dueDate': dueDate}; 
        todoInstance = {name : name, dueDate: dueDate}; 
    */
    // furthermore, this is the shorthand property:
    todoInstance = { name, dueDate }

    todos.push(todoInstance)

    inputElement.value = ''; // resets text of textbox
    renderTodoList();
}

