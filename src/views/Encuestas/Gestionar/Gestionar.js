import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Badge, Input } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert';
import '../../../assets/css/alert-confirm.css';

import ChartComponent from '../../../components/ChartComp';
import Contenido from './Hooks/Contenido';
import Respuestas from './Hooks/Respuestas';

import ModelEncuesta from '../../../models/Encuestas';
import Load from '../../../components/Load';
import Encuestados from './Hooks/Encuestados';

class Gestionar extends Component {

  state = {
    openContenido: false,
    openRespuestas: false,
    openEncuestados:false,
    encuesta: "",

    labelsFecha: [],
    labelsSetData: [],
    total_respondidas: 0,
    ultimos_cinco: []
  }

  componentDidMount = () => {
    if (!this.props.location.state) {
      this.props.history.push('/encuestas/listado');
      return;
    } 

    new ModelEncuesta().get_encuesta(this.props.location.state.encuesta)
      .then(e => this.setState({ encuesta: e }, () => this.sortEncuestasRealizadas()))
      .catch (err => this.props.history.push('/encuestas/listado'))
  }
  
  activar_desactivar = tipo => {
    
    confirmAlert({
      message:`Seguro que deseas ${tipo === 'a' ? "activar" : "desactivar"} la encuesta ?`,
      buttons:[
        {label:"Si",onClick:()=>{
          new ModelEncuesta().modificar_encuesta(this.state.encuesta.id, { estatus: tipo === "a" ? "publicado" : "inactiva" })
            .then(r => { if (r.statusText === "OK") this.props.history.push("/encuestas/listado") });
        }},
        {label:"Cancelar",onClick:()=>{}}
      ]
    })

  } 

