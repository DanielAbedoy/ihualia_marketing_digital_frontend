import React, {Component} from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

class Usuarios extends Component{
  render(){
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <i className="fa fa-users"></i>
                <strong>Usuarios</strong>
              </CardHeader>
              <CardBody>
                <h3>Listado de usuarios del cliente</h3>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Usuarios;
