import "./index.css";
import { Routes, Route } from "react-router-dom";

import Index from "./pages/index";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    
    return (
        <>
            <Routes>
                <Route exact path="/" element = { <Index /> }/>
                <Route exact path="/login" element = { <Login /> }/>
                <Route exact path="/register" element = { <Register/> }/>
                <Route exact path="/home" element = { <Home /> }/>
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;