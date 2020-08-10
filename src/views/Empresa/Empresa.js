import React, {Component} from 'react';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';

import Modelo from '../../models/Marketing.js';

class Empresa extends Component{

  state = {
    empresa: { }
  }

  componentDidMount = () => this.peticion_datos_empresa();

  peticion_datos_empresa = () => {
    new Modelo().get_cliente(require('store').get('usuario_guardado').id_cliente)
      .then(r => this.setState({empresa:r}))
  }

  render(){
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <p className="h3 p-2"><i className="fa fa-cubes"></i> Empresa</p>
              </CardHeader>
              <CardBody>
                {this.component_datos_empresa()}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  component_datos_empresa = () => {
    if(Object.keys(this.state.empresa).length === 0) return(<></>)
    if (require('store').get('usuario_guardado').tipo.toLowerCase() === "administrador") {
      return (
        <Row>
          <Col md="8" xs="12" className="mx-auto text-center border border-black rounded bg-light">
            <span className="h4 bg-warning p-1 rounded"><b>Clave Única: </b> <span className="">{this.state.empresa.id_cliente}</span> </span><br/><br/>

            <span className="h4"><b>Razon Social: </b> <span className="">{this.state.empresa.razon_social}</span> </span>
            <Badge onClick={this.abrir_modal_nombre} style={{ cursor: "pointer" }} color="info"> <i className="fa fa-pencil"></i></Badge><br /><br />

            <span className="h4"><b>Dirección: </b> <span className="">{this.state.empresa.direccion}</span> </span>
            <Badge onClick={this.abrir_modal_nombre} style={{ cursor: "pointer" }} color="info"> <i className="fa fa-pencil"></i></Badge><br /><br />

            <span className="h4"><b>Teléfono: </b> <span className="">{this.state.empresa.telefono}</span> </span>
            <Badge onClick={this.abrir_modal_nombre} style={{ cursor: "pointer" }} color="info"> <i className="fa fa-pencil"></i></Badge><br /><br />

            <span className="h4"><b>Dominio: </b> <span className="">{this.state.empresa.dominio}</span> </span>
            <Badge onClick={this.abrir_modal_nombre} style={{ cursor: "pointer" }} color="info"> <i className="fa fa-pencil"></i></Badge><br /><br />

            <span className="h4"><b>Giro: </b> <span className="">{this.state.empresa.giro}</span> </span>
            <Badge onClick={this.abrir_modal_nombre} style={{ cursor: "pointer" }} color="info"> <i className="fa fa-pencil"></i></Badge><br /><br />

          </Col>
        </Row>
      );
    } else {
      return (
        <Row>
          <Col md="8" xs="12" className="mx-auto text-center">
            <span className="h4 bg-warning p-1 rounded"><b>Clave Única: </b> <span className="">{this.state.empresa.id_cliente}</span> </span><br/><br/>

            <span className="h4"><b>Razon Social: </b> <span className="">{this.state.empresa.razon_social}</span> </span>
            
            <span className="h4"><b>Dirección: </b> <span className="">{this.state.empresa.direccion}</span> </span>
            
            <span className="h4"><b>Teléfono: </b> <span className="">{this.state.empresa.telefono}</span> </span>
            
            <span className="h4"><b>Dominio: </b> <span className="">{this.state.empresa.dominio}</span> </span>
            
            <span className="h4"><b>Giro: </b> <span className="">{this.state.empresa.giro}</span> </span>
            
          </Col>
        </Row>
      );
    }
  }
}
export default Empresa;
