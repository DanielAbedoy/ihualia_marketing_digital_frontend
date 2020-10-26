import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Col, Row, Input, Button, Badge, Collapse } from 'reactstrap';


import NavBar from '../components/NavBar.js';
import ModalRelacionAsBo from './ModalRelacionAsBo';

import EventoModel from '../../../models/Eventos';

class Gestionar extends Component {

  state = {

    id_evento: 0,
    evento:{},
    boletos: [],
    boletos_adquiridos: 0,
    asistentes: [],
    ventas: 0,
    donaciones: [],
    boletos_asistente:[]
  }

  componentDidMount = () => {

    if (!this.props.location.state) {
      this.props.history.push('/eventos');
      return;
    } 
    const id_evento = this.props.location.state.evento.id;
    //const id_evento = 54;
    this.setState({ id_evento: id_evento, evento: this.props.location.state.evento }, () => {
      this.get_boletos_vendidos();
    })
  }

  get_boletos_vendidos = () => {

    //Conseguir los boletos del evento
    new EventoModel().get_boletos_evento(this.state.id_evento)
      .then(boletos => this.setState({ boletos: boletos }, () => {
        //Conseguir las cantidades de cada boleto
        let suma = 0;
        boletos.forEach(b => {
          new EventoModel().get_cantidad_boletos_vendidos(b.id)
            .then(b_c => {
              b_c.forEach(uniq => suma += parseInt(uniq.cantidad, 10));
              this.setState({ boletos_adquiridos:suma});
            })
            
        });

        this.get_aisistentes_registrados();
      }))
  }

  get_aisistentes_registrados = () => {
    new EventoModel().get_asistentes_evento(this.state.id_evento)
      .then(asistentes => {
        this.setState({ asistentes: asistentes }, () => {
          this.get_ventas();
        });
      });
  }

  get_ventas = () => {
  
    let venta = 0;
    let boletos_asistente = [];
    this.state.asistentes.forEach((asistente) => {
    //Estatus pagado o no, traer sus datos, boleto-asistente-evento, cantidad
      
      if (asistente.estatus_pago === 'pagado') {
        
        new EventoModel().get_boleto_asistente_evento(asistente.id)
          .then(boletos => {
            boletos.forEach(boleto => {
              boletos_asistente.push(boleto);
              this.setState({ boletos_asistente: boletos_asistente });
              let b = this.state.boletos.filter(b => b.id == boleto.id_boleto)[0];
              if (b.precio === 'Donacion') {
                new EventoModel().get_donacion_asistente(boleto.id_asistencia)
                  .then(donacion => {
                    donacion.forEach((d) => {
                      let arr = this.state.donaciones.slice();
                      arr.push(d);
                      venta += parseInt(d.monto, 10);
                      this.setState({ ventas: venta, donaciones:arr });
                    }) 
                  })
              } else if(b.precio !== 'Gratis'){
                venta += (parseInt(boleto.cantidad, 10) * parseInt(b.precio, 10))  
                this.setState({ ventas: venta });
              }
              
              
              
            });
          })
      } else {
        new EventoModel().get_boleto_asistente_evento(asistente.id)
          .then(boletos => {
            boletos.forEach(boleto => {
              boletos_asistente.push(boleto);
              this.setState({ boletos_asistente: boletos_asistente });
              let b = this.state.boletos.filter(b => b.id == boleto.id_boleto)[0];
              if (b.precio === 'Donacion') {
                new EventoModel().get_donacion_asistente(boleto.id_asistencia)
                  .then(donacion => {
                    donacion.forEach((d) => {
                      let arr = this.state.donaciones.slice();
                      arr.push(d);
                    }) 
                  })
              } 
            });
          })
      }
    })

    //saber el precio del boleto, sumarlo, si es donacion 
    //Traer la donacion por medio del la asistencia



  }

  open_modal = e => {
    this.acomodar_datos();
    this.modal_relacion.toggle_event()
  };

