import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';

import CardStandar from '../../components/CardStandar.js';
//Nav
import NavBar from './NavBar.js';
//Items
import items from './items';

class Contactos extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card className="">
              <CardHeader>
                <NavBar
                  title="Contactos"
                />
              </CardHeader>
              <CardBody>
                <Row>
                  {items.map((item, indx) => {
                    return (
                      
                      <CardStandar key={indx}
                        class="card-user text-dark"
                        colLg="4" colMd="6" colSm="6" colXs="12"
                        contenidoHeader={
                          <CardImg top width="100%" src={item.img} alt={`Imagen: ${item.name}`} title={item.name} />
                        }
                        contenidoBody={
                          <>
                            <Link to={item.path}  >
                              <h5 className="title">{item.name}</h5>
                            </Link>
                            <p className="description">Leyenda del Item</p>
                            <p className="description text-center">
                              Esto es una pequeña descripcion de lo que haces en este menu
                            </p>
                          </>
                        }
                      />
                    );
                  })
                  }
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
