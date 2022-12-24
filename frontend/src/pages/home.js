import "../index.css";
import Navbar from "../components/Navbar";
import TodoInput from "../components/TodoInput";
import TodoSection from "../components/TodoSection";

function Home() {
    return (
        <div className="w-full h-[100vh]">
            <Navbar />
            <TodoInput />
            <TodoSection />
        </div>
    )
}

export default Home;