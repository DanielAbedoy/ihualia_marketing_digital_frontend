import React, { useState, useEffect } from 'react';
import { Col, Row, Input, Button, CustomInput } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';
import urls from '../../../../models/urls'
import ModelEncuestas from '../../../../models/Encuestas'

const Configuraciones = ({ setEncuesta, close, encuesta, datosBorrador }) => {

  const [datos, setDatos] = useState({ anonima: "", ponderacion: "", paginacion: "", imagen:"" });
  const { addToast } = useToasts();

  useEffect(() => {
    if (datosBorrador.anonima !== null) {
      setDatos({ ...datos, ...datosBorrador });
    }
  },[datosBorrador])

  const uploadImage = async e => {
    e.preventDefault();
    let file = e.target.files[0];
    const img = await new ModelEncuestas().upload_image(encuesta.id, file);
    setDatos({ ...datos, imagen: img.ref });
  }

  const validar = () => {
    if (datos.anonima === "" || datos.ponderacion === "" || datos.paginacion === "" || datos.imagen === "") {
      addToast("Debes agregar toda la información", { appearance: "info", autoDismiss: true });
      return false;
    }
    return true;

  }

  const crear = async () => {
    if (!validar()) return;

    const resp = await new ModelEncuestas().modificar_encuesta(encuesta.id, datos);
    if (resp.statusText === "OK") {
      addToast("Agregado correctamente", { appearance: "success", autoDismiss: true });
      setEncuesta(resp.data);
      close();
    } else addToast("Algo salio mal", { appearance: "error", autoDismiss: true });

  }

  return (
    <Row>
      <Col md="7" xs="12" className="mx-auto">
      <Row>
          <Col md="12">
            <span className="h5">Imagen referencial</span><br />
            {datos.imagen === "" ?
              <Input className="mt-2" type="file" onChange={uploadImage} />
              :
              <Row>
                <Col md="12" className="mx-auto">
                  <img src={`${new urls().supporserver()}/encuestas/getimg/?imagen=${datos.imagen}&encuesta=${encuesta.id}`} alt="imagen principal" width="100%" className="shadow" />
                  <br />
                  <p className="text-right"><u style={{ cursor: "pointer" }} onClick={() => { setDatos({ ...datos, imagen: "" }) }}>cambiar</u></p>
                </Col>
              </Row>
            }
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md="6" xs="12" className="my-3 ">
            <span className="h5">Encuesta anónima</span><br />
            <CustomInput type="radio" id="anonima1" name="customRadio1" checked={datos.anonima === true ? true : false} label="Si" onChange={e => setDatos({ ...datos, anonima: true })} />
            <CustomInput type="radio" id="anonima2" name="customRadio2" checked={datos.anonima === false ? true : false} label="No" onChange={e => setDatos({ ...datos, anonima: false })} />

            {datos.anonima === false ? <p className="text-muted text-center m-0"><i>Solo se almacena el nombre y correo del encuestado</i></p> : <></>}
          </Col>
          <Col md="6" xs="12" className="my-3">
            <span className="h5">Ponderacion</span><br />
            <CustomInput type="radio" id="ponderacion1" name="customRadio3" checked={datos.ponderacion === true ? true : false} label="Si" onChange={e => setDatos({ ...datos, ponderacion: true })} />
            <CustomInput type="radio" id="ponderacion2" name="customRadio4" checked={datos.ponderacion === false ? true : false} label="No" onChange={e => setDatos({ ...datos, ponderacion: false })} />
          </Col>
          <Col md="12" xs="12" className="my-3">
            <span className="h5">Paginación</span><br />

            <CustomInput type="radio" id="paginacion1" name="customRadio5"
              checked={datos.paginacion === "todas" ? true : false} label="Todas las preguntas en una página"
              onChange={e => setDatos({ ...datos, paginacion: "todas" })}
            />
            <CustomInput type="radio" id="paginacion2" name="customRadio6"
              checked={datos.paginacion === "1" ? true : false} label="Una pregunta por página"
              onChange={e => setDatos({ ...datos, paginacion: "1" })}
            />

            <Input id="txt_asunto" className="mt-2" type="number" placeholder="Personalizado: ingresa cuantas preguntas por página"
              value={datos["paginacion"] === "todas" || datos["paginacion"] === "1" ? "" : datos["paginacion"]}
              onChange={e => e.target.value >= 0 ? setDatos({ ...datos, paginacion: e.target.value }) : ""}
            />
          </Col>

        </Row>
      </Col>
      <Col md="9" xs="12" className=" mx-auto mt-3">
        <Row>
          <Col md="4" xs="6" className="ml-auto">
            <Button block onClick={crear} style={encuesta.anonima !== null ? {backgroundColor:"#F1BF00"} : { backgroundColor: "#FF7F50" }} className="text-white" ><b>{encuesta.anonima !== null ? "Modificar" : "Continuar"}</b></Button>
          </Col>
        </Row>
      </Col>

    </Row>
  );
}

export default Configuraciones;