import React, {Component} from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

class Redes extends Component{
  render(){
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <i className="fa fa-twitter"></i>
                <strong>Redes Sociales</strong>
              </CardHeader>
              <CardBody>
                <h3>Redes Sociales</h3>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Redes;
