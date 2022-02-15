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
    const [activity, setActivities] = useState([]);
    

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
    const fetchRepoList = (data,id) => {
        // fetch(`${process.env.REACT_APP_PROXY_URL}/repos?reposUrl=${user?.repos_url}`, {
        //     method: 'GET',
        // })
        //     .then((data) => data.json())
        //     .then((data) => {
        //         console.log("repo list is :", data);
        //         setrepo(data);
        //     })
        if(!data)
        return

        console.log("inside fetch REpo: ",data,id);
        switch(id) {
            case 0 : setrepo(data);
                    setActivities([]);
                    break;
            case 1 : setActivities(data)
                    setrepo([]);
                    break;
            }
        }
        
        // else setrepo(data);
    useEffect(() => {
        console.log("use effetc for fetcRepo")
    },[repo]) 
    useEffect(() => {
        isLoggedIn && getUserDetails();
        !isLoggedIn && navigate("/login");
    }, [])

    const renderRepoBody = () => {
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
    const renderActivityBody = () => {
        return activity?.map((act, id) => {
            return [
            <tr key={id}>
                <td>{act.id}</td>
                <td>{act.type}</td>
                <td>{act?.repo?.name}</td>
                <td><a href={act?.repo?.url} target="_blank">Link</a></td>
                <td>{act.public ? 'Yes' : 'No'}</td>

            </tr>]
        })
    }
    return (<div className="container">
        {props.isLoggedIn ?
            (<div>
                <SideMenu menu={menus} fetchRepoList={fetchRepoList} user={user} />
                <Header user={user} />
                { repo?.length ? <table border="1 px solid">
                    <thead>
                    <tr>
                        <th>Repo Name</th>
                        <th>Git Url</th>
                        <th>Homepage</th>
                        <th>visibiity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderRepoBody()}
                    </tbody>
                </table> : <></>}

                { activity?.length ? <table border="1 px solid">
                    <thead>
                    <tr>
                        <th>id </th>
                        <th>type</th>
                        <th>Repo Name</th>
                        <th>Repo Url</th>
                        <th>Public</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderActivityBody()}
                    </tbody>
                </table> : <></>}
            </div>) : "Please Login to Access this Page"}

    </div>
    )
}

export default Home;