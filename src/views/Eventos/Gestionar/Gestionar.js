import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Col, Row, Input, Button, Badge, Collapse } from 'reactstrap';


import NavBar from '../components/NavBar.js';
import ModalRelacionAsBo from './ModalRelacionAsBo';

import Load from '../../../components/Load';
import EventoModel from '../../../models/Eventos';
import Boletos from './Hooks/Boletos/Boletos.jsx';
import Asistentes from './Hooks/Asistencia/Asistencia.jsx';
import Ventas from './Hooks/Ventas/Ventas.jsx';
import Ir from './Hooks/Ir.jsx';

class Gestionar extends Component {

  state = {
    id_evento: 0,
    evento: {},
    boletos: [],
    boletos_adquiridos: 0,
    asistentes: [],
    ventas: 0,
    donaciones: [],
    boletos_asistente: []
  }

  componentDidMount = () => {

    if (!this.props.location.state) {
      this.props.history.push('/eventos/listado');
      return;
    } 
    const id_evento = this.props.location.state.evento.id;
    new EventoModel().get_evento(id_evento)
      .then(evento => {
        if (evento !== "error") this.setState({ evento: evento });
      })

  }

  
  acomodarFehca = fecha => {
    if (!fecha) return;
    const f = fecha.split("T");
    const hora = f[1].split("-");
    return `${f[0]} ${hora[0]}`
  }

  render() {
    const e = this.state.evento;
    return (
      <div className="animated fadeIn">
        {this.state.evento.id ?
          
          <Row>
            <Col xs="12">
              <Card>
              <CardHeader className="text-white p-4" style={{backgroundColor:"#21f077bb"}}>
                <p className="h3"><i className="cui-calendar"></i> Eventos |</p>
              </CardHeader>
                <CardBody >

                  <p className="text-center h6"><b> Estatus del Evento {"  "}</b>
                    <Badge className={`bg-h-${e.estatus === "publicado" ? "success" : "danger"} `}
                    > {e.estatus === "publicado" ? "  Por llevarse a cabo  " : "  Finalizado  "}</Badge>
                  </p>

                  <hr />
                  <p className="h3"> Datos Principales</p>
                  <hr />
                  <Row>
                    <Col md="12"><p className="text-center h4">{e.nombre}</p> </Col>
                    <Col md="12"><p className="text-center h6">Inicio: {this.acomodarFehca(e.fecha_hora_inicio)} </p> </Col>
                    <Col md="12"><p className="text-center h6">Fin: {this.acomodarFehca(e.fecha_hora_fin)}</p> </Col>
                    <Col md="12"><p className="text-center h6">{e.tipo}</p> </Col>
                  </Row>

                  <hr />
                  <p className="h3">Informacion del evento</p>
                  <br />

                  <Row>
                    <Col md="8" xs="12" className="mx-auto">
                      <Ventas boletos={JSON.parse(e.boletos).data} asistentes={e.asistentes} />   
                    </Col>
                  </Row>

                  <Row className="my-3">

                    <Col md="12" xs="12">
                      <Row>
                        <Col md="4" sx="12" className="mx-auto px-4 mb-3">
                          <Ir ir={()=>this.props.history.push(`/evento/${e.url}`)} />
                        </Col>
                        <Col md="4" sx="12" className="mx-auto px-4 mb-3">
                          <Boletos boletos={JSON.parse(e.boletos).data} asistentes={e.asistentes} />
                        </Col>
                        <Col md="4" sx="12" className="mx-auto px-4 mb-3">
                          <Asistentes boletos={JSON.parse(e.boletos).data} asistentes={e.asistentes} />
                        </Col>
                      </Row>
                    </Col>

                    <Col md="4" xs="12">

                    </Col>
                  </Row>

                </CardBody>
              </Card>
            </Col>
          </Row>
          :
          <Load />
        }
      </div>
    );
  }
}

export default Gestionar;