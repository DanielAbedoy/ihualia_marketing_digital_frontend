import React, { Component, useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Button, Collapse } from 'reactstrap';

import DatosIniciales from './Hooks/DatosPrincipales';
import Plantillas from './Hooks/Plantillas';
import Boletin from './Hooks/Boletin';
import Grupos from './Hooks/Grupos';

import Model_Email from '../../../models/EmailMarketing';
import Model_Contactos from '../../../models/Contactos';




class Boletines extends Component {

  state = {
    boletin:"",
    openDI: true,
    openBoletin: true,

    plantilla:""
  }


  componentDidMount = () => {
    if (this.props.location.state) {
      const b = this.props.location.state.boletin;
      if(b.contenido !== "")this.setState({ boletin: b, plantilla: b.contenido  });
      else this.setState({ boletin: b  });
    }
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader className="bg-primary text-white p-4">
                <p className="h3"><i className="fa fa-envelope-o"></i> EmailMarketing |</p>
                {/* <NavBar /> */}
              </CardHeader>
              <CardBody>
                {/* Titulo */}
                <Row>
                  <Col md="12">
                    <p className="h3 m-0"><b>Crea un nuevo boletin</b></p>
                    <p className="text-muted">Solo sigue los siguientes pasos</p>
                  </Col>
                </Row>
                <hr />

                {/* Paso 1 Seleccionar asunto */}
                <Row>
                  <Col md="9" xs="12" className="mx-auto">
                    <p className="h5"><b> <span className="h2">①</span> Agrega los datos principales</b>
                    {this.state.datosBoletin !== '' ?
                        <span className="float-right mt-2 h4"><i className={"" + (this.state.openDI ? "fa fa-chevron-up" : "fa fa-chevron-down")} style={{ cursor: "pointer" }}
                          onClick={() => { this.setState({ openDI: !this.state.openDI }) }}
                        ></i></span>
                        : <></>
                      }
                    </p>
                    <hr />
                  </Col>

                  <Collapse isOpen={this.state.openDI}>
                    <DatosIniciales
                      boletin={this.state.boletin}
                      setBoletin={(b) => this.setState({ boletin: b })}
                      close={() => this.setState({ openDI: false })}
                    />
                  </Collapse>
                </Row>

                <br />
                {/* Paso 2 Seleccionar plantilla */}
                {this.state.boletin.id ?
                  <Row>
                    <Col  md="9" xs="12" className="mx-auto">
                      <p className="h5"><b> <span className="h2">②</span> Selecciona una plantilla </b>
                      </p>
                      <hr />
                    </Col>
                    <Plantillas
                      plantilla={this.state.plantilla}
                      event_setPlantilla={(p) => { this.setState({ plantilla: p }) }}
                      boletin={this.state.boletin}
                      setBoletin={(b) => this.setState({ boletin: b })}
                    />

                  </Row>
                  : <></>
                }
                {/* Paso 3 Crear el boletin */}
                {this.state.plantilla !== "" ?
                  <>
                    <Row>
                      <Col md="9" xs="12" className="mx-auto">
                        <p className="h5"><b> <span className="h2">③</span> Crea el Boletin</b>
                            {this.state.boletin.contenido !== '' ?
                            <span className="float-right mt-2"><i className={" " + (this.state.openBoletin ? "fa fa-chevron-up" : "fa fa-chevron-down")} style={{ cursor: "pointer" }}
                              onClick={() => { this.setState({ openBoletin: !this.state.openBoletin }) }}
                            ></i></span>
                            : <></>
                          }
                        </p>
                        <hr />
                      </Col>
                      <Collapse style={{ width: "100%" }} isOpen={this.state.openBoletin}>
                        <Boletin
                          plantilla={this.state.plantilla}
                          changePlantilla={() => this.setState({ plantilla: "" })}
                          boletin={this.state.boletin}
                          setBoletin={(b) => this.setState({ boletin: b })}
                          close={() => this.setState({ openBoletin: false })}
                        />
                      </Collapse>
                    </Row>

                    <br />
                  {/* Paso 4 Seleccionar el grupo de contactos a enviar */}
                    {this.state.boletin.contenido && this.state.boletin.contenido !== "" ?
                      <Row>
                        <Col  md="9" xs="12" className="mx-auto">
                          <p className="h5"><b> <span className="h2">④</span> Selecciona el grupo de contactos al que se le enviara el boletin</b> </p>
                          <hr />
                        </Col>

                        <Grupos
                          plantilla={this.state.plantilla}
                          boletin={this.state.boletin}
                          setBoletin={(b) => this.setState({ boletin: b })}
                          _grupos={this.get_grupos}
                          history={this.props.history}
                        />
                      </Row>
                      : <>  </>
                    }
                  </>
                  :
                  <></>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

}

export default Boletines;