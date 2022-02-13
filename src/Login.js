import { useEffect, useState } from 'react';
import './App.css';
import { LOGIN_URL } from "./utils/constant";


function Login() {
  console.log("process", process.env);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    
  }, []);

  return (
    <div className="container" style={{ background: 'lightgrey' }}>
      <div className='card col-lg-6' style={{
        background: "grey", width: '50%',
        border: '1px solid white',
        borderRadius: 8,
        textAlign: 'center',
        padding: '10px'
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
                  onClick={() => { setLoading(true)}}
                  href={`${process.env.REACT_APP_LOGIN_URL}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`}>
                  {isLoading ? <img src={`${process.env.PUBLIC_URL}/ajax-loader.gif`} className="loader"></img> : 'Login'}
                </a>
              </button>
            </>


          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
