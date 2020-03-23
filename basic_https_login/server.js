/*
require('dotenv').config();

const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const jwt = require('jsonwebtoken');

const utils = require('./utils.js');

const userData = {
	userId : "hskim",
	password : "12345678",
	name : "Hee Soon Kim",
	username : "hskim",
	isAdmin : true
};

// TLS_RSA_WITH_AES_128_GCM_SHA256 == AES128-GCM-SHA256
const sslOptions = {
		ca : fs.readFileSync('cert/rootca.key'),
        key : fs.readFileSync('cert/server.key'),
        cert : fs.readFileSync('cert/server.crt'),
		ciphers: [
			// refer to : https://www.acunetix.com/blog/articles/tls-ssl-cipher-hardening/
			"ECDHE-ECDSA-AES256-GCM-SHA384",
			"ECDHE-RSA-AES256-GCM-SHA384",
//			"ECDHE-ECDSA-AES128-GCM-SHA256",
//			"ECDHE-RSA-AES128-GCM-SHA256",
			"ECDHE-RSA-AES256-SHA384",
			"ECDHE-RSA-AES256-SHA256",			
//			"ECDHE-RSA-AES128-SHA256",
			"!aNULL",
			"!eNULL",
			"!EXPORT",
			"!DES",
			"!RC4",
			"!MD5",
			"!PSK",
			"!SRP",
			"!CAMELLIA",			
			].join(':'),		
		honorCipherOrder: false
};

const app = express();

// setting express middlewares
app.use(express.static(path.join(__dirname, "/public")));
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// pare application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : true}));

*/
/*
app.all('/', (req, res, next) => {
	// Header Information Setting for response
	res.set('Content-Type', 'text/html');
	res.set({
		'Access-Control-Allow-Origin' : '*',
		'Access-Control-Allow-Methods' : 'DELETE,GET,PATCH,POST,PUT',
		'Access-Control-Allow-Headers' : 'Content-Type, Authorization'
	});
	next();
});

app.post('/', (req, res, next) => {
	console.log('post [1] enter ... ');
	next();
}, (req, res, next) => {
	console.log('post [2] enter ... ');
	next();
}, (req, res, next) => {
	let user_name = req.body.email;
	let password = req.body.password;

	if(user_name === 'admin' && password === 'admin'){
		res.send('success');
	}
	else{
		res.send('failure');
	}
});

app.get('/', (req, res, next) => {
	console.log('get [1] enter ... ');
	next();
}, (req, res, next) => {
	console.log('get [2] enter ... ');
	next();
}, (req, res, next) => {
	res.send('Hellow from GET');
});
*/

/*
app.use((req, res, next) => {
	var token = req.headers['authorization'];
	
	if(!token) return next();
	
	token = token.replace('Bearer', '');
	
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if(err){
			return res.status(401).json({
				error : true,
				message : "invalid user"
			});
		}
		else{
			req.user = user;
			next();
		}
	});
});

app.get('/', (req, res) => {
	if(!req.user) return res.status(401).json({ success : false, message : 'invalid user to access it.'});
	res.send('welcome to the Node.js Tutorial! - ' + req.user.name);
});

app.post('/users/signin', (req, res) => {
	const user = req.body.username;
	const pwd = req.body.password;

	if(!user || !pwd){
		return res.status(400).json({
			error : true,
			message : "user name or password required."
		});
    }

	if(user !== userData.username || pwd !== userData.password){
		return res.status(401).json({
			error : true,
			message : "user name or password is wrong"
		});
	}

	const token = utils.generateToken(userData);
	const userObj = utils.getCleanUser(userData);

	return res.json({user : userObj, token});
});

app.get('/verifyToken', (req, res) => {
	let token = req.body.token || req.query.token;

	if(!token){
		return res.status(400).json({
			error : true,
			message : "token is require"
		});
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if(err) return res.status(401).json({
			error: true,
			message : "invalid token"
		});

		if(user.userId !== userData.userId){
			return res.status(401).json({
				error: true,
				message : "Invalid user"
			});
		};

		let userObj = utils.getCleanUser(userData);
		return res.json({user : userObj, token});
	});
});

http.createServer(app).listen(8000);
https.createServer(sslOptions, app).listen(3000);
*/

// https://www.cluemediator.com/create-rest-api-for-authentication-in-node-js-using-jwt

require('dotenv').config();
 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const utils = require('./utils');
 
const app = express();
const port = process.env.PORT || 8000;
 
// static user details
const userData = {
  userId: "hskim",
  password: "12345678",
  name: "Hee Soon Kim",
  username: "hskim",
  isAdmin: true
};
 
// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
 
 
//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  if (!token) return next(); //if no token, continue
 
  token = token.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      next();
    }
  });
});
 
 
// request handlers
app.get('/', (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
  res.send('Welcome to the Node.js Tutorial! - ' + req.user.name);
});
 
 
// validate the user credentials
app.post('/users/signin', function (req, res) {
  const user = req.body.username;
  const pwd = req.body.password;
 
  // return 400 status if username/password is not exist
  if (!user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Username or Password required."
    });
  }
 
  // return 401 status if the credential is not match.
  if (user !== userData.username || pwd !== userData.password) {
    return res.status(401).json({
      error: true,
      message: "Username or Password is Wrong."
    });
  }
 
  // generate token
  const token = utils.generateToken(userData);
  // get basic user details
  const userObj = utils.getCleanUser(userData);
  // return the token along with user details
  return res.json({ user: userObj, token });
});
 
 
// verify the token and return it if it's valid
app.get('/verifyToken', function (req, res) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }
  // check token that was passed by decoding token using secret
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });
 
    // return 401 status if the userId does not match.
    if (user.userId !== userData.userId) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    }
    // get basic user details
    var userObj = utils.getCleanUser(userData);
    return res.json({ user: userObj, token });
  });
});
 
app.listen(port, () => {
  console.log('Server started on: ' + port);
});
