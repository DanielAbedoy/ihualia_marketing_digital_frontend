import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Col, Row, Input, Button, Badge, Collapse } from 'reactstrap';


import NavBar from '../components/NavBar.js';
import ModalRelacionAsBo from './ModalRelacionAsBo';

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
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <NavBar />
              </CardHeader>
              <CardBody >

                <p className="text-center h6"><b> Estatus del Evento {"  "}</b>
                  <Badge className={`bg-h-${this.state.evento.estatus === "publicado" ? "success" : "danger"} `}
                  > {this.state.evento.estatus === "publicado" ? "  Por llevarse a cabo  " : "  Finalizado  "}</Badge>
                </p>

                <hr />
                <p className="h3"> Datos Principales</p>
                <hr />
                <Row>
                  <Col md="12"><p className="text-center h4">{this.state.evento.nombre}</p> </Col>
                  <Col md="12"><p className="text-center h6">{this.state.evento.fecha_estatus === "normal" ? "Por llevarse a cabo" : "Pasado"}</p> </Col>
                  <Col md="12"><p className="text-center h6">Inicio: {this.acomodarFehca(this.state.evento.fecha_hora_inicio)} </p> </Col>
                  <Col md="12"><p className="text-center h6">Fin: {this.acomodarFehca(this.state.evento.fecha_hora_fin)}</p> </Col>
                  <Col md="12"><p className="text-center h6">{this.state.evento.tipo}</p> </Col>
                </Row>

                <hr />
                <p className="h3">Informacion del evento</p>
                <br />
                <Row className="my-3">

                  <Col md="8" xs="12">
                    <Row>
                      <Col md="6" sx="12" className="mx-auto px-4 mb-3">
                        <Ir />
                      </Col>
                      <Col md="6" sx="12" className="mx-auto px-4 mb-3">
                        <Boletos boletos={this.state.evento.boletos || []} asistentes={this.state.evento.asistentes || []} />
                      </Col>
                      <Col md="6" sx="12" className="mx-auto px-4 mb-3">
                        <Asistentes />
                      </Col>
                      <Col md="6" sx="12" className="mx-auto px-4 mb-3">
                        <Ventas />
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
      </div>
    );
  }
}

export default Gestionar;