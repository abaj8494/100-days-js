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
        <p>
            ${todo}
            <button onclick="
                todos.splice(${i}, 1);
                renderTodoList();
            ">Delete</button>
        </p>
        `;
        todosHTML += todoHTML;
    }

    document.querySelector('.js-todo-list').innerHTML = todosHTML;
}

function addTodo() {
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;
    todos.push(name)
    console.log(todos);

    inputElement.value = ''; // resets text of textbox
    renderTodoList();
}

