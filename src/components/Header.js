function Header(props) {
    console.log("props inside Header", props);
    const { user } = props;
    return (
        <div style={{ width: 'calc(100% - 210px)', position: "fixed", left: 210, top: 0 }}>
            <div style={{ display: "flex", alignItems: 'center', justifyContent: "flex-end",padding: 15 }}>
                <p>{user.email}</p>
                <img src={`${process.env.PUBLIC_URL}${user.avatar_url}`} style={{ height: 40, width: 40}} />
            </div>


        </div>
    )
}

export default Header;