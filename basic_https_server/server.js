const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');

// TLS_RSA_WITH_AES_128_GCM_SHA256 == AES128-GCM-SHA256
const sslOptions = {
        key : fs.readFileSync('cert/key.pem'),
        cert : fs.readFileSync('cert/crt.pem'),
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

app.get('*', (req, res) => {
	res.send('Hello World');
});


http.createServer(app).listen(8080);
https.createServer(sslOptions, app).listen(3000);
