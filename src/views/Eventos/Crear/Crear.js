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
        .then(ev => this.setState({ evento: ev }))
    }
  }

  setEvento = (evento) => this.setState({ evento });

  publicar = async () => {
    await new ModeloEventos().modificar_evento(this.state.evento.id, { estatus: "publicado", url: this.generarUrl() });
    this.props.history.push("/eventos/listado")
  }

  generarUrl = () => {
    let cadena = this.state.evento.nombre.toLowerCase();
    let nombre_url = cadena.split(" ").join("-");
    nombre_url += `-${this.state.evento.id}`
    return nombre_url
  }

  render() {

    const e = this.state.evento;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
            <CardHeader className="text-white p-4" style={{backgroundColor:"#21f077bb"}}>
                <p className="h3"><i className="cui-calendar"></i> Eventos |</p>
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
                    evento={this.state.evento}
                    setEvento={this.setEvento}
                    datosBorrador={{ nombre: e.nombre, tipo: e.tipo, categoria: e.categoria, subcategoria: e.sub_categoria, etiquetas: e.etiquetas }}
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
                  {this.state.evento.ubicacion && this.state.evento.ubicacion !== "" ?
                    <Fechas
                      setEvento={this.setEvento}
                      evento={this.state.evento}
                    />
                    : <></>
                  }
                </Row>
                <Row>
                  {/* Detalles */}
                  {this.state.evento.fecha_hora_inicio ?
                    this.state.evento.fecha_hora_inicio !== null ?
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
                  {this.state.evento.boletos && this.state.evento.boletos !== "" ?
                    JSON.parse(this.state.evento.boletos).data.length > 0 ?
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