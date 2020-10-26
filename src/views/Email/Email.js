import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import items from './items';
import store from 'store';

import Slide from '../../components/Slide';
import InfoCard from '../../components/InfoCard';
import CardMini from '../../components/CardMini';
import ChartComponent from '../../components/ChartComp';
import EmailMarketing from '../../models/EmailMarketing';


class Email extends Component {

  months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

  state = {
    boletines: [],
    enviados: [],
    borradores: [],
    pendientes: [],
    
    labelsChat: [],
    dataSetChart:[],
  }
  componentDidMount = () => {
    
    this.getBoletines();
  }

  /* Obtener los boletintes el mes [X]
    Boletienes enviados [x]
    Boletienes borradores [x]
    Boletienes pendientes [x]
  */


  /* Agrregarlas opciones de crear, Administrar y Listado de los boletienes */

  getBoletines = async () => {
    if (require("store").get("cuenta_en_uso")) {
      alert("Debes usar unacuenta");
      this.props.history.push("/inicio");
      return;
    }
    const id_cuenta = require("store").get("cuenta_en_uso").id;
    const fecha_start = this.getFecha("start");
    const fecha_end = this.getFecha("end");

    const boletines = await new EmailMarketing().get_boletines_fecha_cuenta(fecha_start,fecha_end,id_cuenta);
    console.log(boletines)
    this.setState({ boletines: boletines }, () => { this.filerBoletienesEnviados(); this.filterBorradores();this.filterProgramados()})
  }

  filerBoletienesEnviados = () => {
    let f = new Date();
    const sends = this.state.boletines.filter(b => b.estatus == "enviado" && b.tipo_publicacion == "enviado" );
    console.log(sends);
    this.setState({ enviados: sends },()=>{this.sortDataChart()});
  }

  filterBorradores = () => {
    const borradores = this.state.boletines.filter(b => b.estatus === "borrador");
    console.log(borradores);
    this.setState({ borradores: borradores });
  }

  filterProgramados = () => {
    const progs = this.state.boletines.filter(b => b.estatus === "por enviar" && b.tipo_publicacion == "programado");
    console.log(progs);
    this.setState({ pendientes: progs });
  }

  getFecha = tipo => {
    const f = new Date();
    const year = f.getFullYear();
    const month = (f.getMonth() + 1);
    if (tipo === "start") return `${year}-${month}-01`;
    else if (tipo === "end") return `${year}-${month}-${new Date(year, month, 0).getDate()}`;
    return null;
  }

  
  /* Obtener los dias del mes
  Obtener los boletintes de cada uno de esos dias */
  sortDataChart = () => {
    //Dias del mes
    let f = new Date();
    const days = new Date(f.getFullYear(), (f.getMonth() + 1), 0).getDate();
    const lbs = [];
    const datSet = [];
    //Envios por dia
    for (let i = 1; i <= days; i++) {
      lbs.push(`${this.months[f.getMonth()]} ${i}`);
      let date = `${f.getFullYear()}-${(f.getMonth() + 1)}-${i < 10 ? `0${i}` : i}`;
      let arr = this.state.enviados.filter(b => b.fecha_creado == date);
      datSet.push(arr.length);
    }
    this.setState({ labelsChat: lbs, dataSetChart:datSet});
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
                  <Col xl="10" lg="12" xs="12" className="mx-auto">
                  <br/>
                    <Row>
                      <Col md="6" xs="12">
                        <Row style={{ height: "100%" }} className="align-items-center" >
                          <CardMini title={this.state.boletines.length} subTitle="Boletines del mes" icon="calendar" />
                          <CardMini title={this.state.enviados.length}subTitle="Enviados del mes" icon="calendar-o" color="#21f077bb" />
                          <CardMini title={this.state.borradores.length} subTitle="Borradores del mes" icon="pencil-square-o" color="#21f077bb" />
                          <CardMini title={this.state.pendientes.length} subTitle="Programados del mes" icon="clock-o" />

                        </Row>
                      </Col>
                      <Col md="6" xs="12">
                        <Slide items={items} history={this.props.history} />
                      </Col>
                    </Row>
                    <br/>
                    <hr />

                    <Row>
                      <Col md="10" xs="11" className="mx-auto">
                        <ChartComponent 
                          label="Boletitnes enviados"
                          labels={this.state.labelsChat}
                          dataSet={this.state.dataSetChart}
                        />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col md="9" xs="11" className="mx-auto align-self-center" >
                        <p style={{ color: "#21f077bb", background: `linear-gradient(184deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 80%, rgba(91,191,233,1) 82%, #21f077bb 100%)`, }}
                          className="align-middle text-center rounded h1 shadow p-3 m-0">
                          <b>Boletines enviados en el mes de {this.months[new Date().getMonth()]}</b></p>
                      </Col>

                    </Row>
                    <hr />
                    <Row>
                      <Col sm="4" xs="12" className="mx-auto">
                        <InfoCard
                          title="Crea un boletin nuevo" button="Crealo Ahora" fn={() => this.props.history.push("/emailmarketing/crear")}
                          description="Lorem Iprso lore resm srty sdert Lorem Iprso lore resm srty sdert Lorem Iprso lore resm srty sdert Lorem Iprso lore resm srty sdert"
                        />
                      </Col>
                      <Col sm="4" xs="12" className="mx-auto">
                        <InfoCard color="#21f077bb"
                          title="Mira tus boletienes" button="Entra Y Mira" fn={() => this.props.history.push("/emailmarketing/boletines")}
                          description="Lorem Iprso lore resm srty sdert Lorem Iprso lore resm srty sdert Lorem Iprso lore resm srty sdert Lorem Iprso lore resm srty sdert"
                        />
                      </Col>
                      <Col sm="4" xs="12" className="mx-auto">
                      <InfoCard
                          title="Gestiona tus boletines" button="Primero Crealo" fn={() => this.props.history.push("/emailmarketing/crear")}
                          description="Lorem Iprso lore resm srty sdert Lorem Iprso lore resm srty sdert Lorem Iprso lore resm srty sdert Lorem Iprso lore resm srty sdert"
                        />
                      </Col>
                    </Row>
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
export default Email;
