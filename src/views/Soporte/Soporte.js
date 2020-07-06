import React, {Component} from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

class Soporte extends Component{
  render(){
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <i className="fa fa-support"></i>
                <strong>Soporte y Ayuda</strong>
              </CardHeader>
              <CardBody>
                <h3>Soporte y Ayuda</h3>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Soporte
