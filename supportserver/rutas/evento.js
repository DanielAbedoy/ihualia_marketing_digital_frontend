const express = require('express');
const axios = require('axios');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const Settings = require('../settings');

const conekta = require('conekta');
conekta.api_key = "key_eYvWV7gSDkNYXsmr";
conekta.api_version = '2.0.0';
conekta.locale = "es";

const back_url = new Settings().BACKURL;

let nombre = '';
let directorio = '';


//Guardar laimagen el el backend i dar el ID 
/* router.post('/upload-image', (request, response) => {

  let cl = "";
  let cu = "";
  let ev = "";

    let storage = multer.diskStorage({
        destination: (req, file, cb) => {

        cl = request.body.cliente;
        cu = request.body.cuenta;
        ev = request.body.evento;
        
            let dir = path.join('public', 'eventos', req.body.cliente);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, 0744);
            }
            dir = path.join('public', 'eventos', req.body.cliente, req.body.cuenta);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, 0744);
            }

            if (req.body.evento) {
                dir = path.join('public', 'eventos', req.body.cliente, req.body.cuenta, req.body.evento);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, 0744);
                }
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
          //Guardar en el backeel laimagen principal o la secundaria
          axios.post(`${back_url}/api/imagen-ev/`, { name: nombre, cliente: cl, cuenta: cu, evento:ev })
            .then(r => {
              return response.status(200).json({ ref: r.data.id });
            })
            .catch(err => {
              console.log(err);
              return response.status(500).json({ error: err });
            })

        }
        
    });
});
 */

router.post('/upload-image', (request, response) => {

  let ev = "";

  let storage = multer.diskStorage({
    destination: (req, file, cb) => {

      ev = request.body.evento;

      let dir = path.join('public', 'eventos', req.body.evento);
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
      //Guardar en el backeel laimagen principal o la secundaria
      axios.post(`${back_url}/api/imagen-ev/`, { name: nombre, evento: ev })
        .then(r => {
          return response.status(200).json({ ref: r.data.id });
        })
        .catch(err => {
          console.log(err);
          return response.status(500).json({ error: err });
        })

    }

  });
});


router.post('/pago-oxxo', (request, response) => {



  const thirty_days_from_now = (Math.round(Date.now() / 1000 + 60 * 60 * 24 * 30));

  order = conekta.Order.create({
    "line_items": [{
      "name": request.body.items_name,
      "unit_price": request.body.unit_price,
      "quantity": 1
    }], //shipping_lines - phyiscal goods only
    "currency": "MXN",
    "customer_info": {
      "name": "Fulanito Pérez",
      "email": "fulanito@conekta.com",
      "phone": "+5218181818181"
    }, //shipping_contact - required only for physical goods
    "charges": [{
      "payment_method": {
        "type": "oxxo_cash",
        "expires_at": thirty_days_from_now
      }
    }]
  }).then(function (r) {
    console.log("Body")
    return response.status(200).json({ result: r.toObject() });
  }, function (e) {
    console.log(e)
    return response.status(500).json({ error: e });
  }).catch(error => {
    console.log(error)
    return response.status(500).json({ error: error });
  })

})

router.post('/pago-card', (req, resp) => {

  conekta.Order.create({
    "currency": "MXN",
    "customer_info": {
      "name": "Jul Ceballos",
      "phone": "+5215555555555",
      "email": "jul@conekta.io"
    },
    "line_items": [{
      "name": req.body.items_name,
      "unit_price": req.body.unit_price,
      "quantity": 1
    }],
    "charges": [{
      "payment_method": {
        "type": "card",
        "token_id": "tok_test_visa_4242"
      }
    }]
  }).then(function (r) {
    //console.log(r.toObject())
    return resp.status(200).json({ result: r.toObject() });
  }, function (e) {
    console.log(e)
    return resp.status(500).json({ error: e });
  }).catch(error => {
    return resp.status(500).json({ error: error });
  })

})


//Retornar el file de la imagen pasando el id
router.get("/getimg", (request, response) => {

  //Detectar si es principal o es de un evento 
  const id_imagen = request.query["imagen"];
  const id_evento = request.query["evento"];
  //mardar peticion a django para traer esa imagen y enviarla
  axios.get(`${back_url}/api/imagen-ev/${id_imagen}/`)
    .then(datos => {
      //const dir = path.join(process.cwd(), `./public/boletines/1/afe3bef3-015c-4d8b-84fc-59fd6d476b88-maxresdefault.jpg`);
      let dir = "";
      if (!id_evento) {
        dir = path.join(process.cwd(), `./public/eventos/${datos.data.cliente}/${datos.data.cuenta}/${datos.data.name}`);
      } else {
        dir = path.join(process.cwd(), `./public/eventos/${id_evento}/${datos.data.name}`);
      }
      response.sendFile(dir);
    })
    .catch(err => {
      console.log(err);
      response.status(500).json({ error: err })
    })


})

module.exports = router;