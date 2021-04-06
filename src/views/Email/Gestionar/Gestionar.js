import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

import Load from '../../../components/Load';
import ModalContenido from './Hooks/Contenido';
import ModalRecividos from './Hooks/Recividos';
import ModalEnviados from './Hooks/Envios';
import ModalLinks from './Hooks/Links';

import ModelContactos from '../../../models/Contactos';
import ModelEmail from '../../../models/EmailMarketing';
import { SessionContext } from '../../../sessionContext';

class Gestionar extends Component {

  static contextType = SessionContext;
  state = {

    boletin: '',
    contactos: [],

    contenido_modal: false,
    envios_modal: false,
    recividos_modal: false,
    links_modal: false,
  }
  setToggleContenido = bool => this.setState({ contenido_modal: bool });
  setToggleEnvios = bool => this.setState({ envios_modal: bool });
  setToggleRecividos = bool => this.setState({ recividos_modal: bool });
  setToggleLinks = bool => this.setState({ links_modal: bool });

  componentDidMount = () => {
    if (this.props.location.state) {
      const boletin = this.props.location.state.data;
      if (boletin.estatus.toLowerCase() === "enviado") this.setState({ boletin: boletin }, () => { this.getContactos()})
      else this.setState({ boletin: boletin });

    } else this.props.history.push("/emailmarketing/boletines");
  }


  getContactos = async() => {
    const gps = await new ModelContactos().getGrupos(this.context.cuenta.id);
    if (typeof gps !== "object") return;
    let c = [];
    this.state.boletin.grupos.forEach(g => {
      const gHere = gps.find(gp => gp.id == g);
      if (gHere.contactos) c = [...c, ...gHere.contactos];
    });
    this.setState({contactos:c})
  }

  render() {
    return (
      <div className="animated fadeIn">
        {this.state.boletin !== "" ?
          <Row>
            <Col xs="12">
              <Card>
                <CardHeader className="bg-primary text-white p-4">
                  <p className="h3"><i className="fa fa-envelope-o"></i> EmailMarketing |</p>
                  {/* <NavBar /> */}
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="12">
                      <p className="h3 m-0"><b>Informacion sobre tu boletoin</b></p>
                      <p className="text-muted">Podras saber quien y cuando fue visto tu boletin y su contenido</p>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col md="12" >

                      {/* Datos Iniciales : ID, Asunto, Estaus, Fecha creado*/}
                      <Row>
                        <Col md="12">
                          <p className="h4">Datos Principales</p>
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col md="12" className="text-center">
                          <p className="h5 m-0"> <b className="mr-2">ID:</b> {this.state.boletin.id} </p>
                          <p className="h5 m-0"> <b className="mr-2">Asunto: </b> {this.state.boletin.asunto} </p>
                          <p className="h5 m-0"> <b className="mr-2">Estatus:</b>  {this.state.boletin.estatus ? this.state.boletin.estatus.toUpperCase() : ""}</p>
                          <p className="h5 m-0"> <b className="mr-2">Fecha de creación:</b> {this.state.boletin.fecha_creado} </p>
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col md="12">
                          <p className="h4">Gestión</p>
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        {/* Contenido */}
                        <Col md="3" xs="10">
                          <Row className="px-3">
                            <Col md="12"
                              onClick={() => this.setState({ contenido_modal: !this.state.contenido_modal })}
                              className="mx-auto px-2 py-4 bg-primary cursor-p shadow-lg rounded d-flex flex-column align-items-center justify-content-center"
                            >
                              <p className="display-3 text-center"><b><i className="fa fa-align-center"></i></b></p>
                              <p className="text-white text-center h3 m-0"><b>Contenido</b></p>
                            </Col>
                          </Row>
                        </Col>
                        <ModalContenido
                          open={this.state.contenido_modal}
                          event_toggle={this.setToggleContenido}
                          contenido={this.state.boletin.contenido}
                        />

                        {this.state.boletin.estatus === "enviado" ?
                          <>
                            {/* Enviados */}
                            <Col md="3" xs="10">
                              <Row className="px-3">
                                <Col md="12"
                                  onClick={() => this.setState({ envios_modal: !this.state.envios_modal })}
                                  className="mx-auto px-2 py-4 bg-primary cursor-p shadow-lg rounded d-flex flex-column align-items-center justify-content-center"
                                >
                                  <p className="display-3 text-center"><b><i className="fa fa-envelope-o"></i></b></p>
                                  <p className="text-white text-center h3 m-0"><b>Enviados</b></p>
                                </Col>
                              </Row>
                            </Col>
                            <ModalEnviados
                              open={this.state.envios_modal}
                              event_toggle={this.setToggleEnvios}
                              enviados={JSON.parse(this.state.boletin.enviados).data}
                              contactos={this.state.contactos}
                            />

                            {/* Recividos */}
                            <Col md="3" xs="10">
                              <Row className="px-3">
                                <Col md="12"
                                  onClick={() => this.setState({ recividos_modal: !this.state.recividos_modal })}
                                  className="mx-auto px-2 py-4 bg-primary cursor-p shadow-lg rounded d-flex flex-column align-items-center justify-content-center"
                                >
                                  <p className="display-3 text-center"><b><i className="fa fa-check"></i></b></p>
                                  <p className="text-white text-center h3 m-0"><b>Recividos</b></p>
                                </Col>

                              </Row>
                            </Col>

                            <ModalRecividos
                              open={this.state.recividos_modal}
                              event_toggle={this.setToggleRecividos}
                              vistos={this.state.boletin.contactos_vistos}
                              contactos={this.state.contactos}
                            />

                            {/* Links */}
                            <Col md="3" xs="10">
                              <Row className="px-3">
                                <Col md="12"
                                  onClick={() => this.setState({ links_modal: !this.state.links_modal })}
                                  className="mx-auto px-2 py-4 bg-primary cursor-p shadow-lg rounded d-flex flex-column align-items-center justify-content-center"
                                >
                                  <p className="display-3 text-center"><b><i className="fa fa-link"></i></b></p>
                                  <p className="text-white text-center h3 m-0"><b>Links</b></p>
                                </Col>

                              </Row>
                            </Col>
                            <ModalLinks
                              open={this.state.links_modal}
                              event_toggle={this.setToggleLinks}
                              links={JSON.parse(this.state.boletin.links).data}
                              vistos={this.state.boletin.links_vistos}
                              contactos={this.state.contactos}
                            />

                          </>
                          :
                          <>
                            <Col md="12">
                              <hr />
                              <Row>
                                <Col md="10" xs="12" className="mx-auto">
                                  <p className="text-center h5"><b>Todo el contenido estara disponible una vez que haya sido publicado el boletin</b></p>
                                </Col>
                              </Row>
                            </Col>

                          </>
                        }
                      </ Row>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          : <Load />
        }

      </div>
    );
  }
}

export default Gestionar;