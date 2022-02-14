import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import './App.css';
import { useState } from "react";

function App() {
    const [isLoggedIn, setisLoggedin] = useState(false);
    const changeLogIn = (param) => {
        setisLoggedin(param);
    }
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home
                    isLoggedIn={isLoggedIn}
                    changeLogIn={changeLogIn}
                     />} />
                <Route path="/login" exact element={<Login
                    isLoggedIn={isLoggedIn}
                    changeLogIn={changeLogIn}
                     />} />
            </Routes>
        </Router>
    )
}

export default App;