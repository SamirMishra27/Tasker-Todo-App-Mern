import { useState } from "react";
import "../index.css";
import { useNavigate, Link } from "react-router-dom";
import appwriteAccount from "../services/appwriteAccount";
import logo from "../assets/TaskerLogo.svg"

function Login() {

    // Initializing States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");  

    const [invalidCredentials, setInvCred] = useState("");
    const navigate = useNavigate();

    // On submit
    function handleLoginSubmit(event) {
        event.preventDefault()
        
        appwriteAccount.createEmailSession(email, password).then(

            (response) => {
                navigate("/home");
            },
            (error) => {
                if ( error.response.code === 401 ) {
                    setInvCred("Invalid credentials or this Email does not exist.")
                }
                else if (error.response.code === 400 ) {
                    setInvCred("Password must be at least 8 characters long.")
                }
                console.log( error.response )
            }
        )
    }

    // Component
    return (
        <div className="login-section w-screen h-[100vh] flex items-center justify-center">

            <div className="main w-1/3 h-4/6 bg-slate-300 flex flex-col items-center justify-evenly rounded-lg">

                <div className="intro w-[85%] h-8 flex items-center justify-between">
                    <div className="w-[30%] h-full flex items-center justify-center overflow-visible">
                        <img src={logo} alt="" className="h-[266%] relative right-[10%]"/>
                    </div>
                    <div className="text-xl text-center">LOGIN</div>
                </div>
                <hr className="w-[85%]  border-black"/>

                <form 
                    action="" 
                    className="w-[85%] h-4/6 flex flex-col items-left justify-evenly"
                    onSubmit={ (event) => {handleLoginSubmit(event)} }
                >

                    <div className="input-container w-full h-1/3 flex flex-col justify-evenly">
                        <label className="input-info">ENTER YOUR EMAIL</label>
                        <input 
                            type="email" 
                            placeholder="Your Email" 
                            className="h-10 box-border pl-5 rounded-2xl focus-visible:border-[#A555EC] focus-visible:outline-none focus:border-2 text-xl"
                            onChange={ (event) => { setEmail(event.target.value); } }
                        />
                    </div>

                    <div className="input-container w-full h-1/3 flex flex-col justify-evenly">
                        <label className="input-info">PASSWORD</label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="h-10 box-border pl-5 rounded-2xl focus-visible:border-[#A555EC] focus-visible:outline-none focus:border-2 text-xl"
                            onChange={ (event) => { setPassword(event.target.value); } }
                        />
                    </div>

                        <div className="invalid-cred  w-full h-[5%] flex flex-col justify-evenly text-red-500 text-center">{invalidCredentials}</div>

                    <input 
                        type="submit" 
                        value="LOGIN" 
                        className="h-10 box-border pl-5 rounded-2xl bg-[#FF7000] hover:bg-[#FFF6BF] hover:font-medium"
                    />
                </form>
                
                <hr className="w-[85%] border-black"/>
                <div className="sign-up-container w-[85%] flex items-center justify-between pl-1 pr-1">
                    <p className="">Don't have an account?</p>
                    <Link to="/register" className="w-24 h-7">
                        <button 
                            className="w-full h-full bg-orange-400 rounded-lg hover:bg-[#FFF6BF] hover:font-medium"
                        >SIGN UP</button>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Login;