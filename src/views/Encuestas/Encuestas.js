import React, {Component} from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

class Encuestas extends Component{

state = {
    cuenta: false
  }

  componentWillMount = () => {
    if (require('store').get("cuenta_en_uso")) this.setState({ cuenta: true });
  }

  render(){
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
            <CardHeader className="text-white p-4" style={{backgroundColor:"rgb(255,170,51)"}}>
                <p className="h3"><i className="fa fa-envelope-o"></i> Encuentas |</p>
              </CardHeader>
              <CardBody>
              {this.state.cuenta === false ?
                  <Row className="py-5"><Col xl="6" md="8" xs="12" className="mx-auto d-flex flex-column justify-content-center"><img width="100%" src={require('../../assets/img/fondos/encuestas-no-count.png')} alt="encuestas-no-count" /></Col></Row>
                  :
                  <>
                    Diseño web
                  </>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Encuestas;
