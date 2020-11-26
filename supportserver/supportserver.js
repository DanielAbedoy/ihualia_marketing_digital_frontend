const express = require('express');
const cors = require('cors');


const app = express(); 
//Ajustes
app.set('port', process.env.PORT || 7777);
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//Rutas
app.use('/ev', require('./rutas/evento'));
app.use('/email', require('./rutas/emailmarketing/emailmarketing'));
app.use('/encuestas', require('./rutas/encuentas'));

app.listen(app.get('port'), () => {
    console.log("Support server corriendo en el puerto " + app.get('port'));
});