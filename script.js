// Dit is de locatie van mijn todo-list
const todoList = document.querySelector('#todo-list');

const setTodoList = async () => {
    const data = await getTodoList();
    const todoListItems = data;
    console.log(todoListItems);
    // functie die voor alle toegevoegde taken elementen aanmaakt
    todoListItems.forEach(listitem => {

        // aanmaken van elementen
        const task = document.createElement('div');
        const checkBox = document.createElement('input');
        const taskContent = document.createElement('p');
        const deleteButton = document.createElement('div');

        // toevoegen van waarden
        task.setAttribute("id", "taskItem");
        checkBox.setAttribute("type", "checkbox");
        taskContent.innerHTML = listitem.description;
        deleteButton.setAttribute("id", "trashCan");

        // toevoegen aan parent elementen
        task.appendChild(checkBox);
        task.appendChild(taskContent);
        task.appendChild(deleteButton);
        todoList.appendChild(task);

        // als done === 'true' ==> checkbox checked en taak doorgestreept
        if (listitem.done === 'true') {
            taskContent.setAttribute('style', ' text-decoration: line-through');
            checkBox.setAttribute('checked', 'true');
        } else {
            taskContent.setAttribute('style', ' text-decoration: none');
        }

        // eventListener toevoegen aan deleteButton
        deleteButton.addEventListener("click", () => {
            fetch(`https://wincacademydatabase.firebaseio.com/janneke/tasks/${listitem.id}.json`, { method: 'DELETE' })
                .then((data) => {
                    window.location.reload();
                });
        })

        // eventListener toevoegen aan checkBox
        checkBox.addEventListener("click", () => {
            if (checkBox.checked) {
                const doneValue = true;
                taskContent.setAttribute('style', ' text-decoration: line-through')
                const data = { "description": `${listitem.description}`, "done": `${doneValue}` }
                fetch(`https://wincacademydatabase.firebaseio.com/janneke/tasks/${listitem.id}.json`, { method: 'PUT', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(data), })
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            } else {
                const doneValue = false;
                taskContent.setAttribute('style', ' text-decoration: none')
                const data = { "description": `${listitem.description}`, "done": `${doneValue}` }
                fetch(`https://wincacademydatabase.firebaseio.com/janneke/tasks/${listitem.id}.json`, { method: 'PUT', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(data), })
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            }
        })
    })
};

setTodoList();

// Event Listener toevoegen aan addTaskButton
const addTaskButton = document.querySelector('#addTaskButton');
addTaskButton.addEventListener("click", () => {
    const getInputValue = () => {
        const addedTask = document.getElementById("addTaskInputField").value;
        const data = { "description": `${addedTask}`, "done": false };
        fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(data), })
            .then((response) => response.json())
            .then((data) => {
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
            });
    }
    getInputValue();
})