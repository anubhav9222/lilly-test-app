import { useEffect, useState } from 'react';
import { LOGIN_URL } from "../utils/constant";
import { useNavigate } from 'react-router-dom';

function Login(props) {
  console.log("process", process.env);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const AppUrl = window.location.href;
    const isCode = AppUrl.includes("?code=");
    let code;
    if (isCode) {
      let UrlArray = AppUrl.split('?code=');
      code = UrlArray[1];

      fetch(`${process.env.REACT_APP_PROXY_URL}/auth`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          client_id: `${process.env.REACT_APP_CLIENT_ID}`,
          client_secret: `${process.env.REACT_APP_CLIENT_SECRET}`,
          code: `${code}`,
          redirect_uri: `${process.env.REACT_APP_REDIRECT_URL}`,
        })
  
      })
        .then(response =>  response.text()
        )
        .then(data => {
          console.log("success :", data);
          props.changeLogIn(true);
          navigate("/");
        })
        .catch((error) => {
          console.log('Error :', error);
        })
    }
   
  }, [isLoading]);

  return (
    <div className="container" style={{ background: 'white' }}>
      <div className='card col-lg-6' style={{
        background: "#ff5e007a", width: '50%',
        border: '1px solid white',
        borderRadius: 8,
        textAlign: 'center',
        padding: '10px',
        boxShadow : 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
      }}>
        <header style={{ padding: 10 }}>
          <span><img src={`${process.env.PUBLIC_URL}/lilly_logo.png`}></img></span>
          <h1>Login to Lilly Dev App</h1>
        </header>

        <div className='form'>
          <form>
            <>
              <button style={{
                minWidth: 100,
                borderRadius: 5,
                padding: 5, textDecoration: 'none',

              }}>
                <a style={{
                  fontSize: '18px', width: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  textDecoration: 'none'
                }}
                  onClick={() => { setLoading(true) }}
                  href={`${process.env.REACT_APP_LOGIN_URL}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`}>
                  {isLoading ? <img src={`${process.env.PUBLIC_URL}/ajax-loader.gif`} className="loader"></img> : 'Login'}
                </a>
              </button>
              {/* <button onClick={() => fetch(`${process.env.REACT_APP_PROXY_URL}/auth1`,

              {
                credentials: 'same-origin',
                method: 'GET'
              }).then((success) => console.log("success",success)) }>New button</button> */}
            </>


          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
