import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import ModelEncuesta from '../../../../../models/Encuestas';
import CardInfo from './Hooks/CardInfo';
import SingleText from './Hooks/Preguntas/SingleText';
import MultipleSelection from './Hooks/Preguntas/MultipleSelection';
import Incisos from './Hooks/Preguntas/Incisos';
import Comentario from './Hooks/Preguntas/Comentario';
import ImageSelector from './Hooks/Preguntas/ImageSelector';
import ModalDatos from './Hooks/ModalDatos';

const Preguntas = ({ nombre, instrucciones, preguntas, paginacion, anonima, puntuacion, encuesta, creado, ir }) => {

  const [datos, setDatos] = useState({});
  const [cmpPreguntas, setCmpPreguntas] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [infoPersonal, setInfoPersonal] = useState({ nombre: "", correo: "" });
  const [openModal, setOpenModal] = useState(false);


  useEffect(() => acomodarPreguntas(), [])

  const plusPagina = () => {
    let n = pagina + 1;
    if (cmpPreguntas[n]) {
      setPagina(pagina + 1);
      window.scrollTo(0, 70);
    }
  }

  const menusPagina = () => {
    let n = pagina - 1;
    if (n === 0) return;
    setPagina(pagina - 1);
    window.scrollTo(0, 70);
  }

  const acomodarPreguntas = () => {
    if (paginacion === "todas") showTodas();
    else paginar();
  }

  const paginar = () => {
    let p = 1;
    let obj = {};
    let d = {};
    const arrP = preguntas.data;
    for (let i = 0; i < arrP.length; i++) {
      let aux = [];
      for (let j = 0; j < paginacion; j++) {
        if (arrP[`${(j + i)}`]) {
          d = { ...d, [`${arrP[j + i].n}`]: { respuesta: "", estatus: "" } };
          aux.push({ component: selectComponent(arrP[j + i].tipo, { pos: arrP[j + i].n, content: { opciones: arrP[j + i].opciones, pregunta: arrP[j + i].pregunta, puntuacion: arrP[j + i].puntuacion, respuesta: arrP[j + i].respuesta, subTipo: arrP[j + i].subTipo } }) });
          i = j + i;
        }
      }
      obj = { ...obj, [p]: aux };
      p++;
    }
    setCmpPreguntas(obj);
    setDatos(d);

  }

  const showTodas = () => {
    let p = [];
    let d = {};
    preguntas.data.forEach(preg => {
      d = { ...d, [`${preg.n}`]: { respuesta: "", estatus: "" } };
      p.push({ component: selectComponent(preg.tipo, { pos: preg.n, content: { opciones: preg.opciones, pregunta: preg.pregunta, puntuacion: preg.puntuacion, respuesta: preg.respuesta, subTipo: preg.subTipo } }) });
    });
    setCmpPreguntas([...p]);
    setDatos(d);
  }

  const selectComponent = (tipo, data) => {
    if (tipo === "singletext") return <SingleText posicion={data.pos} content={data.content} encuesta={encuesta} calificacion={puntuacion} />
    else if (tipo === "multipleselection") return <MultipleSelection posicion={data.pos} content={data.content} encuesta={encuesta} calificacion={puntuacion} />
    else if (tipo === "incisos") return <Incisos posicion={data.pos} content={data.content} encuesta={encuesta} calificacion={puntuacion} />
    else if (tipo === "comentario") return <Comentario posicion={data.pos} content={data.content} encuesta={encuesta} calificacion={puntuacion} />
    else if (tipo === "truefalse") return <Incisos posicion={data.pos} content={data.content} encuesta={encuesta} calificacion={puntuacion} />
    else if (tipo === "imageselector") return <ImageSelector posicion={data.pos} content={data.content} encuesta={encuesta} calificacion={puntuacion} />
  }

  const sendResponses = () => {
    if (!cmpPreguntas[pagina + 1]) {
      return (
        <Row className="mt-3">
          <Col md="8" xs="10" className="mx-auto">
            <div onClick={anonima ? ()=> responder(infoPersonal, datos) : () => setOpenModal(!openModal)}
              className="btn-h text-white bg-primary" style={{ width: "100%" }}>Enviar Respuestas</div>
          </Col>
        </Row>
      )
    }
    return null;
  }

  const responder = async () => {
    const preg_json = JSON.stringify(datos);
    const resp = await new ModelEncuesta().add_encuestado({ encuesta: encuesta ,nombre: infoPersonal.nombre, correo: infoPersonal.correo, respuestas_json: preg_json });
    if (resp.statusText === "Created") creado();
    else {
      setOpenModal(false);
      confirmAlert({
        title: "Upss",
        message: `Algo salio mal a la hora de guardar la informacion, te pedimos que vuelvas a intentarlo`,
        buttons:[{label:"Volver a intentar", onClick:()=> ir()}]
      })
    }
  }

  return (
    <Row className="py-5 m-0 p-0">
      <Col md="8" xl="7" xs="11" className="mx-auto">
        <CardInfo nombre={nombre} instrucciones={instrucciones} />

        {paginacion === "todas" ?
          <>
            {cmpPreguntas.map((p, i) => {
              return (
                <div key={i}>
                  {React.cloneElement(p.component, { setDatos: setDatos, datos: datos })}
                </div>
              );
            })}
          </>
          :
          <>
            {cmpPreguntas[pagina] ?
              <>
                {cmpPreguntas[pagina].map((p, i) => {
                  return (
                    <div key={i}>
                      {React.cloneElement(p.component, { setDatos: setDatos, datos: datos })}
                    </div>
                  );
                })}
                <Row className="mt-3" >
                  <Col md="2" xs="6" >
                    <p className="text-center h2 m-0"><b onClick={menusPagina} style={{ cursor: "pointer" }} ><i className="fa fa-arrow-left"></i></b></p>
                  </Col>
                  <Col md="2" xs="6" className="ml-auto">
                    <p className="text-center h2 m-0"><b onClick={plusPagina} style={{ cursor: "pointer" }} ><i className="fa fa-arrow-right"></i></b></p>
                  </Col>
                </Row>

                {sendResponses()}

              </>
              : <></>
            }
          </>
        }
      </Col>

      <ModalDatos
        open={openModal}
        setOpen={(f) => { setOpenModal(f); setInfoPersonal({ nombre: "", correo: "" }) }}
        setInpoPersonal={setInfoPersonal}
        info={infoPersonal}
        responder={()=> responder(infoPersonal, datos)}
      />
    </Row>
  );
}

export default Preguntas;