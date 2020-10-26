import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';

class ModalRelacionAsBo extends Component {

  state = {
    toggle: false,
    datos: []
  }

  toggle_event = () => this.setState({ toggle: !this.state.toggle });

  set_datos = (datos) => this.setState({ datos: datos });

  format_corrency = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });

  render() {
    return (
      <>
        <Modal isOpen={this.state.toggle} size="xl" toggle={this.toggle_event}>
          <ModalHeader>
            <p className="text-center h3">Relacion completa de asistentes/boletos</p>
          </ModalHeader>
          <ModalBody>

            <div style={{ maxHeight: "60vh" }} className="table-responsive">
              <table className="table table-hover text-center">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Asistente</th>
                    <th scope="col">Boletos</th>
                    <th scope="col">Estatus</th>
                    <th scope="col">Venta</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.datos.map((asistente, i) => {
                    return (
                      <tr key={i}>
                        <th >{asistente.datos.correo}<br />{asistente.datos.telefono}</th>
                        <td>{asistente.boletos.map((boleto, j) => {
                          return (
                            <div key={j}>
                              x {boleto.cantidad} - {boleto.datos.nombre}
                              <br />
                            </div>
                          );
                        })}</td>
                        <td
                          className={asistente.datos.estatus_pago === 'pagado' ? "bg-success" : "bg-danger"}
                        >{asistente.datos.estatus_pago.toUpperCase()}</td>
                        <td>{`  ${this.format_corrency.format(asistente.venta)} MXN`}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <th ></th>
                    <td></td>
                    <th>Total Pagado:</th>
                    <td>{`  ${this.format_corrency.format(this.props.total)} MXN`}</td>
                  </tr>
                </tbody>
              </table>

            </div>

          </ModalBody>
          <ModalFooter>
            <Button className="px-5" color="primary" onClick={this.toggle_event} >Salir</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default ModalRelacionAsBo;