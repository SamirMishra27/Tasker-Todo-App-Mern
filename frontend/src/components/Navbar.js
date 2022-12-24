import { Link } from "react-router-dom";
import "../index.css";
import logo from "../assets/TaskerLogo.svg";
import lightLogo from "../assets/TaskerLogoLight.svg";
import appwriteAccount from "../services/appwriteAccount";
import toastConfig from "../utils/toastConfig";
import { toast } from "react-toastify";
import useTodoStore from "../utils/todoStore";
import moon from "../assets/moon.svg"
import sun from "../assets/sun.svg"
import { useEffect, useState } from "react";

function Navbar () {

    // State
    const resetTodoEditFields = useTodoStore((state) => state.resetTodoEditFields);
    const resetAll = useTodoStore((state) => state.resetAll);

    // User preferences
    const [darkMode, setDarkMode] = useTodoStore((state) => [state.darkMode, state.setDarkMode]);

    useEffect(() => {
        return
    }, [darkMode])

    // Handle callback
    async function logoutUser(event) {
        appwriteAccount.deleteSession("current");
        toast.success("You have logged out!", toastConfig);

        resetAll();
        resetTodoEditFields();
    }
    
    async function toggleDarkMode(event) {
        localStorage.setItem(
            "dark-mode", 
            !JSON.parse(localStorage.getItem("dark-mode"))
        );
        setDarkMode(JSON.parse(localStorage.getItem("dark-mode")));
        // const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("dark-mode")) || false);
        // console.log(darkMode)
        // console.log(localStorage.getItem("dark-mode"), "----", darkMode);
        // console.log(localStorage.getItem("dark-mode"))
    };

    return (
        <div className={"navbar-section w-full h-[10%] flex items-center justify-evenly " + (darkMode ? "bg-[#2C74B3]" : "bg-[#46C2CB]")}>

            {
                darkMode ?
                <img src={lightLogo} alt="" className="w-[15%] h-auto"/> :
                <img src={logo} alt="" className="w-[15%] h-auto"/>
            }

            <div className="empty-space w-7/12"></div>

            <button
                className={
                    "logout-button w-16 h-10 rounded-lg hover:font-medium text-white flex items-center justify-center hover:shadow-[0px_0px_6px_6px_rgba(128,128,128,0.2)] active:bg-[#bbbbbb] " + 
                    (darkMode ? "hover:bg-black bg-[#3e3e3e]" : "hover:bg-slate-100 bg-slate-300")
                }
                onClick={toggleDarkMode}
            >
                {
                    darkMode ?
                    <img src={moon} alt="" className="w-auto h-2/3 fill-black"/> :
                    <img src={sun} alt="" className="w-auto h-2/3 fill-black"/>
                }
            </button>
            
            <Link to="/login" className="w-24 h-10">
                <button 
                    className="logout-button w-full h-full bg-[#d26161] rounded-lg hover:bg-[#ad4d4d] hover:font-medium text-white hover:shadow-[0px_0px_6px_6px_rgba(128,128,128,0.2)] active:bg-[#d26161]"
                    onClick={logoutUser}
                >LOGOUT</button>
            </Link>
        </div>
    );
};

export default Navbar;