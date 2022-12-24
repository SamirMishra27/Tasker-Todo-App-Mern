import { useEffect, useRef, useState } from "react";
import useTodoStore from "../utils/todoStore";
import { postTodo, editTodo } from "../services/backend";
import { toast } from "react-toastify";

function TodoInput() {

    // Initializing custom state
    const todosList = useTodoStore((state) => state.todosList);
    const userId = useTodoStore((state) => state.userId);

    const editMode = useTodoStore((state) => state.editMode);
    const setEditMode = useTodoStore((state) => state.setEditMode);
    const setLastChange = useTodoStore((state) => state.setLastChange);

    const currentTodoEditId = useTodoStore((state) => state.currentTodoEditId);
    const currentTodoEditTitle = useTodoStore((state) => state.currentTodoEditTitle);
    const currentTodoEditTasks = useTodoStore((state) => state.currentTodoEditTasks);
    const resetTodoEditFields = useTodoStore((state) => state.resetTodoEditFields);

    // User preferences
    const darkMode = useTodoStore((state) => state.darkMode);

    // Ref values
    const titleInput = useRef();
    const tasksInput = useRef();

    // Use effect
    useEffect(() => {
        titleInput.current.value = currentTodoEditTitle ? currentTodoEditTitle : null ;
        tasksInput.current.value = currentTodoEditTasks ? currentTodoEditTasks : null ;
    })

    // Handle callbacks
    async function handleClick(event) {
        
        const todoName = titleInput.current.value;
        const todoTasksString = tasksInput.current.value;
        const toastOptions = {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
            hideProgressBar: true
        };

        if (!todoName || !todoTasksString) {
            throw new Error("Must input some values.");
        }

        if (editMode === true) {

            await editTodo(userId, currentTodoEditId, todosList, todoName, todoTasksString);
            toast.success("Edited the Todo!", toastOptions)
        }
        else if (editMode === false) {

            await postTodo(userId, todoName, todoTasksString);
            toast.success("New Todo list added!", toastOptions)
        };
        clearFields();
        setLastChange(Date.now());
    };

    function clearFields(event) {
        console.log(userId);
        setEditMode(false);
        resetTodoEditFields();

        titleInput.current.value = "";
        tasksInput.current.value = "";
    };
    return (
        <div className={"todo-input-section w-full h-[15%] flex items-center justify-evenly " + (darkMode ? "bg-slate-600" : "bg-white")}>

            <div className={
                "advice h-4/5 w-[10%] text=black text-[28px] text-center leading-8 p-0 m-0 " +
                (darkMode ? "text-white" : "text-black")
            }>ADD OR EDIT A TODO</div>
            
            <div className="task-input-box w-3/4 h-[95%] flex flex-col items-center justify-evenly">

                <input 
                type="text" placeholder="Enter Todo Title" className={
                    "w-[95%] h-[40%] rounded-xl text-black hover:shadow-[0px_0px_6px_6px_rgba(128,128,128,0.2)] pl-3 pr-3 focus-visible:outline-[#FF7000] focus-visible:shadow-[0px_0px_6px_6px_rgba(128,128,128,0.2)] border-gray-400 border-[2px] " +
                (darkMode ? "placeholder:text-slate-700 bg-slate-300" : "placeholder:text-gray-400 bg-white")} ref={titleInput}/>

                <input type="text" placeholder="Enter Tasks" className={
                    "w-[95%] h-[40%] rounded-xl text-black hover:shadow-[0px_0px_6px_6px_rgba(128,128,128,0.2)] pl-3 pr-3 focus-visible:outline-[#FF7000] focus-visible:shadow-[0px_0px_6px_6px_rgba(128,128,128,0.2)] border-gray-400 border-[2px] " +
                (darkMode ? "placeholder:text-slate-700 bg-slate-300" : "placeholder:text-gray-400 bg-white")} ref={tasksInput}/>

            </div>

            <div className="buttons w-[10%] h-[95%] flex flex-col items-center justify-evenly">
                <button 
                    className="save-todo logout-button w-24 h-10 bg-[#d26161] rounded-lg hover:bg-[#ad4d4d] hover:font-medium text-white hover:shadow-[0px_0px_6px_6px_rgba(128,128,128,0.2)] active:bg-[#d26161]"
                    onClick={handleClick}
                >
                    {editMode ? "EDIT" : "SAVE"}
                </button>
                <button 
                    className="save-todo logout-button w-24 h-10 bg-[#d26161] rounded-lg hover:bg-[#ad4d4d] hover:font-medium text-white hover:shadow-[0px_0px_6px_6px_rgba(128,128,128,0.2)] active:bg-[#d26161]"
                    onClick={clearFields}
                >
                    CLEAR
                </button>
            </div>
        </div>
    );
};

export default TodoInput;