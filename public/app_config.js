window.LOGIN_URL = "https://github.com/login/oauth/authorize";
window.menus = [
    {
        id: 1,
        name : "Repositories",
        description : "Menu to get user repo list",
        logo_src : "repo_list.svg",
        url : async (url,user) => {
            let retData = await fetch(`${url}/users/${user.login}/repos`, {
                method: 'GET',
            })
            .then((data) => data.json())
            .then((data) => {
                console.log("repo list isss :", data);
                return data;
            })
            return retData;
        }
    },
    {
        id: 2,
        name : "Activities",
        description : "Menu to get user repo list",
        logo_src : "activities.svg",
        url : async (url,user) => {
            let retData = await fetch(`${url}/users/${user.login}/events`, {
                method: 'GET',
            })
            .then((data) => data.json())
            .then((data) => {
                console.log("events list iss :", data);
                return data;
            })
            return retData;
        }
    }
]
var abc = "hello";