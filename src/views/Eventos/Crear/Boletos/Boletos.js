import React, { Component } from 'react';
import { Row, Col, Input, Collapse, Button, Toast, ToastBody, ToastHeader, Badge, Modal, ModalHeader, ModalBody} from 'reactstrap';

import CrearBoleto from './Crear.js';


class Boletos extends Component {

  state = {
    toggle_boletos: false,
    boletos: []
  }

  add_boleto = boleto => {
    this.state.boletos.push(boleto);
    this.setState({ boletos: this.state.boletos });
    this.creador_boletos.set_visible(false);
  }

  quitar_boleto = e => {
    e.preventDefault();
    const new_boletos = this.state.boletos.filter(b => b.nombre != e.target.id);
    this.setState({ boletos: new_boletos });
  }

  validar = () => {
    if (this.state.boletos.length === 0) return false;
    return true;
  }

  get_boletos = () => {
    if (this.validar()) return this.state.boletos;
    alert("Debe agregar almenos un boleto")
    return undefined;
  }

  reiniciar = () => {
    this.setState({
      toggle_boletos: false,
      boletos: []
    })
  }

  render() {
    return (
      <Col md="9" xs="12" className="mx-auto">
        <p className="h3 mb-4"><b><i className="fa fa-ticket"></i> Boletos</b>
          <i
            className={`fa fa-${this.state.toggle_boletos === false ? "chevron-down" : "chevron-up"} float-right p-1`}
            style={{ cursor: "pointer" }}
            onClick={e => this.setState({ toggle_boletos: !this.state.toggle_boletos })}
          ></i>
        </p>

        <Collapse isOpen={this.state.toggle_boletos}>

          {this.state.boletos.length !== 0 ?
            <>
              <span className="h4">Listado de Boletos</span>
              <Row>
                {this.state.boletos.map((boleto, i) => {
                  return (

                    <Col key={i} className="text-center text-dark mx-auto p-0 bg-warning" md="6" xs="12">
                      <Toast className="mx-auto">
                        <ToastHeader>
                          Tipo de Boleto: {boleto.tipo_boleto.toUpperCase()}
                          <Badge id={boleto.nombre} onClick={this.quitar_boleto} style={{cursor:"pointer"}} className="ml-1" color="danger"> Quitar</Badge>   
                        </ToastHeader>
                        <ToastBody>
                          <b>Nombre:</b> {boleto.nombre}<br />
                          <b>Descripcion:</b> {boleto.descripcion}<br />
                          <b>Cantidad de Boletos:</b> {boleto.cantidad}<br />
                          <b>Precio:</b> {boleto.tipo_boleto === 'pago' ?  `$ ${boleto.precio} MX` : boleto.tipo_boleto === 'gratis' ? 'Gratis' : 'Donación'}<br />
                        </ToastBody>
                      </Toast>
                    </Col>
                  );

                })}
              </Row>
            </>
            :
            <></>
          }

          <hr />


          <CrearBoleto
            ref={element => { this.creador_boletos = element }}
            add_boleto={this.add_boleto}
          />
        </Collapse>
      </Col>
    );
  }
}

export default Boletos;
