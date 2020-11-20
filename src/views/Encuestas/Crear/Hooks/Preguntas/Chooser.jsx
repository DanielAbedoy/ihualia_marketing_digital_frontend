import React,{useEffect} from 'react';
import { Col, Row } from 'reactstrap';

import SingleText from './Tipos/SingleText';
import MultipleSelection from './Tipos/MultipleSelection';
import Incisos from './Tipos/Incisos';
import Comentario from './Tipos/Comentario';
import TrueFalse from './Tipos/TrueFalse';
import ImageSelector from './Tipos/ImageSelector';


const Chooser = ({ addComponent, setPreguntas, preguntasBorrador, setPosition, position }) => {


  const add = (tipo) => {
    switch (tipo) {
      case "singletext":
        addComponent(<SingleText  />, tipo)
        break;
      case "multipleselection":
        addComponent(<MultipleSelection />, tipo)
        break;
      case "incisos":
        addComponent(<Incisos  />, tipo)
        break;
      case "comentario":
        addComponent(<Comentario />, tipo)
        break;
      case "truefalse":
        addComponent(<TrueFalse />, tipo)
        break;
      case "imageselector":
        addComponent(<ImageSelector />, tipo)
        break;
    }
  }

  const addBorrador = (tipo) => {
    switch (tipo) {
      case "singletext":
        return <SingleText  />
      case "multipleselection":
        return <MultipleSelection />
      case "incisos":
        return <Incisos  />
      case "comentario":
        return <Comentario />
      case "truefalse":
        return <TrueFalse />
      case "imageselector":
        return <ImageSelector />
    }
  }

  useEffect(() => {
    if (preguntasBorrador.data) {
      let pregs = [];
      preguntasBorrador.data.forEach(p => {
        pregs = [...pregs.slice(),
        {
          posicion: p.n, cmpt: addBorrador(p.tipo), isSelected: false,
          content: { tipo: p.tipo, subTipo: p.subTipo, pregunta: p.pregunta, opciones: p.opciones, respuesta: p.respuesta, puntuacion: p.puntuacion }
        }
        ];
        setPosition(position + 1);
      })
      setPreguntas([...pregs])
    }
  },[preguntasBorrador])

  return (
    <Row style={{ height: "100%" }} >
      <Col md="12" className="d-flext flex-column align-items-center justify-content-center my-3">
        <p className="h5 mb-4 text-white"><b>Preguntas</b></p>

        <p className="border-bottom text-white border-white"
          style={{ cursor: "pointer" }} onClick={() => add("singletext")}
        >
          <i className="fa fa-text-width"></i>
          <span className="mr-3"></span>
          Solo un texto
        </p>

        <p className="border-bottom text-white border-white"
          style={{ cursor: "pointer" }} onClick={() => add("multipleselection")}
        >
          <i className="fa fa-check-square-o"></i>
          <span className="mr-3"></span>
          Seleccion Multiple
        </p>


        <p className="border-bottom text-white border-white"
          style={{ cursor: "pointer" }} onClick={() => add("incisos")}
        >
          <i className="fa fa-dot-circle-o"></i>
          <span className="mr-3"></span>
          Incisos
        </p>

        <p className="border-bottom text-white border-white"
          style={{ cursor: "pointer" }} onClick={() => add("comentario")}
        >
          <i className="fa fa-commenting-o"></i>
          <span className="mr-3"></span>
          Comentario
        </p>

        <p className="border-bottom text-white border-white"
          style={{ cursor: "pointer" }} onClick={() => add("truefalse")}
        >
          <i className="fa fa-adjust"></i>
          <span className="mr-3"></span>
          Si No
        </p>

        <p className="border-bottom text-white border-white"
          style={{ cursor: "pointer" }} onClick={() => add("imageselector")}
        >
          <i className="fa fa-picture-o"></i>
          <span className="mr-3"></span>
          Selector de imagenes
        </p>


      </Col>
    </Row>

  );
}

export default Chooser;