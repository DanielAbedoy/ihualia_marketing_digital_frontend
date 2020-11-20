import React, { Component } from 'react';
import { Row, Col, Toast, ToastHeader, ToastBody, Button, Card, CardHeader, CardBody } from 'reactstrap';

import NavBar from '../Administrador/navbar.js';
import Modelo from '../../../models/Marketing.js';

class MisCuentas extends Component {

  //Si es admin(mostrar navbar)

  state = {
    tipo: '',
    cuentas: []
  }

  //Conseguir las cuentas del usuario
  componentDidMount = () => {

    const user = require('store').get('usuario_guardado');
    //MOSTRAR LAS CUENTAS DONDE COLABORA ESTE USUARIO
    new Modelo().get_cuentas_usuario(user.correo)
      .then(cuentas => {
        console.log(cuentas)
        if (cuentas.length > 0) this.setState({ cuentas: cuentas});
        this.setState({ tipo: user.tipo });
      })
    
  }

  //Funcion para usar la cuenta seleccionada
  usar_cuenta = (e) => {
    e.preventDefault();

    new Modelo().get_cuenta(e.target.id)
      .then((r) => {
        if (r.data.estatus.toLowerCase() !== "activo") {
          alert("No puedes usar esta cuenta porque esta inactiva")
        } else {
          require('store').set('cuenta_en_uso', r.data);
          this.props.history.push('/home'); 
         
        }
      })
  }


  render() {
    if (this.state.tipo.toLowerCase() == "administrador") { 
      return (<>{this.componen_admin()}</>);
    } else {
      return (<>{this.componen_colaborador()}</>);
    }
  }

  componen_admin = () => {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <NavBar />
              </CardHeader>
              <CardBody>
                <p className="h4 mb-0">Tus Cuentas</p>
                <p className="h6 text-muted">Solo son visibles las cuentas activas en las es estas dado de alta</p>
                <hr />
                <Row>
                  {this.state.cuentas.map((cuenta, indx) => {
                    return (
                      <Col key={indx} className="text-center text-dark mx-auto p-2 bg-info" lg="4" md="6" sm="6" xs="12">
                        <Toast className="mx-auto">
                          <ToastHeader>
                            Clave de la Cuenta: {cuenta.id}
                          </ToastHeader>
                          <ToastBody>
                            <b>Nombre:</b> {cuenta.nombre}<br />
                            <b>Estatus:</b> <span className={cuenta.estatus.toLowerCase() == "activo" ? "text-success" : "text-danger"} >{cuenta.estatus}</span><br />
                          </ToastBody>
                          <Row>
                            <Col className="p-2 mx-auto" md="6" xs="12">
                              <Button id={cuenta.id} block color="primary" onClick={this.usar_cuenta}>Usar</Button>
                            </Col>
                          </Row>
                        </Toast>
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

  componen_colaborador = () => {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <p className="h3 p-2"><i className="fa fa-users"></i> Cuentas |</p>
              </CardHeader>
              <CardBody>

                <p className="h4 mb-0"><b>Tus cuentas</b></p>
                <p className="h6 text-muted">Solo seran visibles las cuentas activas</p>
                <hr />
                <Row>
                  {this.state.cuentas.map((cuenta, indx) => {
                    return (
                      <Col key={indx} className="shadow-animate text-center text-dark mx-auto p-2 bg-info" lg="4" md="6" sm="6" xs="12">
                        <Toast className="mx-auto ">
                          <ToastHeader>
                            Clave de la Cuenta: {cuenta.id}
                          </ToastHeader>
                          <ToastBody>
                            <b>Nombre:</b> {cuenta.nombre}<br />
                            <b>Estatus:</b> <span className={cuenta.estatus.toLowerCase() == "activo" ? "text-success" : "text-danger"} >{cuenta.estatus}</span><br />
                          </ToastBody>
                          <Row>
                            <Col className="p-2 mx-auto" md="6" xs="12">
                              <Button id={cuenta.id} block color="primary" onClick={this.usar_cuenta}>Usar</Button>
                            </Col>
                          </Row>
                        </Toast>
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

export default MisCuentas;