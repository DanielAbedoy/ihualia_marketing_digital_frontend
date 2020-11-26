const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const Settings = require('../settings');


const router = express.Router();
const back_url = new Settings().BACKURL;


router.post("/upload-img", (request, response) => {

  let nombre = "";
  let en = "";

  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      en = request.body.encuesta;
      let dir = path.join('public', 'encuestas', req.body.encuesta);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, 0744);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const fileName = uuidv4() + '-' + file.originalname.toLowerCase().split(' ').join('-');
      nombre = fileName;
      cb(null, fileName);
    }
  })
  const upload = multer({ storage: storage, limits: { fileSize: 10000000 } }).single('file');

  upload(request, response, (err) => {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return response.status(500).json({ error: err });
    } else if (err) {
      console.log(err);
      return response.status(500).json({ error: err });
    } else {
      //Guardar en el backeel laimagen principal o la secundaria
      axios.post(`${back_url}/api/imagen-encuesta/`, { nombre: nombre, encuesta: en })
        .then(r => {
          return response.status(200).json({ ref: r.data.id });
        })
        .catch(err => {
          console.log(err);
          return response.status(500).json({ error: err });
        })

    }

  });
  
})

router.get('/getimg', (request, response) => {
  //Detectar si es principal o es de un evento 
  const id_imagen = request.query["imagen"];
  const id_encuesta = request.query["encuesta"];
  //mardar peticion a django para traer esa imagen y enviarla
  axios.get(`${back_url}/api/imagen-encuesta/${id_imagen}/`)
    .then(datos => {
      let dir = path.join(process.cwd(), `./public/encuestas/${id_encuesta}/${datos.data.nombre}`);
      response.sendFile(dir);
    })
    .catch(err => {
      console.log(err);
      response.status(500).json({ error: err })
    })
})



module.exports = router;