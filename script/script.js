// De plek waar de Todo-List op de DOM terecht moet komen:
const todoList = document.querySelector('#todo-list');

// Functie die elke nieuwe taak toevoegt aan de DOM
const createTask = (newTask) => {
    // Elementen creeeren:
    const task = document.createElement('div');
    const checkBox = document.createElement('input');
    const taskContent = document.createElement('p');
    const deleteButton = document.createElement('i');

    // Aan de elementen waarden toevoegen
    task.setAttribute("id", "taskItem");
    checkBox.setAttribute("type", "checkbox");
    taskContent.classList = "list-item"
    taskContent.innerHTML = newTask.description;
    deleteButton.classList = "far fa-trash-alt";
    
    // Elementen toevoegen aan parent elementen
    task.appendChild(checkBox);
    task.appendChild(taskContent);
    task.appendChild(deleteButton);
    todoList.appendChild(task)

    // als done === 'true' ==> checkbox checked en taak doorgestreept
    if (newTask.done === 'true') {
        taskContent.setAttribute('style', 'text-decoration: line-through; color: grey; font-style: italic');
        // taskContent.setAttribute('style', 'color: lightgray');
        checkBox.setAttribute('checked', 'true');
    } else {
        taskContent.setAttribute('style', ' text-decoration: none');
    }

    // Event Listener toevoegen aan checkbox zodat API gePUT wordt van false naar true
    checkBox.addEventListener("click", () => {
        if (checkBox.checked) {
            const doneValue = true;
            taskContent.setAttribute('style', ' text-decoration: line-through; color: grey; font-style: italic')
            const data = { "description": `${newTask.description}`, "done": `${doneValue}` }
            fetch(`https://wincacademydatabase.firebaseio.com/janneke/tasks/${newTask.id}.json`, { method: 'PUT', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(data), })
                .then(response => response.text())
                .catch(error => console.log('error', error));
        } else {
            const doneValue = false;
            taskContent.setAttribute('style', ' text-decoration: none; color: #4A4D4F; font-style: none')
            const data = { "description": `${newTask.description}`, "done": `${doneValue}` }
            fetch(`https://wincacademydatabase.firebaseio.com/janneke/tasks/${newTask.id}.json`, { method: 'PUT', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(data), })
                .then(response => response.text())
                .catch(error => console.log('error', error));
        }
    })
    
    // eventListener toevoegen aan deleteButton
    deleteButton.addEventListener("click", () => {
        fetch(`https://wincacademydatabase.firebaseio.com/janneke/tasks/${newTask.id}.json`, { method: 'DELETE' })
        .then((data) => {
            window.location.reload();
        })
    })
}

const setTodoList = async () => {
    const data = await getTodoList();
    data.forEach(item => {
        createTask(item)
})
}

const submitButton = document.querySelector('#addTaskButton');
submitButton.addEventListener("click", (event) => {
    const addedTask = document.querySelector("#addTaskInputField").value;
    const data = { "description": `${addedTask}`, "done": false };
    fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(data), })
        .then((response) => response.json())
        .then(() => {
            createTask(data)
            })
        .catch((error) => {
             console.error(error);
        });
})

setTodoList()