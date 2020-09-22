import React, {Component} from 'react';
import { Card, CardBody, CardHeader, Col, Row, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';

import CardStandar from '../../components/CardStandar';
import NavBar from './components/NavBar.js';
import items from './items';

class Eventos extends Component{
  render(){
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <NavBar />
              </CardHeader>
              <CardBody>
                <Row>
                {items.map((item, indx) => {
                  if(item.visible) return (
                      
                      <CardStandar key={indx}
                        class="card-user text-dark mx-auto"
                        colLg="5" colMd="6" colSm="6" colXs="12"
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
export default Eventos;
