import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Input } from 'reactstrap';
//import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ModelEmail from '../../../models/EmailMarketing';

import Table from './Hooks/Table';

class Boletines extends Component {

  state = {
    boletines: [],
    fecha_start: '',
    fecha_end:''
  }

  componentDidMount = () => {
    this.setState({fecha_start: this.getFecha("start"), fecha_end: this.getFecha("end")}, () => {
      this.getDatosBoletines();  
    })
  }

  getDatosBoletines = () => {

    const id_cuenta = require('store').get("cuenta_en_uso").id;
    new ModelEmail().get_boletines_fecha_cuenta(this.state.fecha_start, this.state.fecha_end, id_cuenta)
      .then(boletines => {
        if (boletines !== "error") this.setState({ boletines: boletines });
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
      state: { data: boletin }
    })
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader className="bg-primary text-white p-4">
                <p className="h3"><i className="fa fa-envelope-o"></i> EmailMarketing |</p>
                {/* <NavBar /> */}
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="6" xs="12">
                    <p className="h4 mb-0">Boletines</p>
                    <p className="h6 text-muted">Boletines generados en la cuenta</p>
                  </Col>
                  <Col md="3" xs="8" className="mx-auro">
                    <p className="mb-0 text-muted"><b>Desde</b></p>
                    <Input type="date" value={this.state.fecha_start}
                      onChange={(e)=> {this.setState({fecha_start:e.target.value, boletines:[]},()=> this.getDatosBoletines() )}}
                    />
                  </Col>
                  <Col md="3" xs="8" className="mx-auro">
                    <p className="mb-0 text-muted"><b>Hasta</b></p>
                    <Input type="date" value={this.state.fecha_end}
                      onChange={(e)=> {this.setState({fecha_end:e.target.value, boletines:[]},()=> this.getDatosBoletines() )}}
                    />
                  </Col>

                </Row>
                <hr />

                <Row>
                  <Col md="12" >

                    <Table
                      boletines={this.state.boletines}
                      event_gestionarBoletin={this.gestionarBoletin}
                      history={this.props.history}
                    />

                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div >
    );
  }

}

export default Boletines;