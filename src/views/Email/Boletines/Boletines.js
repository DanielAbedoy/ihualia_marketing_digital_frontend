import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
//import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ModelEmail from '../../../models/EmailMarketing';

import Table from './Hooks/Table';

class Boletines extends Component{

  state = {
    boletines: []
  }

  componentDidMount = () => this.getDatosBoletines();

  getDatosBoletines = () => {
    const id_cuenta = require('store').get("cuenta_en_uso").id;
    const fecha_start = this.getFecha("start");
    const fecha_end = this.getFecha("end");
    //new ModelEmail().get_boletines_fecha_cuenta(fecha_start, fecha_end, id_cuenta)
    new ModelEmail().get_boletines_fecha_cuenta("2020-10-01", "2020-10-30",id_cuenta)
      .then(boletines => {
        if(boletines !== "error"){
        boletines.forEach(boletin => {
          new ModelEmail().get_envios_boletin(boletin.id)
            .then(envio => {
              if (envio[0]) { boletin.ids_contactos = envio[0].ids_contactos; boletin.ids_grupos = envio[0].ids_grupos }
              this.setState({ boletines: this.state.boletines.concat(boletin) });
            })
        });
        }
      })

  }

  getFecha = tipo => {
    const f = new Date();
    const year = f.getFullYear();
    const month = (f.getMonth() + 1);
    if (tipo === "start") return `${year}-${month}-01`;
    else if (tipo === "end") return `${year}-${month}-${new Date(year, month, 0).getDate()}`;
    return null;
  }

  gestionarBoletin = (boletin) => {
    this.props.history.push({
      pathname: "/emailmarketing/gestionar",
      state: { data:boletin }
    })
  }

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
                  <Col md="12" >

                    <Table
                      boletines={this.state.boletines}
                      event_gestionarBoletin={this.gestionarBoletin}
                    />
                  
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

}

export default Boletines;