import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import appwriteAccount from "../services/appwriteAccount";

function Index() {

    // Initializing state
    const navigate = useNavigate();

    useEffect(() => {
        appwriteAccount.get().then(
            (response) => {
                navigate("/home")
                console.log("Found session");
            },
            (error) => {
                navigate("/login")
                console.log("Cannot found anything")
            }
        )
    })
}

export default Index;