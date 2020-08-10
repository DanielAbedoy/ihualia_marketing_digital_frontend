
const express = require('express');

const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { log } = require('console');

let nombre = '';
let directorio= '';

router.post('/upload-image', (request, response) => {

    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
            let dir = path.join(process.cwd(), 'public', 'eventos', req.body.cliente);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, 0744);
            }
            dir = path.join(process.cwd(),'public', 'eventos', req.body.cliente, req.body.cuenta);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, 0744);
            }

            if (req.body.evento) {
                dir = path.join(process.cwd(),'public', 'eventos', req.body.cliente, req.body.cuenta, req.body.evento);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, 0744);
                }   
            }

            direcorio = dir;
            cb(null, dir);
        },
        filename: (req, file, cb) => {
          const fileName = uuidv4() + '-' + file.originalname.toLowerCase().split(' ').join('-');
          nombre = fileName;
          directorio = dir + "//" + nombre;
        cb(null, fileName );
        }
    })
    const upload = multer({ storage: storage }).single('file');
    
    upload(request, response, (err) => {
        if(err instanceof multer.MulterError){
            console.log(err);
            return response.status(500).json({error:err});
        } else if(err) {
            console.log(err);
            return response.status(500).json({error:err});
      }
        return response.status(200).json({nombre: nombre, directorio: directorio});
    });
});

module.exports = router;