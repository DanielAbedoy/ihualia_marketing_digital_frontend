const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const Model = require('./model');
const Settings = require('../../settings');


const back_url = new Settings().BACKURL;

//Tareas 
/* cron.schedule("* * * * * *", async () => {
  
  //console.log(new Model().acomodarFecha("30"));
  //console.log(new Model().acomodarFecha("00")); 

  const boletines = await new Model().getBoletinesProgramados('1', '2020-11-23', '07:30');
  boletines.forEach(b => new Model().enviarBoletin(b))
}); */


/* cron.schedule("0 0-23 * * *", () => {
  const fecha_hora = new Model().acomodarFecha("00");
  new Model().enviarBoletinesProgramados(fecha_hora.fecha, fecha_hora.hora);
});


cron.schedule("30 0-23 * * *", () => {
  const fecha_hora = new Model().acomodarFecha("30");
  new Model().enviarBoletinesProgramados(fecha_hora.fecha, fecha_hora.hora);
});
 */


router.post('/upload-image', (request, response) => {

  let nombre = '';
  let directorio = '';
  let cuenta = '';

  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cuenta = req.body.cuenta;
      let dir = path.join('public', 'boletines', req.body.cuenta);
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

      axios.post(`${back_url}/api/imagen-boletin/`, { nombre: nombre, cuenta: cuenta })
        .then(r => response.status(200).json({ id_image: r.data.id, cuenta: cuenta }))
        .catch(err => {
          console.log(err);
          return response.status(500).json({ error: err })
        })

      
    }

  });

});

router.get('/get-image', (request, response) => {
  //console.log("Intenta cargarla imagen");
  const id_imagen = request.query["id-image"]
  const cuenta = request.query["cuenta"]

  //mardar peticion a django para traer esa imagen y enviarla
  axios.get(`${back_url}/api/imagen-boletin/${id_imagen}/`)
    .then(datos => {
      //const dir = path.join(process.cwd(), `./public/boletines/1/afe3bef3-015c-4d8b-84fc-59fd6d476b88-maxresdefault.jpg`);
      const dir = path.join(process.cwd(), `./public/boletines/${cuenta}/${datos.data.nombre}`);
      response.sendFile(dir);
    })
    .catch(err => {
      console.log(err);
      return response.status(500).json({ error: err })
    })

  
});


router.get('/seen-link-by', (request, response) => { 

  const id_contacto = request.query["contacto"];
  const id_link = request.query["link"];
  const boletin = request.query["boletin"];
  //Traer el link
  //Guardar quien vio el link
  axios.post(`${back_url}/api/post/seen-contacto-link/`, { id_link: id_link, id_contacto: id_contacto, boletin:boletin })
    .then(res => {
      axios.get(`${back_url}/api/boletin/${boletin}/`)
        .then(r => {
          const links = JSON.parse(r.links).data;
          const link = links.find(l => l.id == id_link);
          response.status(301).redirect(`${link.str}`);
        })
        .catch( err => response.status(301).redirect(`https://www.ihualia.com`))
  })
  .catch( err => response.status(301).redirect(`https://www.ihualia.com`))

})


router.post('/send-email', (request,response) => {

  const email = request.body.email;
  const html = request.body.html;
  const asunto = request.body.asunto;

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'nella.gorczany@ethereal.email', // generated ethereal user
      pass:'kKN6aCTvNAZc63bhDy', // generated ethereal password
    },
  });

  let mailOptions = {
    from: 'ihualia',
    to: email,
    subject: asunto,
    html:html
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) response.status(500).send(error.message)
    else  response.status(200).json({ enviado: true })
  })

})

router.get('/seen-boletin-by', (request, response) => {
  
  const id_contacto = request.query["contacto"];
  const id_boletin = request.query["boletin"];

  axios.post(`${back_url}/api/post/seen-contacto-boletin/`, { id_boletin: id_boletin, id_contacto: id_contacto })
    .then(r => {
      response.status(200).json({ recived: true })
    })
    .catch(err => {
      console.log(err)
      response.status(500).json({ recived: false })
    })

  
})

module.exports = router;
