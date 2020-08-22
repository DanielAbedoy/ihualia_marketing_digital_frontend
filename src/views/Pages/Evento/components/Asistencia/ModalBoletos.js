import React, { Component } from 'react';

import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Row, Col, Input } from 'reactstrap';

import ModalComfirm from './ModalConfirmarAsistencia';

class ModalBoletos extends Component {

  state = {
    modal: false,
    carrito: [],
    total_carrito: 0,
  }

  format_corrency = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });

  toggle = () => this.setState({ modal: !this.state.modal, carrito: [], total_carrito: 0 });

  _onChangedBoleto = (e, boleto) => {
    e.preventDefault();

    //Eliminar si existe el elemento
    let out = this.state.carrito.filter(b => b.id == boleto.id);
    let car = this.state.carrito.filter(b => b.id != boleto.id);

    if (e.target.value === '0') {

      let total = this.state.total_carrito - out[0].monto;

      this.setState({ carrito: car, total_carrito: total });
      return;
    }
    let title = `${e.target.value} x - ${boleto.nombre}`;
    let monto = 0;
    if (boleto.tipo === 'pago') monto = parseFloat(boleto.precio) * parseInt(e.target.value, 10);
    else monto = 0.00;
    //Agregar el nuevo monto
    car.push(
      { id: boleto.id, title: title, monto: monto, tipo: boleto.tipo, cantidad: e.target.value }
    )
    let total = 0;
    car.forEach(a => {
      total += a.monto;
    });
    this.setState({ carrito: car, total_carrito: total })

  }

  _onGenerar = e => this.modalComfirm.toggle();

  render() {
    return (
      <Modal modalClassName="bg-dark text-dark" size="lg" isOpen={this.state.modal} toggle={this.toggle} className="">
        {/* <ModalHeader toggle={this.toggle}>Registro de Asistencia</ModalHeader> */}
        <ModalBody>
          <Row>
            {/* Titulo del evento y fechas */}

            <Col md="12" className="text-center border-bottom mb-2">
              <p className="h3 m-0">{this.props.titulo}</p>
              <span className="h6 p-0">{this.props.subtitulo}</span>
            </Col>

            <Col md="12" className="mb-5">
              <p className="h4 m-0">Agrega tus entradas.</p>
              <p className="desciption m-0 p-0">Puedes elegir para tus invitados</p>

            </Col>


            {/* Boletos existentes con boton de confirmacion */}
            <Col xl="12" lg="9" md="12" xs="12" className="mx-auto">
              <Row>
                {this.props.boletos.map((boleto, i) => {
                  return (
                    <Col key={i} xl="8" lg="12" sm="12" className="border-bottom mb-3 pb-2 mx-auto">

                      <Row>
                        <Col md="10" xs="12">
                          <span className="h4 pb-1">{boleto.nombre}</span><br />
                          <span className=" "><b>Precio:</b>
                            {
                              boleto.tipo === 'gratis' ? "  Gratis"
                                :
                                boleto.tipo === "donacion" ? "  Donación"
                                  :
                                  `  ${this.format_corrency.format(boleto.precio)} MXN`
                            }
                          </span><br />
                          <span className=" "><b>Carcteristicas:</b> {boleto.descripcion}</span><br />
                          <span className=""><b>Puedes adquirirlo:</b> {boleto.canal_ventas}</span><br />
                        </Col>
                        {boleto.canal_ventas.toLowerCase() !== 'solo en la puerta' ?

                          boleto.cantidad_a_mostrar === 0 ?
                            <Col md="2" xs="6" className="mx-auto mb-3">
                              <span className="text-danger"><b>Agotado</b></span>
                            </Col>
                            :
                            <Col md="2" xs="6" className="mx-auto mb-3">
                              <Input type="select" className="mt-3"
                                onChange={e => this._onChangedBoleto(e, boleto)}
                              >
                                <option>0</option>
                                {this.optionsCantidadBoletos(boleto.cantidad_minima, boleto.cantidad_a_mostrar)}
                              </Input>
                            </Col>
                          :
                          <></>
                        }

                      </Row>
                    </Col>
                  );
                })}
              </Row>
            </Col>

            {/* Side cuando se selccione el evento y para aceptar*/}
            <Col xl="5" lg="8" md="12" xs="12" className=" bg-light rounded pl-4 pr-4 pt-0 mx-auto">

              {this.state.carrito.length !== 0 ?
                <Row>

                  <Col md="12" className=" mt-3 mb-2">
                    <p className="h4 m-0">Orden</p>
                  </Col>

                  {this.state.carrito.map((articulo, i) => {
                    return (
                      <Col key={i} md="12" className="mt-1 mb-1">
                        <Row>
                          <Col md="6">
                            <p className="h6">{articulo.title}</p>
                          </Col>
                          <Col md="6" className="text-right">
                            <p className="h6">{this.format_corrency.format(articulo.monto)} </p>
                          </Col>
                        </Row>
                      </Col>
                    );
                  })}
                  <Col md="12" className="mt-1 mb-1 border border-black"></Col>
                  <Col md="12" className="mt-1 mb-1">
                    <Row>
                      <Col md="6">
                        <p className="h5"><b>Total</b></p>
                      </Col>
                      <Col md="6" className="text-right">
                        <p className="h5"><b> {this.format_corrency.format(this.state.total_carrito)} MXN</b></p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                :
                <></>
              }
            </Col>
          </Row>

          <ModalComfirm
            ref={element => { this.modalComfirm = element }}
            id_evento={this.props.id_evento}
            total={this.state.total_carrito}
            articulos={this.state.carrito}
            organizador={this.props.organizador}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="success" disabled={this.state.carrito.length === 0 ? true : false} onClick={this._onGenerar}>Generar</Button>
          <Button color="danger" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }

  optionsCantidadBoletos = (min, max) => {
    let nums = [];
    for (let i = min; i <= max; i++) {
      nums.push(<option key={i}>{i}</option>);
    }

    return nums;
  }

}

export default ModalBoletos;