import React from 'react';
import { Row, Col,Input } from 'reactstrap';

const Layout = ({ component, preguntas, setPreguntas, setPosition, p, calification, encuesta }) => {

  const eliminar = (posicion) => {
    let newArr = preguntas.filter(p => p.posicion !== posicion);
    newArr.forEach(p => { if (p.posicion > posicion) p["posicion"] = p.posicion - 1; });
    setPreguntas(newArr)
    setPosition(p - 1);
  }
  
  const seleccionado = component => {
    preguntas.forEach(l => {
      if (l.posicion === component) l["isSelected"] = true;
      else l["isSelected"] = false;
    });
    setPreguntas([...preguntas])
  }

  const moveToUp = (posicion) => {
    if (posicion === 1) return;
    const cmpt = preguntas.find(p => p.posicion == posicion);
    let newArr = preguntas.filter(p => p.posicion !== posicion);
    newArr.splice(posicion - 2, 0, cmpt);
    newArr.forEach((e, i) => e["posicion"] = i+1);
    setPreguntas(newArr);
  }

  const moveToDown = (posicion) => {
    if (posicion === preguntas.length) return;

    const cmpt = preguntas.find(p => p.posicion == posicion);
    let newArr = preguntas.filter(p => p.posicion !== posicion);
    newArr.splice(posicion, 0, cmpt);
    newArr.forEach((e, i) => e["posicion"] = i+1);
    setPreguntas(newArr);
  }

  const setContent = (value) => {
    component.content = value;
    setPreguntas([...preguntas]);
  }


  return (
    <Row className="px-2 my-2" >
      <Col md="12" className={`${component.isSelected ? "border" : ""}`} >
        {component.isSelected ?
          <Row className="d-flex justify-content-end">
            {/* Partes. eliminar, mover arriba, mover abajo */}
            <span className="mx-2 h5"
              style={{cursor:"pointer"}}
              onClick={()=> eliminar(component.posicion)}
            >
              <i className="fa fa-times-circle"></i>
            </span>
            <span className="mx-2 h5"
              style={{cursor:"pointer"}}
              onClick={()=> moveToUp(component.posicion)}
            ><i className="fa fa-arrow-up"></i></span>
            <span className="mx-2 h5"
              style={{cursor:"pointer"}}
              onClick={()=> moveToDown(component.posicion)}
            ><i className="fa fa-arrow-down"></i></span>
          </Row>
          : <></>}

        <Row className="bg-light p-2" onClick={() => seleccionado(component.posicion)}>
          {calification ? 
            <Col md="12">
              <Row  >
                <Col md="9 d-flex justify-content-end">
                  <p className="m-0 text-right align-self-center"><b>Pregunta {component.posicion}</b></p>
                </Col>
                <Col md="3" className="p-0">
                  <Input width="100%" value={component.content.puntuacion}
                    type="number" placeholder="Puntuacion"
                    onChange={e => { if (e.target.value >= 0) setContent({ ...component.content, puntuacion: e.target.value }) }}
                  />
                </Col>
              </Row>
            </Col>
        :
          <Col md="12"><p className="m-0 text-right"><b>Pregunta {component.posicion}</b></p></Col>    
        }
        
          {React.cloneElement(component.cmpt, {setValueContent: setContent, content: component.content, caliification: calification, encuesta:encuesta})}
        </Row>
      </Col>
    </Row>
  );
}

export default Layout;