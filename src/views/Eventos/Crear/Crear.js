import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button } from 'reactstrap';

import NavBar from '../components/NavBar.js';
import InformacionBasica from './Hooks/InformacionBasica'
import Ubicacion from './Hooks/Ubicacion/Ubicacion'
import Fechas from './Hooks/FechaHora'
import Detalles from './Hooks/Detalles/Detalles'
import Boletos from './Hooks/Boletos/Boletos'

import ModeloEventos from '../../../models/Eventos';

class Crear extends Component {

  state = {
    evento: ''
  }

  componentDidMount = () => {
    if (this.props.location.state) {
      new ModeloEventos().get_evento_to_continue(this.props.location.state.evento)
        .then(console.log)
    }
  }

  setEvento = (evento) => this.setState({ evento });

  publicar = async () => {
    await new ModeloEventos().modificar_evento(this.state.evento.id, { estatus: "publicado", url:this.generarUrl() });
    this.props.history.push("/eventos/listado")
  }

  generarUrl = () => {
    let cadena = this.state.evento.nombre.toLowerCase();
    let nombre_url = cadena.split(" ").join("-");
    nombre_url += `-${this.state.evento.id}`
    return nombre_url
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
              <CardBody>
                <Row>
                  <Col md="12">
                    <p className="h4 mb-0">Crea un nuevo evento</p>
                    <p className="h6 text-muted">Solo rellena toda la información necesaria y publicalo</p>
                  </Col>
                </Row>
                <hr />
                <Row>

                  {/* //Informacion Basica */}
                  <InformacionBasica
                    setEvento={this.setEvento}
                  />
                </Row>

                <Row>
                  {/* Ubicacion */}
                  {this.state.evento !== '' ?
                    < Ubicacion
                      setEvento={this.setEvento}
                      evento={this.state.evento}
                    />
                    : <></>}
                </Row>

                <Row>
                  {/* FechaHora */}
                  {this.state.evento.lugar || this.state.evento.sitio ?
                    this.state.evento.lugar[0] || this.state.evento.sitio[0] ?
                      <Fechas
                        setEvento={this.setEvento}
                        evento={this.state.evento}
                      />
                      : <></>
                    : <></>
                  }
                </Row>
                <Row>
                  {/* Detalles */}
                  {this.state.evento.fecha_hora_inicio ?
                    this.state.evento.fecha_hora_inicio !== "" ?
                      <Detalles
                        setEvento={this.setEvento}
                        evento={this.state.evento}
                      /> : <></>
                    : <></>
                  }
                </Row>

                <Row>
                  {/* Boletos */}
                  {this.state.evento.componentes ?
                    this.state.evento.componentes.length > 0 ?
                      <Boletos
                        setEvento={this.setEvento}
                        evento={this.state.evento}
                      /> : <></>
                    : <></>}
                </Row>
                <Row>
                  {this.state.evento.boletos ?
                    this.state.evento.boletos.length > 0 ?
                      <Col md="5" xs="12" className="mx-auto mt-3 p-0">
                        <Button block color="success"
                          type="button"
                          onClick={this.publicar}
                        > Publicar Evento </Button>
                      </Col>
                      : <></>
                    : <></>}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Crear;