  sortEncuestasRealizadas = () => {

    if (!this.state.encuesta.encuestados[0]) return;


    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    let encuestados = this.state.encuesta.encuestados;
    let fIni = this.state.encuesta.encuestados[0].creado.split("-");
    let fechas = [];
    let encuestadosLbs = [];
    let now = new Date();
    let t = 0;
    for (let i = new Date(fIni[0] * 1, (fIni[1] * 1) - 1, fIni[2] * 1); i <= now; i.setDate(i.getDate() + 1)) {
      fechas.push(`${i.getDate()} ${months[i.getMonth()]} ${i.getFullYear()}`)
      const f = `${i.getFullYear()}-${i.getMonth() + 1}-${i.getDate()}`;
      const aux = encuestados.filter(e => e.creado == f);
      encuestadosLbs.push(`${aux.length}`);
      t += aux.length;
    }

    this.setState({ labelsFecha: fechas, labelsSetData: encuestadosLbs, total_respondidas: t });

    let c = 0;
    let five = [];
    for (let i = encuestados.length - 1; i >= 0; i--) {
      if (c === 5) break;
      five.push({ n: encuestados[i].id, nombre: encuestados[i].nombre, correo: encuestados[i].correo, creado: encuestados[i].creado });
      c++;
    }
    this.setState({ ultimos_cinco: five });
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
                    <p className="h3 m-0"><b>Gestiona tu encuesta</b></p>
                    <p className="text-muted">Observa las respuesas y contenido de tu encuesta</p>
                  </Col>
                </Row>
                <hr />
                {this.state.encuesta !== "" ?
                  <>
                    <Row>
                      <Col xs="12" md="7" className="mx-auto">
                        
                        {this.state.encuesta.estatus === "publicado"?
                          <>
                            <p className="text-center"> <b>Encuesta:</b> <Badge color="success" >ACTIVA</Badge>  <Badge onClick={()=>this.activar_desactivar("d")} className="ml-2 cursor-p" color="danger" >DESACTIVAR</Badge>  </p>
                          </>
                          :
                          <>
                            <p className="text-center"> <b>Encuesta:</b> <Badge color="danger" >DESACTIVADA</Badge>  <Badge onClick={()=>this.activar_desactivar("a")} className="ml-2 cursor-p" color="success" >Activar</Badge>  </p>
                          </>
                        }

                        <p className=" m-0"><b> Nombre: </b> {this.state.encuesta.nombre} </p>
                        <p className=" m-0"><b> Presentacion: </b> {this.state.encuesta.presentacion} </p>
                        <p className="m-0"><b> Anomina: </b> {this.state.encuesta.anonima === true ? "Si" : "No"} </p>
                        <p className="mb-4"><b> Ponderacion: </b> {this.state.encuesta.ponderacion === true ? "Si" : "No"} </p>

                        <p className="text-center "><b> Enlace para compartir: </b></p>
                        <Input type="text" readOnly={true} value={`https://app..ihualia.com/#/encueta/${this.state.encuesta.url}`} />
                        <br />
                        <p className="text-right mb-2"><u style={{ cursor: "pointer" }} onClick={() => this.props.history.push(`/encuesta/${this.state.encuesta.url}`)} >Ir a la encuesta</u></p>
                      </Col>
                    </Row>
                    <hr />

                    <Row >

                      <Col xl="10" xs="12" className="mx-auto px-5 ">
                        <Row className="my-3">
                          <Col md="8" xs="12" className="d-flex flex-column justify-content-center" >
                            <Row className="mb-2">
                              <p className="h5"><b><i className="fa fa-list"></i> Encuestas realizadas</b></p>
                            </Row>
                            {/* Tabla con los ultimos 5 encuestados */}
                            <table className="table table-hover">
                              <thead>
                                <tr>
                                  {this.state.encuesta.anonima === true ? <th scope="col">Encuestado #</th> :
                                    <>
                                      <th scope="col">Nombre</th>
                                      <th scope="col">Correo</th>
                                    </>
                                  }
                                  <th scope="col">Fecha</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.ultimos_cinco.map((e, i) => {
                                  return (
                                    <tr key={i}>
                                      {this.state.encuesta.anonima === true ? <td className="m-0 p-1">{e.n}</td> :
                                        <>
                                          <td className="m-0 p-1">{e.nombre}</td>
                                          <td className="m-0 p-1">{e.correo}</td>
                                        </>
                                      }
                                      <td className="m-0 p-1">{e.creado}</td>
                                    </tr>
                                  );
                                })}

                              </tbody>
                            </table>

                          </Col>

                          <Col  onClick={() => this.setState({ openEncuestados: !this.state.openEncuestados })}  md="4" xs="12" className="px-4 my-2 py-4 cursor-p d-flex flex-column align-items-center justify-content-center" >
                            <p className="h1 text-center"><i className="fa fa-male"></i></p>
                            <p className="h5 text-center m-0">Encuestados</p>
                            <p className="text-center m-0">Ver completo</p>
                          </Col>
                          <Encuestados
                            preguntas={JSON.parse(this.state.encuesta.preguntas_json)} encuesta={this.state.encuesta.id}
                            encuestados={this.state.encuesta.encuestados} anonima={this.state.encuesta.anonima} ponderacion={this.state.encuesta.ponderacion}
                            open={this.state.openEncuestados} setOpen={(p) => this.setState({ openEncuestados: p })}
                          />
                        </Row>
                      </Col>
                      <Col xl="10" xs="12" className="mx-auto">
                        <Row>
                          <Col md="5" xs="11" className="mx-auto px-md-5 px-xs-2 px-xl-2 d-flex flex-column align-items-center justify-content-center" >
                            <Row className="m-0 p-0">
                              <Col onClick={() => this.setState({ openContenido: !this.state.openContenido })} md="12" className="px-4 my-2 py-4 rounded shadow-lg d-flex flex-column text-white align-items-center justify-content-center" style={{ cursor: "pointer", backgroundColor: "rgb(255,170,51)" }}>
                                <p className="h1 text-center"><i className="fa fa-align-center"></i></p>
                                <p className="h5 text-center">Contenido</p>
                              </Col>
                              <Contenido
                                datos={{ nombre: this.state.encuesta.nombre, presentacion: this.state.encuesta.presentacion, instrucciones: this.state.encuesta.instrucciones, despedida: this.state.encuesta.despedida, imagen: this.state.encuesta.imagen, id: this.state.encuesta.id, ponderacion:this.state.encuesta.ponderacion }}
                                preguntas={JSON.parse(this.state.encuesta.preguntas_json)} open={this.state.openContenido} setOpen={(o) => this.setState({ openContenido: o })}
                              />
                              <Col onClick={() => this.setState({ openRespuestas: !this.state.openRespuestas })} md="12" className="px-4 my-2 py-4 rounded shadow-lg d-flex flex-column text-white align-items-center justify-content-center" style={{ cursor: "pointer", backgroundColor: "rgb(255,170,51)" }}>
                                <p className="h1 text-center"><i className="fa fa-check-square-o"></i></p>
                                <p className="h5 text-center">Respuestas</p>
                              </Col>
                              <Respuestas
                                datos={{ id: this.state.encuesta.id, ponderacion: this.state.encuesta.ponderacion, anonima: this.state.encuesta.anonima }}
                                preguntas={JSON.parse(this.state.encuesta.preguntas_json)} encuestados={this.state.encuesta.encuestados} open={this.state.openRespuestas} setOpen={(o) => this.setState({ openRespuestas: o })}
                              />
                            </Row>
                          </Col>

                          <Col md="7" xs="12" className="mt-3" >
                            <Row>
                              <Col md="12">
                                <ChartComponent
                                  labels={this.state.labelsFecha}
                                  dataSet={this.state.labelsSetData}
                                  label="Encuestas respondidas"
                                  BackColor="rgb(255,170,51)"
                                  BorderColor="#f5e34a"
                                />
                              </Col>
                              <Col md="12">
                                <p className="text-center h5" ><b>Un total de {this.state.total_respondidas} encuestas realizadas</b></p>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </>
                  :
                  <Load />
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Gestionar;