  acomodar_datos = () => {
    let datos = [];

    this.state.asistentes.forEach(asistente => {
      let new_data = {};
      let venta = 0;
      new_data.datos = asistente;
      //Darle los bolotos que le pertenecen
      const bs = this.state.boletos_asistente.filter(b => b.id_asistencia == asistente.id);
      //Agregar el nombre del boleto
      bs.forEach(boleto => {
        const datos_boleto = this.state.boletos.filter(b => b.id == boleto.id_boleto)[0];
        boleto.datos = datos_boleto;
        if (datos_boleto.tipo === 'pago') venta += parseInt(boleto.cantidad, 10) * parseInt(datos_boleto.precio, 10);
      })
      new_data.boletos = bs;
      //Darle donaciones
      const don = this.state.donaciones.filter(d => d.id_asistencia == asistente.id);
      new_data.donacion = don;
      don.forEach(d => {
        venta += parseInt(d.monto, 10);
      })

      new_data.venta = venta;

      datos.push(new_data);
    });    
    //console.log(datos)
    this.modal_relacion.set_datos(datos);
  }

  acomodarFehca = fecha => {
    if (!fecha) return;
    const f = fecha.split("T");
    const hora = f[1].split("-");
    return `${f[0]} ${hora[0]}`
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <NavBar />
              </CardHeader>
              <CardBody >

                <p className="text-center h6"><b> Estatus del Evento {"  "}</b>
                  <Badge color={this.state.evento.fecha_estatus === "normal" ? "success" : "danger"}
                  > {this.state.evento.fecha_estatus === "normal" ? "  Por llevarse a cabo  " : "  Finalizado  "}</Badge>
                </p>

                <hr />
                <p className="h3"> Datos Principales</p>
                <hr />
                <Row>
                  <Col md="12"><p className="text-center h4">{ this.state.evento.nombre}</p> </Col>
                  <Col md="12"><p className="text-center h6">{this.state.evento.fecha_estatus === "normal" ? "Por llevarse a cabo" : "Pasado"}</p> </Col>
                  <Col md="12"><p className="text-center h6">Inicio: {this.acomodarFehca(this.state.evento.fecha_hora_inicio)} </p> </Col>
                  <Col md="12"><p className="text-center h6">Fin: {this.acomodarFehca(this.state.evento.fecha_hora_fin)}</p> </Col>
                  <Col md="12"><p className="text-center h6">{this.state.evento.tipo}</p> </Col>
                </Row>

                <hr />
                <p className="h3">Informacion del evento</p>
                <br/>
                <Row>
                  <Col md="4" xs="12">
                    <Card>
                      <CardBody style={{ height: "75px" }}>
                      <p className="h1 text-center">{this.state.boletos_adquiridos} </p>
                      </CardBody>
                      <CardFooter className="bg-primary p-1">
                        <p className="text-center h4"> Boletos Adquiridos</p>
                      </CardFooter>
                    </Card>
                  </Col>
                  <Col md="4" xs="12">
                    <Card>
                      <CardBody style={{ height: "75px" }}>
                        <p className="h1 text-center">{(this.state.asistentes.length)} </p>
                      </CardBody>
                      <CardFooter className="bg-primary p-1">
                        <p className="text-center h4">Asistentes Registrados</p>
                      </CardFooter>
                    </Card>
                  </Col>
                  <Col md="4" xs="12">
                    <Card>
                      <CardBody style={{ height: "75px" }}>
                        <p className="h1 text-center">{(this.state.ventas)} </p>
                      </CardBody>
                      <CardFooter className="bg-primary p-1">
                        <p className="text-center h4">Ventas</p>
                      </CardFooter>
                    </Card>
                  </Col>

                  <Col md="12">
                    <p className="category text-right px-2">
                      <span style={{ cursor: "pointer" }}
                          onClick={this.open_modal}
                          className="h5 text-primary">
                        <u> Ver relación completa de asistentes/boletos</u>
                      </span>
                    </p>
                  </Col>
                </Row>


                {this.state.evento.estatus === "completo" ? 
                  this.state.evento.fecha_estatus === "normal" ?
                  <>
                 <hr />
                 <p className="h3"> Comparte el evento</p>
                 <br />
                 <Row>
                   <Col md="7" xs="12" className="mx-auto">
                     <p className="h5">Enlace de entrada a la pagina del evento</p>
                     <Input type="text" readOnly={true} value={`https://app.ihualia.com.mx:3000/#/evento/?event=${this.state.id_evento}`} />
                   </Col>
                  </Row>
                    </>
                    :
                    <></>
                 :<></> 
              }

               
              </CardBody>
            </Card>
          </Col>
        </Row>

        <ModalRelacionAsBo
          ref={element => { this.modal_relacion = element }}
          total={this.state.ventas}
        />
      </div>
    );
  }
}

export default Gestionar;