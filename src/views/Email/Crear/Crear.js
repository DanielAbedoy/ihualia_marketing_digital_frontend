import React, { Component, useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Button, Collapse } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';
import NavBar from '../components/NavBar';

import DatosIniciales from './Hooks/DatosPrincipales';
import Plantillas from './Hooks/Plantillas';
import Boletin from './Hooks/Boletin';
import Grupos from './Hooks/Grupos';

import Model_Email from '../../../models/EmailMarketing';
import Model_Contactos from '../../../models/Contactos';
import Variables from '../../../variables/global';
import URLs from '../../../models/urls';
import Enviar from './Hooks/Enviar';



class Boletines extends Component {

  state = {
    plantilla: '',
    grupos: '',

    openDI: true,
    openBoletin: true,

    datosBoletin: '',
    fecha: '',
  }


  componentDidMount = () => {
    if (this.props.location.state) {

      const b = this.props.location.state.boletin;
      if (b.contenido !== "null") {
        this.setState({ plantilla: { contenido: b.contenido } }, () => {
          this.setDatosIniciales(b)
        })
      }
      else this.setDatosIniciales(b)
    }
  }

  setPlantilla = plantilla => this.setState({ plantilla: plantilla });
  setGrupos = grupos => this.setState({ grupos: grupos });



  setFecha = fecha => this.setState({ fecha: fecha });

  setDatosIniciales = (datos) => {
    this.setState({ datosBoletin: datos, openDI: false }, () => {
      if (this.state.datosBoletin.contenido !== "null") this.setState({ openBoletin: false });
    })
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
                      setDatos={this.state.datosBoletin}
                      event_setDatos={this.setDatosIniciales}
                      getInfo={this.state.datosBoletin}
                      setFecha={this.setFecha}

                    />
                  </Collapse>
                </Row>

                <br />
                {/* Paso 2 Seleccionar plantilla */}
                {this.state.datosBoletin !== "" ?
                  <Row>
                    <Col  md="9" xs="12" className="mx-auto">
                      <p className="h5"><b> <span className="h2">②</span> Selecciona una plantilla </b>
                      </p>
                      <hr />
                    </Col>


                    <Plantillas
                      plantilla={this.state.plantilla}
                      event_setPlantilla={this.setPlantilla}
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
                            {this.state.datosBoletin.contenido !== 'null' ?
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
                          event_setPlantilla={this.setPlantilla}
                          event_setBoletin={this.setBoletin}

                          getInfo={this.state.datosBoletin}
                          event_setDatos={this.setDatosIniciales}
                        />
                      </Collapse>
                    </Row>

                    <br />

                    {/* Paso 4 Seleccionar el grupo de contactos a enviar */}
                    {this.state.datosBoletin.contenido !== "null" ?
                      <Row>
                        <Col  md="9" xs="12" className="mx-auto">
                          <p className="h5"><b> <span className="h2">④</span> Selecciona el grupo de contactos al que se le enviara el boletin</b> </p>
                          <hr />
                        </Col>

                        <Grupos
                          plantilla={this.state.plantilla}
                          event_setGrupos={this.setGrupos}
                        />
                      </Row>
                      : <>  </>
                    }
                  </>
                  :
                  <></>
                }
                {/* Paso 5 Envia el evento */}

                {this.state.grupos.length > 0 ?
                  <Enviar
                    datosBoletin={this.state.datosBoletin}
                    grupos={this.state.grupos}
                    _fecha={this.state.fecha}
                  />
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