function SideMenu(props) {
    console.log("props inside Header", props);
    const { menu,user,fetchRepoList } = props;
    return (
        <div style={{
            width: '210px', position: "fixed",
            left: 0, top: 0, height: '100vh', background: 'papayawhip',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
        }}>
            <img alt="App Logo" src={`${process.env.PUBLIC_URL}/lilly_logo.png`} style={{
                height: 80, width: '150px',
                padding: '10px 30px', background: 'white',
            }} />
            { menu.map((menu, id) => {
                return <div key={id} className="menu" onClick={async () => {
                    let data = await menu.url(`${process.env.REACT_APP_BL_URL}`,user);
                    console.log("data",data);
                    fetchRepoList(data,id);
                }} ><img alt="icon" style={{width : 20, height : 20,padding: 10}} src={`${process.env.PUBLIC_URL}/${menu.logo_src}`}/>{menu.name}</div>
            })}

            </div>
            )
            }

            export default SideMenu;