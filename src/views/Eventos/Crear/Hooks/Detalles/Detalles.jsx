import React, { useState } from 'react';
import { Row, Col, Input, Collapse, Button } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import ModeloEvento from '../../../../../models/Eventos'

import ImageUploader from './ImageUploader';
import RTE from './RTE';
import VideoThumbnail from './Thumbnail';

const Detalles = props => {

  const { addToast } = useToasts();
  const [n, setN] = useState(1);
  const [componentes, setComponentes] = useState([]);
  const [open, setOpen] = useState(true);
  const [creado, setCreado] = useState();
  const [datos, setDatos] = useState({ imagen: '', resumen: "" });


  const addComponente = (tipo) => {
    switch (tipo) {
      case "imagen":

        setComponentes([...componentes, { posicion: n, hook: <ImageUploader evento={props.evento.id} posicion={n} />, contenido: "", tipo: "imagen" }]);
        setN(n + 1);

        break;
      case "video":

        setComponentes([...componentes, { posicion: n, hook: <VideoThumbnail posicion={n} />, contenido: "", tipo: "video" }]);
        setN(n + 1);
        break;
      case "parrafo":

        setComponentes([...componentes, { posicion: n, hook: <RTE posicion={n} />, contenido: "", tipo: "parrafo" }]);
        setN(n + 1);
        break;
    }
  }

  const setValues = (pos, contenido) => componentes.forEach(c => { if (c.posicion === pos) c.contenido = contenido });


  const quitar_componente = (posicion) => {
    const new_arr = componentes.filter(c => c.posicion != posicion);
    setComponentes(new_arr);
  }

  const validar = () => {
    if (datos.imagen === '' || datos.resumen === '') {
      addToast("Debes agregar los datos principales", { appearance: "info", autoDismiss: true });
      return false;
    }

    if (componentes.length === 0) {
      confirmAlert({
        message: "¿ Seguro que no incluiras componentes extras ?", buttons: [
          { label: "Si", onClick: () => true },
          { label: "No", onClick: () => false },
        ]
      })
    }
    return true;

  }

  const crear = async () => {

    if (!validar()) return;

    const saveInfo = async() => {
      const resp = await new ModeloEvento().modificar_evento(props.evento.id, datos);
      if (resp.statusText === "OK") {
        //Agregar los valores de componentes
        setCreado(true);
        setOpen(false);
        props.setEvento(resp.data);
        addToast("Guardado correctamente", { appearance: "success", autoDismiss: true });

      } else addToast("Algo salio mal", { appearance: "error", autoDismiss: true });
    }


    let componentToSend = acomodarComponentes();
    if (componentToSend.length > 0) {
      const r = await new ModeloEvento().add_componentes(props.evento.id, componentToSend);
      if (r.statusText === "OK") saveInfo();
      else addToast("Algo salio mal", { appearance: "error", autoDismiss: true });
    } else saveInfo();






    //Cambiar los datos del evento



  }

  const acomodarComponentes = () => {
    let arr = [];
    componentes.forEach(c => {
      if (c.contenido != "") arr.push({ posicion: c.posicion, contenido: c.contenido, tipo: c.tipo });
    })
    return arr;
  }



  return (
    <Col md="9" xs="12" className="mx-auto">
      <p className="h3 mb-4"><b><i className="fa fa-asterisk"></i> Detalles</b>
        {creado ?
          <i
            className={`fa fa-${!open ? "chevron-down" : "chevron-up"} float-right p-1`}
            style={{ cursor: "pointer" }}
            onClick={e => setOpen(!open)}
          ></i> : <></>
        }
      </p>
      <Collapse isOpen={open}>
        <Row>
          <Col md="11" xs="12" className="mx-auto">
            <span className="h5">Imagen Principal*</span><br />
            <br />
            <ImageUploader
              evento={props.evento.id}
              setDato={(dato) => setDatos({ ...datos, imagen: dato })}
            />
            <br />
            <span className="h5">Resumen del evento*</span>
            <Input
              id="resumen"
              onChange={e => setDatos({ ...datos, resumen: e.target.value })}
              className="mt-2" style={{ height: "80px" }} type="textarea" placeholder="describe de que tratara el evento" /><br />

            <span className="h5">Incluye mas textos imagenes o videos (opcional)</span><br /><br />

            {componentes.map((component, i) => {

              return (
                <div key={i}>
                  <Row>
                    <Col md="12">
                      {React.cloneElement(component.hook, { setValues: setValues })}
                      <br />
                      <Col md="5" xs="8" className="rounded mx-auto">
                        <Button id={i}
                          onClick={() => quitar_componente(component.posicion)}
                          block color="danger" ><i className="fa fa-trash"></i> Quitar Componente</Button>
                      </Col>
                    </Col>
                  </Row>
                  <hr />
                </div>
              );
            })}
            <Row>
              <Col className="ml-auto p-2">
                <Button onClick={() => addComponente("parrafo")} block color="white" className="h6 shadow"> <i className="fa fa-paragraph"></i> Añade un Parrafo</Button>
              </Col>
              <Col className="p-2">
                <Button onClick={() => addComponente("imagen")} block color="white" className="h6 shadow"> <i className="fa fa-picture-o"></i> Añade una Imagen</Button>
              </Col>
              <Col className="p-2">
                <Button onClick={() => addComponente("video")} block color="white" className="h6 shadow"> <i className="fa fa-video-camera"></i> Añade un Video</Button>
              </Col>
            </Row>

          </Col>
          <Col md="12">
            <Row>
              <Col md="4" xs="7">
                <Button onClick={crear} color={creado ? "info" : "success"} block >{creado ? "Modificar" : "Continuar"}</Button>
              </Col>
            </Row>
          </Col>

        </Row>

      </Collapse>
      <Row><Col md="12" className="border border-light my-4"></Col></Row>
    </Col>
  );
}

export default Detalles;