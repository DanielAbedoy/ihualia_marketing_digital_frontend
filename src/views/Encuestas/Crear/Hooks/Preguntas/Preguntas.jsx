import React, { useState, useEffect } from 'react';
import { Col, Row, Input, Button } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';
import Chooser from './Chooser';
import Layout from './Tipos/Layout';
import ModelEncuestas from '../../../../../models/Encuestas'

const Preguntas = ({ encuesta, setEncuesta, close, preguntasBorrador }) => {

  const [preguntas, setPreguntas] = useState([]);
  const [position, setPosition] = useState(1);
  const { addToast } = useToasts();

  const addComponent = (compt, tipo) => {
    setPreguntas([...preguntas.slice(),
    {
      posicion: position, cmpt: compt, isSelected: false,
      content: { tipo: tipo, subTipo: "texto", pregunta: "", opciones: [], respuesta: "", puntuacion: "" }
    }
    ])
    setPosition(position + 1);
  }

  const validar = () => {

    const salir = () => {
      addToast("Debes llenar correctamente todas las preguntas", { appearance: "info", autoDismiss: true });
      return false;
    }

    for (let i = 0; i < preguntas.length; i++) {
      const p = preguntas[i].content;
      if (p.pregunta === "") return salir();

      if (p.tipo === "multipleselection" || p.tipo === "incisos" || p.tipo === "truefalse" || p.tipo === "imageselector") {
        if (p.opciones.length === 0) return salir();
        if (encuesta.ponderacion) {
          if (p.puntuacion === "") return salir();
          let f = false;
          for (let j = 0; j < p.opciones.length; j++) {
            if (p.opciones[j].check === true) f = true;
          }
          if (!f) return salir();
        }
      } else {
        if (encuesta.ponderacion && (p.respuesta === "" || p.puntuacion === "" )) return salir();
      }
    }
    return true;

  }

  const generarJson = () => {
    let preguntas_arr = { data: [], ponderacion: encuesta.ponderacion };
    preguntas.forEach(p => {
      preguntas_arr.data.push({ n: p.posicion, tipo: p.content.tipo, subTipo: p.content.subTipo, pregunta: p.content.pregunta, opciones: p.content.opciones, puntuacion: p.content.puntuacion, respuesta: p.content.respuesta });
    })
    return JSON.stringify(preguntas_arr);
  }

  const crear = async () => {
    if (!validar()) return;
    const resp = await new ModelEncuestas().modificar_encuesta(encuesta.id, { preguntas_json: generarJson() });
    if (resp.statusText === "OK") {
      addToast("Agregado correctamente", { appearance: "success", autoDismiss: true });
      setEncuesta(resp.data);
      close();
    } else addToast("Algo salio mal", { appearance: "error", autoDismiss: true });

  }

  return (
    <Row>
      <Col md="12" xs="12" className="mx-auto">
        <Row className="shadow">

          <Col md="3" xs="12" className="rounded bg-h-warningL" >
            <Chooser position={position} setPosition={setPosition} addComponent={addComponent} ponderacion={encuesta.ponderacion} setPreguntas={setPreguntas} preguntasBorrador={preguntasBorrador} />
          </Col>
          <Col md="9" xs="12">

            {preguntas.map((pregunta, i) => {
              return (
                <Layout
                  key={i}
                  component={pregunta}
                  preguntas={preguntas}
                  setPreguntas={setPreguntas}
                  p={position}
                  setPosition={setPosition}
                  calification={encuesta.ponderacion}
                  encuesta={encuesta.id}
                />
              );
            })}
          </Col>
        </Row>
      </Col>
      <Col md="12" xs="12" className=" mx-auto mt-3">
        <Row>
          <Col md="4" xs="6" className="ml-auto">
            {
              preguntas.length > 0 ?
                <Button block onClick={crear} style={{ backgroundColor: "#FF7F50" }} className="text-white" ><b>{encuesta.preguntas_json !== "" ? "Modificar" : "Continuar"}</b></Button>
                : <></>
            }
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Preguntas;