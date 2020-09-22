import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

import ModelEvento from '../../../models/Eventos';

import NavBar from '../components/NavBar.js';

class Listado extends Component {

  state = {
    option: <span  className="text-center"><i className="fa fa-circle-o-notch fa-spin fa-1x fa-fw"></i></span>,
    open_share: false,
    eventos_todos: [],
    eventos_publicados: [],
    eventos_pasados: [],
    eventos_borradores: [],
    eventos: []
  }


  componentWillMount = () => {
    if ((require('store').get('cuenta_en_uso') === undefined)) {
      alert("Debes tener una cuenta en uso");
      this.props.history.push('/eventos');
      return;
  } 
    this.get_eventos();

  }

  toggle = e => this.setState({ open_share: !this.state.open_share });

  get_eventos = () => {
    const id_cuenta = require('store').get('cuenta_en_uso').id;
    new ModelEvento().get_eventos_cuenta(id_cuenta)
      .then(r => {
        if (r !== "error") {
          r.forEach(evento => {
            const fecha_fin = evento.fecha_hora_fin;
            let dates = fecha_fin.split("-");
            let d = dates[2].split("T");
            let fecha = { year: dates[0], month: dates[1], day: d[0] };
            this.comparar_fecha(fecha, evento);
          });
          this.show_todos();
        }
      })

  }

  show_todos = e => {
    if (e) e.preventDefault();
    this.setState({ option: "Todos los eventos", eventos: this.state.eventos_todos.slice() })
  }

  show_borradores = (e) => {
    e.preventDefault();
    this.setState({ option: "Borradores", eventos: this.state.eventos_borradores.slice() })
  }

  show_publicados = (e) => {
    e.preventDefault();
    this.setState({ option: "Eventos publicados", eventos: this.state.eventos_publicados.slice() })
  }

  show_pasados = (e) => {
    e.preventDefault();
    this.setState({ option: "Eventos pasados", eventos: this.state.eventos_pasados.slice() })
  }

  gestionar_evento = (e, evento) => {
    e.preventDefault();
    this.props.history.push({ pathname: '/eventos/gestionar', state: { evento: evento } });
  }


  comparar_fecha = (fecha, evento) => {

    let fecha_hoy = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    let fecha_comparacion = new Date(fecha.year, fecha.month, fecha.day);


    if (fecha_hoy.getTime() > fecha_comparacion.getTime()) {
      if (evento.estatus !== "borrador") evento.fecha_estatus = "pasado";
      if (evento.estatus === 'borrador') this.setState({ eventos_borradores: [...this.state.eventos_borradores.slice(), evento] });
      else this.setState({ eventos_pasados: [...this.state.eventos_pasados.slice(), evento] })
    } else {
      evento.fecha_estatus = "normal";
      if (evento.estatus === 'completo') this.setState({ eventos_publicados: [...this.state.eventos_publicados.slice(), evento] });
      if (evento.estatus === 'borrador') this.setState({ eventos_borradores: [...this.state.eventos_borradores.slice(), evento] });
    }
    let arr = this.state.eventos.slice();
    arr.push(evento);
    this.setState({ eventos: arr, eventos_todos: [...this.state.eventos_todos.slice(), evento] });

  }


  ir_a_evento = (e, id) => {
    e.preventDefault();

    this.props.history.push(`/evento/?event=${id}`);
  }

  contunuar_borrador = (e, id) => {
    e.preventDefault();
    this.props.history.push({
      pathname: '/eventos/crear',
      state: {
        id_evento: id,
        borrador: true
      }

    })
  }

  selectedOption = e => {
    const option = e.target.value;

    switch (option) {
      case 'Todos':
        this.show_todos(e);
        break;
      case 'Publicados':
        this.show_publicados(e);
        break;
      case 'Borradores':
        this.show_borradores(e);
        break;
      case 'Pasados':
        this.show_pasados(e);
        break;

      default:
        break;
    }

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
                {/* Organizador */}
                <Row className="justify-content-end">
                  <Col md="12">
                    <Row>
                    <Col xs="4" md="4" className="mr-auto pt-2">
                        <p className="h6">Selecciona...</p>
                      </Col>
                      <Col xs="7" md="4" className="ml-auto">
                        <Input type="select" onChange={this.selectedOption}>
                          <option className="bg-info"> Todos</option>
                          <option className="bg-success"> Publicados</option>
                          <option className="bg-warning"> Borradores</option>
                          <option className="bg-danger"> Pasados</option>
                        </Input>
                      </Col>
                    </Row>
                    
                  </Col>
                </Row>
                {/* Titulo */}
                <hr />
                <Row>
                  <Col md="12"><p className="h4">{this.state.option}</p></Col>
                </Row>
                <hr />

                {/* Listado */}
                <Row>

                  {this.state.eventos.map((evento, indx) => {

                    return (
                      <Col md="8" xs="12" className="mx-auto" key={indx}>
                        <Card>
                          <CardHeader className="p-2">
                            <p className="h4 m-0">
                              {/* Color del card */}

                              <i
                                className={evento.fecha_estatus === "pasado" ? "bg-danger px-2 rounded mb-0 mr-2" : evento.estatus === "completo" ? " mb-0  bg-success px-2 rounded mr-2" : " mb-0  bg-warning px-2 rounded mr-2"}>
                              </i> {" " + evento.nombre}


                              {/* Botones Opciones */}
                              {evento.fecha_estatus === "pasado" ?
                                <>
                                  <span style={{ cursor: "pointer" }}><i onClick={this.gestionar_evento} className="mb-0  mr-2 float-right fa fa-trash h3 p-1 btn btn-outline-danger"></i></span>
                                  <span style={{ cursor: "pointer" }}><i onClick={e => { this.gestionar_evento(e, evento) }} className="mb-0  mr-2 float-right fa fa-cog h3 p-1 btn btn-outline-primary"></i></span>
                                </> :

                                evento.estatus === "completo" ?
                                  <>
                                    <span style={{ cursor: "pointer" }}><i onClick={e => this.ir_a_evento(e, evento.id)} className="mb-0  mr-2 float-right fa fa-arrow-up h3 p-1 btn btn-outline-success"></i></span>
                                    <span style={{ cursor: "pointer" }}><i onClick={e => { this.gestionar_evento(e, evento) }} className="mb-0  mr-2 float-right fa fa-cog h3 p-1 btn btn-outline-primary"></i></span>
                                  </> :
                                  <span style={{ cursor: "pointer" }}><i onClick={e => this.contunuar_borrador(e, evento.id)} className="mb-0  mr-2 float-right fa fa-align-center h3 p-1 btn btn-outline-info"></i></span>
                              }
                            </p>
                          </CardHeader>
                          <CardBody>
                            <p className="m-1 text-center h5">{evento.resumen}</p>
                            <p className="m-1 text-center category">{evento.fecha_hora_inicio} - {evento.fecha_hora_fin}</p>
                            <p className="m-1 text-center h6">{evento.tipo}</p>
                            <br />
                            {evento.fecha_estatus === "pasado" ?

                              <></>
                              :
                              evento.estatus === 'completo' ?
                                <Row>
                                  <Col md="9" xs="12" className="mx-auto">
                                    <InputGroup className="">
                                      <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                          <i className="fa fa-share"></i>
                                        </InputGroupText>
                                      </InputGroupAddon>
                                      <Input type="text" readOnly={true}
                                        value="https://app.ihualia.com.mx/evento"
                                      />
                                    </InputGroup>
                                  </Col>
                                </Row>
                                : <></>
                            }

                          </CardBody>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>


      </div>
    );
  }
}

export default Listado;