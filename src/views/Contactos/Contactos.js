import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';

import CardStandar from '../../components/CardStandar.js';
//Nav
import NavBar from './NavBar.js';
//Items
import items from './items';
import { SessionContext } from '../../sessionContext.js';

class Contactos extends Component {

  static contextType = SessionContext;

  state = {
    cuenta: false
  }

  componentWillMount = () => {
    if (this.context.cuenta !== undefined && this.context.cuenta !== false) this.setState({ cuenta: true });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card className="">
              <CardHeader className="text-white p-4" style={{backgroundColor:"rgb(44,96,186)"}}>
                <p className="h3"><i className="fa fa-users"></i> Contactos |</p>
              </CardHeader>
              <CardBody>
                {this.state.cuenta === false ?
                  <Row className="py-5"><Col xl="6" md="8" xs="12" className="mx-auto d-flex flex-column justify-content-center"><img width="100%" src={require('../../assets/img/fondos/contactos-no-count.png')} alt="contactos-no-count" /></Col></Row>
                  :
                  <>
                    Diseño web
                  </>
                }
                <Row>

                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Contactos;
