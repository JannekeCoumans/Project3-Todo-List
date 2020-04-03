const apiUrl = "https://wincacademydatabase.firebaseio.com/janneke/tasks.json";

const getTodoList = async () => {
    try {
        const result = await fetch(apiUrl, { method: 'GET' });
        const data = await result.json();
        let tasks = Object.keys(data).map(key => ({
            id: key,
            description: data[key].description,
            done: data[key].done
        }));
        return tasks;
    } catch (error) {
        console.log(error);
    }
}