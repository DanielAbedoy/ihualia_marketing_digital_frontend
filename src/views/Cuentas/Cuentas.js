import React, {Component} from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

class Cuentas extends Component{
  render(){
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <p className="h3 m-3"><i class="fa fa-briefcase" ></i> Mis Cuentas |</p>
              </CardHeader>
              <CardBody>
                
                  

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Cuentas;
