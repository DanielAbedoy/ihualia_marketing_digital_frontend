const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const app = express(); 
//Ajustes
app.set('port', process.env.PORT || 4000);
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//Rutas
app.use('/ev', require('./rutas/evento'));
app.use('/email', require('./rutas/emailmarketing'));

https.createServer(({
    cert: fs.readFileSync("../Lets_Encrypt_app.ihualia.com.mx.pem"),
    key: fs.readFileSync("../Lets_Encrypt_app.ihualia.com.mx.pem")
}),app).listen(app.get('port'), () => {
    console.log("Support server corriendo en el puerto " + app.get('port'));
});

/* app.listen(app.get('port'), () => {
    console.log("Support server corriendo en el puerto " + app.get('port'));
}); */