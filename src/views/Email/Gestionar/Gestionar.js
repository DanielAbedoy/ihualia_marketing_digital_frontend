import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

import NavBar from '../components/NavBar';
import ModalContenido from './Hooks/Contenido';
import ModalRecividos from './Hooks/Recividos';
import ModalEnviados from './Hooks/Envios';
import ModalLinks from './Hooks/Links';

import ModelContactos from '../../../models/Contactos';
import ModelEmail from '../../../models/EmailMarketing';

class Gestionar extends Component {
  
  state = {

    boletin: '',
    contactos_totales:[],
    enviados: [],
    vistos: [],
    links:[],

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
      console.log(this.props.location.state)
      this.setState({ boletin: this.props.location.state.data }, () => { this.getEnvios(); this.getVistos(); this.getLinks()})
    } else this.props.history.push("/emailmarketing/boletines");
  }


  getEnvios = () => {
    
    if (this.state.boletin.ids_grupos) {
      const ids_gp = this.state.boletin.ids_grupos.split(",");
      ids_gp.pop();
      const ids_cnt = this.state.boletin.ids_contactos.split(",");
      ids_cnt.pop();
      const enviados = [];
      console.log(ids_gp, ids_cnt);
      new ModelContactos().getContactosDelLosGrupos(ids_gp)
        .then(promises => Promise.all(promises))
        .then(arrglos => arrglos.reduce((acc, el) => acc.concat(el), []))
        .then(contactos => {        
          ids_cnt.forEach(id => {
            enviados.push(contactos.find(contacto => contacto.contacto.id == id));
          });
          this.setState({contactos_totales:contactos, enviados:enviados})
        })
        .catch(console.log)
    }
  }

  getVistos = () => {
    new ModelEmail().get_seenBoletin(this.state.boletin.id)
      .then(vistos => {
        if (vistos !== "error") this.setState({vistos:vistos})
      })
  }

  getLinks = () => {
    new ModelEmail().get_links(this.state.boletin.id)
      .then(links => {
        if (links !== "error") this.setState({links:links})
      })
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
                        <p className="h5 m-0"> <b>ID:</b>  </p>
                        <p className="h5 m-0"> <b>Asunto: </b>  </p>
                        <p className="h5 m-0"> <b>Estatus:</b>  </p>
                        <p className="h5 m-0"> <b>Fecha de creación:</b>  </p>

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
                      <Col md="3" xs="10" className="mx-auto" >
                        <Card >
                          <CardHeader className="p-1 bg-primary"><p className="h6 m-0 text-center"><b>Contenido</b></p></CardHeader>
                          <CardBody>
                            <Row>
                              <Col md="12" className="">
                                <p className="display-3 text-center"><b><i className="fa fa-align-center"></i></b></p>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="12" className="m-0 p-0" style={{ cursor: "pointer" }}
                                onClick={e => { this.setState({ contenido_modal: !this.state.contenido_modal }) }}
                              >
                                <p className="text-muted text-center"><b>Ver contenido</b></p>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                      <ModalContenido 
                        open={this.state.contenido_modal}
                        event_toggle={this.setToggleContenido}
                        contenido={this.state.boletin.contenido}
                      />

                      {/* Enviados */}
                      <Col md="3" xs="10" className="mx-auto"  >
                      <Card >
                          <CardHeader className="p-1 bg-primary"><p className="h6 m-0 text-center"><b>Envios</b></p></CardHeader>
                          <CardBody>
                            <Row>
                              <Col md="12" className="">
                                <p className="display-3 text-center"><b><i className="fa fa-envelope-o"></i></b></p>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="12" className="m-0 p-0" style={{ cursor: "pointer" }}
                                onClick={e => { this.setState({ envios_modal: !this.state.envios_modal }) }}
                              >
                                <p className="text-muted text-center"><b>Relacion completa</b></p>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                      <ModalEnviados
                        open={this.state.envios_modal}
                        event_toggle={this.setToggleEnvios}
                        enviados={this.state.enviados}
                      />

                      {/* Recividos */}
                      <Col md="3" xs="10" className="mx-auto" >
                      <Card >
                          <CardHeader className="p-1 bg-primary"><p className="h6 m-0 text-center"><b>Recividos</b></p></CardHeader>
                          <CardBody>
                            <Row>
                              <Col md="12" className="">
                                <p className="display-3 text-center"><b><i className="fa fa-check"></i></b></p>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="12" className="m-0 p-0" style={{ cursor: "pointer" }}
                                onClick={e => { this.setState({ recividos_modal: !this.state.recividos_modal }) }}
                              >
                                <p className="text-muted text-center"><b>Quien lo recivio</b></p>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                      <ModalRecividos
                        open={this.state.recividos_modal}
                        event_toggle={this.setToggleRecividos}
                        vistos={this.state.vistos}
                      />

                      {/* Links */}
                      <Col md="3" xs="10" className="mx-auto" >
                      <Card >
                          <CardHeader className="p-1 bg-primary"><p className="h6 m-0 text-center"><b>Links</b></p></CardHeader>
                          <CardBody>
                            <Row>
                              <Col md="12" className="">
                                <p className="display-3 text-center"><b><i className="fa fa-link"></i></b></p>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="12" className="m-0 p-0" style={{ cursor: "pointer" }}
                                onClick={e => { this.setState({ links_modal: !this.state.links_modal }) }}
                              >
                                <p className="text-muted text-center"><b>Quien dio click</b></p>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                      <ModalLinks 
                        open={this.state.links_modal}
                        event_toggle={this.setToggleLinks}
                        links={this.state.links}
                      />

                    </ Row>



                    
                    

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