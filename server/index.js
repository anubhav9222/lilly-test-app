const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require("path");
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');


var app = express();
var sessionAuth;
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(bodyParser.json());
app.use(bodyParser.json({ type: "text/*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//middleware for CORS issue
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
    }));

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
// app.use(function (req, res, next) {
//     const token = 
//       req.body.token ||
//       req.query.token ||
//       req.headers['x-access-token'] ||
//       req.cookies.token;
//     console.log('token in cookies is :', req.cookies,token);
//     next()
//   })
//console.log("process",process.env);
app.post('/auth',  (req, res) => {
    const { code } = req.body || '';
    console.log("current code :", req, code);
    axios({
        method: 'POST',
        url: `${process.env.REACT_APP_AUTHORIZATION_URL}`,
        data: {
            client_id: `${process.env.REACT_APP_CLIENT_ID}`,
            client_secret: `${process.env.REACT_APP_CLIENT_SECRET}`,
            code: code,
            redirect_uri: `${process.env.REACT_APP_REDIRECT_URL}`,
        }
    })
        .then(response => {
            console.log("repsonse :", response); //response.json();
            let access_token = '';
            if(response?.data.includes("access_token")){
                access_token = response?.data.split("&")[0];
                console.log("access_token :",access_token);
                sessionAuth=req.session;
            }
            const respHeaders = {
                "Content-Type": "application/json",
                "set-cookie": [`authToken=${access_token}; Path=/; HttpOnly;`]
            }
           
            //res.cookie('accessToken', `${response}`, {httpOnly : true});
            res.writeHead(200, respHeaders);
            res.end();
        })
        .catch(err => {
            console.log("err :", err);
            return res.status(400).send(err);
        });
    //res.setHeader('Content-Type', 'application/json');
    //res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get("/auth1",(req,res) => console.log("the route auth1 :"));
app.get('/login',(req,res) => {
    sessionAuth=req.session;
   console.log("session details",session);
});
app.listen(3001, () => console.log("App is listenting on port 3001!"));