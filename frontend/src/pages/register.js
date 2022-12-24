import { useState } from "react";
import "../index.css";
import { useNavigate, Link } from "react-router-dom";
import appwriteAccount from "../services/appwriteAccount";
import { ID } from "appwrite";
import logo from "../assets/TaskerLogo.svg"
import { toast } from "react-toastify";
import toastConfig from "../utils/toastConfig";

function Register() {

    // Initializing States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");    
    const [confPassword, setConfPassword] = useState("");

    const [invalidCredentials, setInvCred] = useState("");
    const navigate = useNavigate();

    // On submit
    function handleRegisterSubmit(event) {
        event.preventDefault()

        if (password !== confPassword) {
            return setInvCred("Your password does not match!");
        }

        appwriteAccount.create(ID.unique(), email, password, email).then(
            (response) => {
                
                // Now create a session
                const promise = appwriteAccount.createEmailSession(email, password);
                promise.then((response) => {
                    navigate("/home")
                    toast.info("Welcome to Tasker! :)", toastConfig)
                });
            },
            (error) => {
                if (error.response.code === 409) {
                    setInvCred("You already have an account! Please log in from the login page.")
                }
                else if (error.response.code === 400 ) {
                    setInvCred("Password must be at least 8 characters long.")
                }
                console.log( error.response )
            }
        );
    }

    // Component
    return (
        <div className="login-section w-screen h-[100vh] flex items-center justify-center">

            <div className="main w-1/3 h-4/6 bg-slate-300 flex flex-col items-center justify-evenly rounded-lg">

                <div className="intro w-[85%] h-8 flex items-center justify-between">
                    <div className="w-[30%] h-full flex items-center justify-center overflow-visible">
                        <img src={logo} alt="" className="h-[266%] relative right-[10%]"/>
                    </div>
                    <div className="text-xl text-center">REGISTER</div>
                </div>
                <hr className="w-[85%]  border-black"/>

                <form 
                    action="" 
                    className="w-[85%] h-4/6 flex flex-col items-left justify-evenly"
                    onSubmit={ (event) => {handleRegisterSubmit(event)} }
                >

                    <div className="input-container w-full h-[22%] flex flex-col justify-evenly">
                        <label className="input-info">ENTER YOUR EMAIL</label>
                        <input 
                            type="email" 
                            placeholder="Your Email" 
                            className="h-10 box-border pl-5 rounded-2xl focus-visible:border-[#A555EC] focus-visible:outline-none focus:border-2 text-lg"
                            onChange={ (event) => { setEmail(event.target.value); } }
                        />
                    </div>

                    <div className="input-container w-full h-[22%] flex flex-col justify-evenly">
                        <label className="input-info">YOUR PASSWORD</label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="h-10 box-border pl-5 rounded-2xl focus-visible:border-[#A555EC] focus-visible:outline-none focus:border-2 text-lg"
                            onChange={ (event) => { setPassword(event.target.value); } }
                        />
                    </div>
                    <div className="input-container w-full h-[22%] flex flex-col justify-evenly">
                        <label className="input-info">CONFIRM PASSWORD</label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="h-10 box-border pl-5 rounded-2xl focus-visible:border-[#A555EC] focus-visible:outline-none focus:border-2 text-lg"
                            onChange={ (event) => { setConfPassword(event.target.value); } }
                        />
                    </div>

                        <div className="invalid-cred  w-full h-[5%] flex flex-col justify-evenly text-red-500 text-center">{invalidCredentials}</div>

                    <input 
                        type="submit" 
                        value="CREATE ACCOUNT" 
                        className="h-10 box-border pl-5 rounded-2xl bg-[#FF7000] hover:bg-[#FFF6BF] hover:font-medium"
                    />
                </form>
                
                <hr className="w-[85%] border-black"/>
                <div className="sign-up-container w-[85%] flex items-center justify-between pl-1 pr-1">
                    <p className="">Existing user?</p>
                    <Link to="/login" className="w-24 h-7">
                        <button
                            className="w-full h-full bg-orange-400 rounded-lg hover:bg-[#FFF6BF] hover:font-medium"
                        >LOGIN HERE</button>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Register;