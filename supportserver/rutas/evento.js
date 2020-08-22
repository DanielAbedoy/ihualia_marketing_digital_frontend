
const express = require('express');

const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


const conekta = require('conekta');
    conekta.api_key = "key_eYvWV7gSDkNYXsmr";
    conekta.api_version = '2.0.0';
    conekta.locale = "es";


let nombre = '';
let directorio = '';


router.post('/upload-image', (request, response) => {

    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
            let dir = path.join(process.cwd(), 'public', 'eventos', req.body.cliente);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, 0744);
            }
            dir = path.join(process.cwd(), 'public', 'eventos', req.body.cliente, req.body.cuenta);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, 0744);
            }

            if (req.body.evento) {
                dir = path.join(process.cwd(), 'public', 'eventos', req.body.cliente, req.body.cuenta, req.body.evento);
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
            return response.status(200).json({ nombre: nombre, directorio: directorio });
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
      "charges":[{
        "payment_method": {
          "type": "oxxo_cash",
          "expires_at": thirty_days_from_now
        }
      }]
    }).then(function (r) {
      console.log("Body")
        return response.status(200).json({ result:r.toObject() });
      }, function (e) {
          console.log(e)
          return response.status(500).json({ error: e});
    }).catch(error => {
        console.log(error)
          return response.status(500).json({ error: error });
      })
  
})

router.post('/pago-card',(req ,resp)=> {

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
      return resp.status(200).json({ result:r.toObject() });
    }, function (e) {
        console.log(e)
        return resp.status(500).json({ error: e });
    }).catch(error => {
        return resp.status(500).json({ error: error });
    })

})

module.exports = router;