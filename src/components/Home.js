import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { menus } from "../utils/constant";
function Home(props) {
    const navigate = useNavigate();
    const { isLoggedIn } = props;

    console.log("props :", props);

    const [user, setUser] = useState({
        "name": "default",
        "avatar_url": "default"
    });

    const getUserDetails = () => {
        fetch(`${process.env.REACT_APP_PROXY_URL}/users`, {
            method: "GET"
        })
        .then(resp => {
            //console.log("user Details are",resp.json());
            
            return resp.json();
        })
        .then((data) => {
            console.log("user data is :",data);
            setUser(data);
        }) 
        .catch(err => console.log("err", err));
    }
    const fetchRepo = () => {
        fetch("/repos", {
            method: 'GET',
        })
    }
    useEffect(() => {
        isLoggedIn && getUserDetails();
        !isLoggedIn && navigate("/login");
    }, [])
    return (<div className="container">
        {props.isLoggedIn ?
            (<div>
                <SideMenu menu={menus}/>
                <Header user={user}/>
                <div className="repos">Repos will go here</div>
                <div className="activity">activity will got here</div>
            </div>) : "Please Login to Access this Page"}

    </div>
    )
}

export default Home;