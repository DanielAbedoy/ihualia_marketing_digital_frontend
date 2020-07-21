import React, { Component } from 'react';
import { Row, Col, Toast, ToastHeader, ToastBody, Button, Card, CardHeader, CardBody } from 'reactstrap';

import NavBar from '../navbar.js';
import Modelo from '../../../../models/Marketing.js';

class Listado extends Component {

  constructor(props) {
    super(props);

    this.user = require('store').get('usuario_guardado');

    this.state = {
      
      vista_option: '',
      cuentas: [],  // JSON = id, nombre, tipo, estatus, id_cliente
    }
  }

  //Conseguir las cuentas del usuario
  componentDidMount = () => {

    if (this.user.tipo.toLowerCase() === "admistrador") {//CAMBIAR AQUI
      //MOSTRAR TODAS LAS CUENTAS DEL CLIENTE(EMPRESA)
      new Modelo().get_cuentas_cliente(this.user.id_cliente)
        .then((r) => {
          this.setState({cuentas: r.data.results})
        })


    } else if (this.user.tipo.toLowerCase() === "colaborador") {
       //MOSTRAR LAS CUENTAS DONDE COLABORA ESTE USUARIO
       new Modelo().get_cuentas_usuario(this.user.correo)
      .then((r) => {
        let cuentas = [];
        r.data.map((c) => {
          new Modelo().get_cuenta(c.id)
            .then((r) => {
              cuentas.push(r.data);
              this.setState({ cuentas: cuentas })
            })
        })
      })
    }
  }

  //Funcion para administrar la cuenta seleccionada
  administrar_cuenta = (e) => {
    e.preventDefault();
    
    this.props.history.push({
      pathname: '/cuentas/administrar',
      state: { 
        id_cuenta: e.target.id
      }
    });

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
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <NavBar />
              </CardHeader>
              <CardBody>

                <Row>
                  <Col lg="8" md="8" sm="6" xs="12">
                    <p className="h4">Opciones</p>
                  </Col>
                  <Col lg="2" md="2" sm="3" xs="12" className="p-0">
                    <Button className="bg-transparent text-dark border border-white"
                      onClick={()=>{this.setState({vista_option:'table'})}}
                    >
                      <i className="fa fa-table"></i>  Vista de Tabla
                    </Button>
                  </Col>
                  <Col lg="2" md="2" sm="3" xs="12" className="p-0">
                    <Button className="bg-transparent text-dark border border-white"
                      onClick={()=>{this.setState({vista_option:'graphic'})}}
                    >
                      <i className="fa fa-eye"></i>  Vista Gráfica
                    </Button>
                  </Col>
                </Row>

                {this.inicial_compoenent()}

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );

  }

  inicial_compoenent = () => {
    if (this.state.vista_option === 'table') {
      return (
        <>{this.vista_tabla()}</>
      );
    } else if (this.state.vista_option === 'graphic') {
      return (
        <>{this.vista_grafica()}</>
      );
    } else {
      return (<>{this.vista_grafica()}</>);
    }
  }

  //Componente para visualizar los datos en tabla
  vista_tabla = () => {
    return (
      <>
        <hr />
        <Row>
          <Col className="mx-auto" lg="10" md="11" sm="12" xs="12">
            <div className={"table-responsive table-bordered table-hover"} >
              <table className="table text-center">
                <thead>
                  <tr className="thead-dark">
                    <th>Clave</th>
                    <th>Nombre</th>
                    <th>Estatus</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.cuentas.map((cuenta, i) => {
                    return (
                      <tr key={i}>
                        <td>{cuenta.id}</td>
                        <td>{cuenta.nombre}</td>
                        <td className={cuenta.estatus.toLowerCase() == "activo" ? "bg-success" : "bg-danger"} >{cuenta.estatus}</td>
                        <td className="m-0">
                          <i id={cuenta.id} onClick={this.usar_cuenta} className="fa fa-check-square-o border rounded bg-success p-1 mr-2" style={{ cursor: "pointer" }}></i>
                          <i id={cuenta.id} onClick={this.administrar_cuenta} className="fa fa-cog border rounded bg-primary p-1 ml-2" style={{cursor:"pointer"}}></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </>
    );
  }

  //Componente para visualizar los datos en Toast
  vista_grafica = () => {
    return (
      <>
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
                    <Col className="p-2 mx-auto" md="6" xs="12">
                      <Button id={cuenta.id} onClick={this.administrar_cuenta} block color="primary" >Administrar</Button>
                    </Col>
                  </Row>
                </Toast>
              </Col>
            );
          })}
        </Row>
      </>
    );
  }
}

export default Listado;

//{/* <Link from="/cuentas" to="/cuentas/administrar">Listado</Link> */}