import React, { Component } from 'react';
import { Row, Col, Input, Button, Alert } from 'reactstrap';

class Crear extends Component {

  state = {

    from_visible: false,

    tipo_boleto: '',
    nombre: '',
    cantidad: '',
    precio: '',
    descripcion: '',
    cantidad_minima: '',
    cantidad_maxima: '',
    canal_de_ventas: ''
  }

  set_visible = (value) => this.setState({ from_visible: value });

  add_boleto = e => {
    e.preventDefault();
    if (this.validar()) this.props.add_boleto(this.state);
  }

  validar = () => {
    
    if (this.state.tipo_boleto === 'gratis') this.state.precio = "Gratis";
    else if (this.state.tipo_boleto === 'donacion') this.state.precio = 'Donacion';


    if (this.state.nombre === '' || this.state.cantidad === '' || this.state.precio === '' || this.state.descripcion === ''
      || this.state.cantidad_minima === '' || this.state.cantidad_maxima === '' || this.state.canal_de_ventas === ''
      || this.state.canal_de_ventas === 'Selecciona:' 
    ) {
      alert("Debes agregar los campos obligatorios(*) para agregar el boleto"); 
      return false;
    }
    
    return true;
  }

  render() {
    return (
      <>
        <Row>
          <Col md="12" xs="12" className="mx-auto">
            <span className="h4">Crear Boleto</span>
            <Row>
              <Col className="mx-auto p-2">
                <Button onClick={e => this.setState({ from_visible:true ,tipo_boleto: 'pago',nombre:'Admición General' })} block color="primary" className="h6 border"> Pago</Button>
              </Col>
              <Col className="mx-auto p-2">
                <Button onClick={e => this.setState({ from_visible:true ,tipo_boleto: 'gratis',nombre:'Admición Genral' })} block color="primary" className="h6"> Gratis</Button>
              </Col>
              <Col className="mx-auto p-2">
                <Button onClick={e => this.setState({ from_visible:true ,tipo_boleto: 'donacion',nombre:'Donación' })} block color="primary" className="h6"> Donación</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />
        {this.state.from_visible === true ?
          <Row>
            <Col md="9" xs="12" className="mx-auto">

              <span className="h4">{this.state.tipo_boleto === 'pago' ? "Boleto de Pago" : this.state.tipo_boleto === "gratis" ? "Boleto Gratis" : "Boleto de Donación"}</span><br /><br />

              <span className="h5">Nombre</span><br />
              <Input className="mt-2" type="text"
                id="txt_nombre"
                placeholder={this.state.tipo_boleto === 'pago' ? "Ej. Admición General" : this.state.tipo_boleto === "gratis" ? "Ej. Admición General" : "Ej. Donación"}
                onChange={e => this.setState({ nombre: e.target.value })}
              /><br />

              <span className="h5">Cantidad de boletos en venta al público</span><br />
              <Input className="mt-2" type="number"
                id="txt_cantidad" min="1" max="10000000"
                onChange={e => this.setState({ cantidad: e.target.value })}
              /><br />

              <span className="h5">Precio</span><br />
              <Input className="mt-2" type="number"
                id="txt_precio" 
                placeholder={this.state.tipo_boleto === 'pago' ? "$ 0,00" : this.state.tipo_boleto === "gratis" ? "Gratis" : "Los aistentes puden donar lo que deseen"}
                disabled={this.state.tipo_boleto === 'pago' ? false : true}
                onChange={e => this.setState({ precio: e.target.value })}
              /><br />

              <span className="h5">Descripción</span><br />
              <Input style={{ height: "100px" }} className="mt-2" type="textarea"
                id="txtA_descripcion"
                placeholder="Describe más detalles de lo que ofrece éste boleto a los asistentes"
                onChange={e => this.setState({ descripcion: e.target.value })}
              /><br />

              <span className="h5">Cantidad mínima de boletos por pedido</span><br />
              <Input className="mt-2" type="number"
                id="txt_cantidad_minima" min="1" max={this.state.cantidad}
                onChange={e => this.setState({ cantidad_minima: e.target.value })}
              /><br />

              <span className="h5">Cantidad máxima de boletos por pedido</span><br />
              <Input className="mt-2" type="number"
                id="txt_cantidad_maxima" min="1" max={this.state.cantidad}
                onChange={e => this.setState({ cantidad_maxima: e.target.value })}
              /><br />

              <span className="h5">Canal de ventas</span><br />
              <Input className="mt-2" type="select"
                id="txt_canal"
                onChange={e => this.setState({ canal_de_ventas: e.target.value })}
              >
                <option>Selecciona:</option>
                <option>En linea y en la puerta</option>
                <option>Solo en linea</option>
                <option>Solo en la puerta</option>
              </Input><br />

            </Col>
            <Col md="12">
              <Row>
                <Col md="6" xs="12" className="mx-auto p-0">
                  <Button color="primary" block onClick={this.add_boleto}> Agregar Boleto </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          :
          <></>
        }

      </>
    );
  }
}

export default Crear;