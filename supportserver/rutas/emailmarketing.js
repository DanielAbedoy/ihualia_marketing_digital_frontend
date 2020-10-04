const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');


router.post('/upload-image', (request, response) => {

  let nombre = '';
  let directorio = '';
  let cuenta = '';

  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cuenta = req.body.cuenta;
      let dir = path.join(process.cwd(), 'public', 'boletines', req.body.cuenta);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, 0744);
      }
      directorio = dir;
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
      return response.status(200).json({ nombre: nombre, directorio: directorio, cuenta: cuenta });
    }

  });

});

router.get('/get-image', (request, response) => {
  //console.log("Intenta cargarla imagen");
  console.log("id_imagen: ",request.query["id-image"]);
  console.log("cuenta: ", request.query["cuenta"]);
  
  //mardar peticion a django para traer esa imagen y enviarla

  const dir = path.join(process.cwd(), "./public/boletines/1/afe3bef3-015c-4d8b-84fc-59fd6d476b88-maxresdefault.jpg");
    //response.sendFile(`boletines/1/3d3c6b51-3e5c-4e9d-95cc-20e052d6f1f8-download.jpg`);
  response.sendFile(dir);
});


router.get('/data-link', (request, response) => { 

  response.status(301).redirect("https://www.facebook.com");

})

module.exports = router;
