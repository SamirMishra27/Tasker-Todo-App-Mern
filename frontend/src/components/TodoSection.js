import { useEffect } from "react";
import "../index.css"
import cross from "../assets/cross.svg";
import dustbin from "../assets/dustbin.svg";
import useTodoStore from "../utils/todoStore";
import { getTodos, deleteTaskFromTodo, deleteTodoFromList } from "../services/backend";
import { toast } from "react-toastify";
import toastConfig from "../utils/toastConfig";
import appwriteAccount from "../services/appwriteAccount";
import { useNavigate } from "react-router-dom";

function TodoSection() {

    const navigate = useNavigate();
    const userId = useTodoStore((state) => state.userId);

    // Initializing states
    const todosList = useTodoStore((state) => state.todosList);
    const setTodosList = useTodoStore((state) => state.setTodosList);
    
    const setCurrentTodoEditId = useTodoStore((state) => state.setCurrentTodoEditId);
    const setUserId = useTodoStore((state) => state.setUserId);
    
    const lastChange = useTodoStore((state) => state.lastChange);
    const setLastChange = useTodoStore((state) => state.setLastChange);

    const setEditMode = useTodoStore((state) => state.setEditMode);
    const setTodoEditFields = useTodoStore((state) => state.setTodoEditFields);

    // User preferences
    const darkMode = useTodoStore((state) => state.darkMode);

    async function fetch() {
        try {
            
            // Gets the logged user account if exists 
            const userSession = await appwriteAccount.get();
            setUserId(userSession.$id);

            // And then fetches todo data tied to their user ID
            const todosListFetched = await getTodos(userSession.$id);
            setTodosList(todosListFetched);
            
        } catch (error) {
            if (error.response.code === 401) navigate("/login");
        }
    }
    
    useEffect(() => {
        fetch();
    }, [lastChange]);

    // Handle callbacks
    function handleTodoClick(event) {
        const todoId = event.target.dataset.todoid
        const todoData = todosList.filter(todo => todo._id === todoId)[0]
        const todoTasksString = todoData.tasks.map(taskObject => taskObject.content).join(", ")
        
        setEditMode(true);
        setCurrentTodoEditId(todoId);
        setTodoEditFields(todoData.title, todoTasksString);
    };
    
    async function deleteTaskClick(event) {
        event.stopPropagation()
        
        const todoId = event.target.dataset.todoid;
        const taskId = event.target.dataset.taskid;

        const todoObject = todosList.filter(todo => todo._id === todoId)[0];
        await deleteTaskFromTodo(userId, todoId, taskId, todoObject);
        setLastChange(Date.now());
    }

    async function deleteTodoClick(event) {
        event.stopPropagation()

        const todoId = event.target.dataset.todoid;
        const todoName = todosList.filter(todo => todo._id === todoId)[0].title;

        await deleteTodoFromList(userId, todoId);
        setLastChange(Date.now())
        
        toast.warn(`Deleted the Todo '${todoName}'!`, toastConfig);
    }
    
    return (
        <div className={
            "w-full h-auto pl-10 pr-10 pt-6 pb-6 border-t-2 border-t-black border-dashed flex flex-wrap gap-6 overflow-x-visible justify-center " + (darkMode ? "bg-slate-700" : "bg-white")
        }>
        {
            todosList.length ? todosList.map((todoObject) => {

                return <div className="todo-wrapper w-[22%] min-h-[192px] rounded-3xl border-black bg-[#F8EDE3] text-black overflow-hidden hover:shadow-[0px_0px_6px_6px_rgba(128,128,128,0.2)]">
                    <div 
                        className={
                            "todo-title w-full min-h-[20%] pl-4 pr-4 text-lg flex items-center justify-between font-semibold " + 
                            (darkMode ? "bg-[#CEAB93]" : "bg-[#F8EDE3]")
                        }
                        onClick={handleTodoClick}
                        data-todoid={todoObject._id}
                    >
                        {todoObject.title}
                        <div className="delete-todo-part w-8 h-8 rounded-lg border-2 border-red-600 overflow-hidden flex justify-center items-center active:bg-red-300">
                            <img src={dustbin} alt="" 
                                className="w-auto h-[90%] fill-black opacity-0 hover:opacity-100 "
                                data-todoid={todoObject._id}
                                onClick={deleteTodoClick}
                            />
                        </div>
                    </div>
                    <div 
                        className={
                            "todo-tasks-container w-full h-56 pl-4 pr-4 pt-3 pb-8 text-2xl flex flex-wrap justify-start gap-x-2 gap-y-[10px] hover:overflow-y-auto " +
                            (darkMode ? "bg-[#AD8B73]" : "bg-[#DFD3C3]")
                        }
                        onClick={handleTodoClick}
                        data-todoid={todoObject._id}
                    >
                    {
                        todoObject.tasks.map((taskObject) => {
                            return <div className="task-box w-auto h-6 pl-2 rounded-xl bg-[#FF8E9E] text-sm text-center gap-2 flex justify-between overflow-hidden">
                                {taskObject.content}
                                <div className="delete-task-part w-5 h-auto">
                                    <img src={cross} alt="" 
                                        className="w-auto h-full fill-black opacity-0 hover:opacity-100 hover:bg-[#FF597B] active:bg-[#FF8E9E]"
                                        data-todoid={todoObject._id}
                                        data-taskid={taskObject._id}
                                        onClick={deleteTaskClick}

                                    />
                                </div>
                            </div>
                        })
                    }
                    </div>
                </div>
            })
        : <div className={"no-tasks text-2xl h-1/2 " + (darkMode ? "text-white" : "text-black")}>You seem to have no todos left!</div>
        }
        </div>
    );
};

export default TodoSection;