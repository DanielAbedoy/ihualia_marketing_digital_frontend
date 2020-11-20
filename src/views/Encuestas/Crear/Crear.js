import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Collapse } from 'reactstrap';

import DatosIniciales from './Hooks/DatosIniciales';
import Configuraciones from './Hooks/Configuraciones';
import Preguntas from './Hooks/Preguntas/Preguntas';
import Despedida from './Hooks/Despedida';

import ModelEncuest from '../../../models/Encuestas';

class Crear extends Component {

  state = {
    encuesta: "",
    openDatosIni: true,
    openConfigs: true,
    openPreguntas: true
  }

  componentDidMount = () => {
    if (this.props.location.state) {
      new ModelEncuest().get_encuesta(this.props.location.state.encuesta)
        .then(encuesta => {
          this.setState({ encuesta: encuesta });
        })
    }
  }

  setEncuesta = (encuesta) => this.setState({ encuesta: encuesta });

  generarUrl = () => {
    let cadena = this.state.encuesta.nombre.toLowerCase();
    let nombre_url = cadena.split(" ").join("-");
    nombre_url += `-${this.state.encuesta.id}`
    return nombre_url
  }


  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader className="text-white p-4" style={{ backgroundColor: "rgb(255,170,51)" }}>
                <p className="h3"><i className="fa fa-envelope-o"></i> Encuentas |</p>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="12">
                    <p className="h3 m-0"><b>Crea una nueva encuesta</b></p>
                    <p className="text-muted">Solo sigue los siguientes pasos</p>
                  </Col>
                </Row>
                <hr />

                <Row>
                  <Col md="9" xs="12" className="mx-auto">
                    <p className="h5"><b> <span className="h2">①</span> Agrega los datos introductorios a la encuenta</b>
                      {this.state.encuesta !== '' ?
                        <span className="float-right mt-2 h4"><i className={"" + (this.state.openDatosIni ? "fa fa-chevron-up" : "fa fa-chevron-down")} style={{ cursor: "pointer" }}
                          onClick={() => { this.setState({ openDatosIni: !this.state.openDatosIni }) }}
                        ></i></span>
                        : <></>
                      }
                    </p>
                    <hr />
                  </Col>
                  <Col md="9" xs="12" className="mx-auto">
                    <Collapse isOpen={this.state.openDatosIni}>
                      <DatosIniciales
                        setEncuesta={this.setEncuesta}
                        close={() => this.setState({ openDatosIni: false })}
                        encuesta={this.state.encuesta}
                        datosBorrador={{nombre:this.state.encuesta.nombre, presentacion: this.state.encuesta.presentacion, instrucciones: this.state.encuesta.instrucciones}}
                      />
                    </Collapse>
                  </Col>
                </Row>


                {this.state.encuesta.id ?
                  <Row>
                    <Col md="9" xs="12" className="mx-auto">
                      <p className="h5"><b> <span className="h2">②</span> Detalles</b>
                        {this.state.encuesta.anonima !== null ?
                          <span className="float-right mt-2 h4"><i className={"" + (this.state.openConfigs ? "fa fa-chevron-up" : "fa fa-chevron-down")} style={{ cursor: "pointer" }}
                            onClick={() => { this.setState({ openConfigs: !this.state.openConfigs }) }}
                          ></i></span>
                          : <></>
                        }
                      </p>
                      <hr />
                    </Col>
                    <Col md="9" xs="12" className="mx-auto">
                      <Collapse isOpen={this.state.openConfigs}>
                        <Configuraciones
                          setEncuesta={this.setEncuesta}
                          close={() => this.setState({ openConfigs: false })}
                          encuesta={this.state.encuesta}
                          datosBorrador={{ anonima: this.state.encuesta.anonima, ponderacion: this.state.encuesta.ponderacion, paginacion: this.state.encuesta.paginacion, imagen: this.state.encuesta.imagen }}
                        />
                      </Collapse>
                    </Col>
                  </Row>
                  : <></>
                }

                {this.state.encuesta.anonima === true || this.state.encuesta.anonima === false ?
                  <Row>
                    <Col md="9" xs="12" className="mx-auto">
                      <p className="h5"><b> <span className="h2">③</span> Preguntas y Respuestas</b>
                        {this.state.encuesta.preguntas_json !== '' ?
                          <span className="float-right mt-2 h4"><i className={"" + (this.state.openPreguntas ? "fa fa-chevron-up" : "fa fa-chevron-down")} style={{ cursor: "pointer" }}
                            onClick={() => { this.setState({ openPreguntas: !this.state.openPreguntas }) }}
                          ></i></span>
                          : <></>
                        }
                      </p>
                      <hr />
                    </Col>
                    <Col md="9" xs="12" className="mx-auto">
                      <Collapse isOpen={this.state.openPreguntas}>
                        <Preguntas
                          setEncuesta={this.setEncuesta}
                          close={() => this.setState({ openPreguntas: false })}
                          encuesta={this.state.encuesta}
                          preguntasBorrador={this.state.encuesta.preguntas_json !== "" ? JSON.parse(this.state.encuesta.preguntas_json): ""}
                        />
                      </Collapse>
                    </Col>
                  </Row>
                  : <></>
                }

                {this.state.encuesta.preguntas_json && this.state.encuesta.preguntas_json !== "" ?
                  <Row>
                    <Col md="9" xs="12" className="mx-auto">
                      <p className="h5"><b> <span className="h2">④</span> Despedida</b></p>
                    </Col>
                    <Col md="9" xs="12" className="mx-auto">
                      <Despedida
                        encuesta={this.state.encuesta}
                        openPreguntas={() => { this.setState({ openPreguntas: true }) }}
                        ir={() => this.props.history.push("/encuestas/listado")}
                        url={this.generarUrl}
                      />
                    </Col>
                  </Row>
                  : <></>
                }

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

}

export default Crear;

