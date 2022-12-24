import axios from "axios";

function convertTasksToDataModel(todoTasksString) {
    const todoTasksArray = (todoTasksString.split(",")).map(item => item.trim());
    return todoTasksArray.map(task => ({
        content: task,
        createdAt: Date.now(),
        updatedAd: Date.now()
    }));
};

export async function getTodos(userId) {
    const response = await axios.get("/todos/" + String(userId));
    return response.data.todosList;
};

export async function postTodo(userId, todoTitle, todoTasksString) {
    const todoTasksData = convertTasksToDataModel(todoTasksString);
    const dataBody = {
        todoName: todoTitle,
        todoTasks: todoTasksData,
        urgent: false
    }
    const response = await axios.post("/todos/" + String(userId), dataBody);
};

export async function editTodo(userId, todoId, todosList, newTodoTitle, newTodoTasksString) {
    const currentTodo = todosList.filter(todo => todo._id === todoId)[0];
    const currentTodoTasks = currentTodo.tasks;
    const newTodoTasksData = convertTasksToDataModel(newTodoTasksString);

    // Operation: return a new array where it contains task objects from old currentTodoTasks 'that are in newTodoTasks'
    // and task objects from newTodoTasks 'that are not in currentTodoTasks'
    let updatedTodoTasksData = currentTodoTasks.filter((task) => {
        const array = newTodoTasksData.filter(_task => task.content === _task.content);
        return array.length
    });
    updatedTodoTasksData = updatedTodoTasksData.concat(newTodoTasksData.filter((task) => {
        const array = currentTodoTasks.filter(_task => task.content === _task.content)
        return !array.length
    }));

    const dataBody = {
        todoName: newTodoTitle, 
        todoTasksList: updatedTodoTasksData, 
        urgent: false
    }
    const response = await axios.put(`/todos/${ String(userId) }/${ String(todoId) }`, dataBody)
};

export async function deleteTodo(userId, todoId) {
    const response = await axios.delete(`/todos/${ String(userId) }/${ String(todoId) }`)
};

export async function deleteTaskFromTodo(userId, todoId, taskId, todoObject) {
    const updatedTodoTasksData = todoObject.tasks.filter(task => task._id !== taskId);
    const dataBody = {
        todoName: todoObject.title,
        todoTasksList: updatedTodoTasksData,
        urgent: false
    }
    const response = await axios.put(`/todos/${ String(userId) }/${ String(todoId) }`, dataBody)
};

export async function deleteTodoFromList(userId, todoId) {
    const dataBody = {
        userId: userId,
        id: todoId
    };
    const response = await axios.delete(`/todos/${ String(userId) }/${ String(todoId) }`, dataBody)
};