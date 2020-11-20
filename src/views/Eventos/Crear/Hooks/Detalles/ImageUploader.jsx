import React, { useState } from 'react';
import { Col, Row, Button } from 'reactstrap';

import ModeloEvento from '../../../../../models/Eventos';
import URLs from '../../../../../models/urls';

const ImageUpload = ({ evento, posicion, setDato, setValues }) => {

  const [url, setUrl] = useState('');

  const cambiarImg = () => {
    setUrl('');
    if (posicion) setValues(posicion, "");
    else setDato("");
  }

  const upluadImage = async(e) => {
    e.preventDefault();
    let file = e.target.files[0];
    //Subir imagen al servidor y pasar el url
    const data = await new ModeloEvento().upluad_image(evento, file);
    setUrl(`${new URLs().supporserver()}/ev/getimg/?imagen=${data.ref}&evento=${evento}`);
    if (posicion) {
      //Dar el datos al componente 
      setValues(posicion, data.ref);
    } else {
      setDato(data.ref)  

    }
  }

  return (
    url === '' ?
      <div>
        <Row>
          <Col md="12" className="mx-auto text-center p-0">
            <label style={{ cursor: "pointer" }} className="h4 bg-light rounded d-block p-5 shadow">
              <input style={{ display: "none" }} type="file" onChange={upluadImage} />
              <i className="fa fa-picture-o h1"></i><br /> Selecciona el Archivo
              </label>
          </Col>
        </Row>
      </div>
      :
      <>
        <Row>
          <Col md="12" style={{ boxShadow: "-2px 1px 39px 1px rgba(0,0,0,0.75)" }} className="mx-auto text-center p-0">
            <img width="100%" src={url} alt="Imagen principal" />
          </Col>
        </Row>
        <br />
        <Row>
          <Col md="5" xs="8" className="rounded ml-auto">
            <Button block color="white" className="shadow" onClick={e =>cambiarImg()} ><i className="fa fa-eraser"></i> Cambiar</Button>
          </Col>
        </Row>

      </>

  );
}

export default ImageUpload;