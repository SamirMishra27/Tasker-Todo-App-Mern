import create from "zustand";

const useTodoStore = create((set) => ({

    userId: null,
    todosList: [],
    darkMode: JSON.parse(localStorage.getItem("dark-mode")) || false,

    editMode: false,
    lastChange: null,

    currentTodoEditId: null,
    currentTodoEditTitle: null,
    currentTodoEditTasks: null,

    setUserId: (userId) => set((state) => ({ userId: userId })),
    setTodosList: (todosList) => set((state) => ({ todosList: todosList })),
    setDarkMode: (boolean) => set((state) => ({ darkMode: boolean })),

    setEditMode: (boolean) => set((state) => ({ editMode: boolean })),
    setLastChange: (dateTime) => set((state) => ({ lastChange: dateTime })),

    setCurrentTodoEditId: (todoId) => set((state) => ({ currentTodoEditId: todoId })),
    
    setTodoEditFields: (title, tasks) => set((state) => ({
        currentTodoEditTitle: title, 
        currentTodoEditTasks: tasks
    })),
    
    resetTodoEditFields: () => set((state) => ({ 
        editMode: false, currentTodoEditId: null,
        currentTodoEditTitle: null, currentTodoEditTasks: null
    })),
    resetAll: () => set((state) => ({ userId: null, todosList: [], editMode: false }))
}));

export default useTodoStore;