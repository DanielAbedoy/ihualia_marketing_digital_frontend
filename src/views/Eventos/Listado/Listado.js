import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

import ModelEvento from '../../../models/Eventos';

import NavBar from '../components/NavBar.js';
import Tabla from './Hooks/Table';

class Listado extends Component {

  state = {
    option: <span className="text-center"><i className="fa fa-circle-o-notch fa-spin fa-1x fa-fw"></i></span>,
    open_share: false,
    eventos_todos: [],
    eventos_publicados: [],
    eventos_pasados: [],
    eventos_borradores: [],
    eventos: []
  }


  componentWillMount = () => this.get_eventos();

  toggle = e => this.setState({ open_share: !this.state.open_share });

  get_eventos = () => {
    const id_cuenta = require('store').get('cuenta_en_uso').id;
    new ModelEvento().get_info_eventos_cuenta(id_cuenta)
      .then(eventos => {
        if (eventos === "error") return;
        const eventos_pub = eventos.filter(e => e.estatus === "publicado");
        const eventos_pasados = eventos.filter(e => e.estatus === "pasado");
        const eventos_borr = eventos.filter(e => e.estatus === "borrador");
        this.setState({ eventos_todos: eventos, eventos_publicados: eventos_pub, eventos_borradores: eventos_borr, eventos_pasados: eventos_pasados,option:"" },()=>this.show_todos());
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

  gestionar_evento = (evento) => this.props.history.push({ pathname: '/eventos/gestionar', state: { evento: evento } });


  ir_a_evento = (id) => this.props.history.push(`/evento/?event=${id}`);

  contunuar_borrador = (id) => {
    this.props.history.push({
      pathname: '/eventos/crear',
      state: { evento: id }
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

  eliminarBorrador = (id) => {
    console.log("Eliminando")
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
                      <Col md="8" xs="12">
                        <p className="h4 mb-0">Tus eventos</p>
                        <p className="h6 text-muted">Todos los eventos creados en la cuenta</p>
                      </Col>
                      <Col xs="7" md="4" className="ml-auto">
                        <Input type="select" onChange={this.selectedOption}>
                          <option > Todos</option>
                          <option > Publicados</option>
                          <option>Borradores</option>
                          <option> Pasados</option>
                        </Input>
                      </Col>
                    </Row>

                  </Col>
                </Row>
                {/* Titulo */}
                <hr />
                <Row>
                  <Col md="12"><p className="h4 text-center">{this.state.option}</p></Col>
                </Row>
                <hr />

                {/* Listado */}
                <Row>
                  <Tabla
                    eventos={this.state.eventos}
                    gestionar={this.gestionar_evento}
                    ir={this.ir_a_evento}
                    eliminar={this.eliminarBorrador}
                    continuar={this.contunuar_borrador}
                  />
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