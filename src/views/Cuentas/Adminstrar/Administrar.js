import React, { Component } from 'react';
import { Row, Col, CardHeader, CardBody, Card, Button, Badge } from 'reactstrap';

import Trabajadores from './Hooks/Trabajadores/Trabajadores';
import ModeloMarketing from '../../../models/Marketing';



class Administrar extends Component {

  state = {
    cuenta: '',
  }

  componentDidMount = () => {
    if (!this.props.location.state) {
      this.props.history.push("/cuentas");
      return;
    }
    this.setState({ cuenta: this.props.location.state.cuenta })
  }

  restart_cuenta = () => {
    new ModeloMarketing().get_cuenta(this.state.cuenta.id)
      .then(c => this.setState({ cuenta: c }))
  }

  activar_desactivar = () => {
    const c = this.state.cuenta;
    new ModeloMarketing().actualizar_cuenta(c.id, { estatus: c.estatus.toLowerCase() === "activo" ? "inactivo" : "activo" })
      .then(r => {
        if (r.statusText === "OK") this.restart_cuenta();
      })
  }


  render() {
    const c = this.state.cuenta;
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader style={{ backgroundColor: "#333333" }}>
            <p className="h3 p-2 text-white"><i className="fa fa-briefcase"></i> Cuentas |</p>
          </CardHeader>
          <CardBody>

            {this.state.cuenta !== "" &&
              <>
                <Row>
                  <Col md="12">
                    <p className="h4 mb-0">Administrador de cuentas</p>
                    <p className="text-muted">Puedes desactivar o activar la cuenta, eliminarla, y quitar o asignar nuevos usuarios</p>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col md="6" xs="12" className="text-center mx-auto">
                    <Badge className="m-0 cursor-p"
                      onClick={this.activar_desactivar} color={c.estatus.toLowerCase() === "activo" ? "info" : "success"}>
                      {c.estatus.toLowerCase() === "activo" ? "Desactivar" : "Acitivar"}
                    </Badge> <Badge className="ml-1 cursor-p" color="danger"> Eliminar</Badge>
                    <p className="h4">Datos</p>
                    <p className="m-0"><b>Cleve: {c.id}</b></p>
                    <p className="m-0"><b>Nombre: {c.nombre}</b></p>
                    <p className="m-0"><b>Estatuu: {c.estatus}</b></p>
                    <hr />
                  </Col>
                </Row>
                <Row>
                  <Col md="10" xs="12" className="mx-auto">
                    <Row>
                      <Col className="mx-auto" lg="12" md="12" sm="12" xs="12">
                        <Row className="m-0 p-0">
                          <Trabajadores usuarios={c.usuarios} cuenta={c.id} restart={() => this.restart_cuenta()} />
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </>
            }

          </CardBody>
        </Card>
      </div>
    );
  }


}

export default Administrar;