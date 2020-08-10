const express = require('express');
const cors = require('cors');


const app = express(); 
//Ajustes
app.set('port', process.env.PORT || 4000);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//Rutas
app.use('/eventos', require('./rutas/evento'));
//app.use('/evento', require('./rutas/load_image'));


app.listen(app.get('port'), () => {
    console.log("Support server corriendo en el puerto " + app.get('port'));
});