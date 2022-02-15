import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { menus } from "../utils/constant";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function Home(props) {
    const navigate = useNavigate();
    const { isLoggedIn } = props;

    console.log("props :", props);

    const [user, setUser] = useState({
        "name": "default",
        "avatar_url": "default"
    });
    const [repo, setrepo] = useState([]);

    const getUserDetails = () => {
        fetch(`${process.env.REACT_APP_PROXY_URL}/users`, {
            method: "GET"
        })
            .then(resp => {
                //console.log("user Details are",resp.json());

                return resp.json();
            })
            .then((data) => {
                console.log("user data is :", data);
                setUser(data);
            })
            .catch(err => console.log("err", err));
    }
    const fetchRepoList = () => {
        fetch(`${process.env.REACT_APP_PROXY_URL}/repos?reposUrl=${user?.repos_url}`, {
            method: 'GET',
        })
            .then((data) => data.json())
            .then((data) => {
                console.log("repo list is :", data);
                setrepo(data);
            })

    }
    useEffect(() => {

    },[repo]) 
    useEffect(() => {
        isLoggedIn && getUserDetails();
        !isLoggedIn && navigate("/login");
    }, [])

    const renderTableBody = () => {
        return repo?.map((repo, id) => {
            return [
            <tr key={id}>
                <td>{repo.name}</td>
                <td>{repo.git_url}</td>
                <td><a href={repo.html_url} target="_blank">Link</a></td>
                <td>{repo.visibility}</td>
            </tr>]
        })
    }
    return (<div className="container">
        {props.isLoggedIn ?
            (<div>
                <SideMenu menu={menus} fetchRepoList={fetchRepoList} />
                <Header user={user} />
                { repo.length ? <table border="1 px solid">
                    <thead>
                    <tr>
                        <th>Repo Name</th>
                        <th>Git Url</th>
                        <th>Homepage</th>
                        <th>visibiity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderTableBody()}
                    </tbody>
                </table> : <></>}
            </div>) : "Please Login to Access this Page"}

    </div>
    )
}

export default Home;