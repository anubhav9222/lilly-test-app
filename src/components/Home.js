import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home(props) {
    const navigate = useNavigate();
    if(!props.isLoggedIn){
        navigate("/login");
    }
    const [user, setUser] = useState({
        "name": "default",
        "avatar_url": "default"
    });
    
    const getUserDetails = () => {
        fetch("/users", {
            method: "GET"
        })
            .then(resp => {
                setUser(resp.json());
            })
            .catch(err => console.log("err", err));
    }
    const fetchRepo = () => {
        fetch("/repos", {
            method: 'GET',
        })
    }
    useEffect(() => {
        getUserDetails();
    }, [])
    return (<div className="container">
        {props.isLoggedIn ? 
        (<div>
            <div className="repos">Repos will go here</div>
            <div className="activity">activity will got here</div>
        </div>) : "Please Login to Access this Page"}
       
    </div>
    )
}

export default Home;