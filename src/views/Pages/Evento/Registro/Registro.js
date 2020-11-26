import React, { Component, Suspense } from 'react';
import { Row, Col, Button } from 'reactstrap';

import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import Load from '../../../../components/Load';
import Header from '../../../../containers/EventoLayout/Header';
import Footer from '../../../../containers/EventoLayout/Footer';
import EventoModel from '../../../../models/Eventos';
import Datos from './Hooks/Datos';
import OxxoTicket from './Hooks/PayDetails/Oxxo/OxxoTicket';
import CardDetails from './Hooks/PayDetails/CradDetails';
import Main from './Hooks/Main';

const Boleto = React.lazy(() => import('./Hooks/Boleto'));
const Orden = React.lazy(() => import('./Hooks/Orden'));

class Registro extends Component {

  constructor(props) {
    super(props);

    this.state = {
      evento: { boletos: [] },
      carrito: [],
      total: 0,
      showContinuar: false,
      total_w_donacion: 0,
      finish: { is: false, datos: {} },

      open_orden: true
    }

  }


  setCarrito = (carrito, total) => this.setState({ carrito: carrito, total: total });
  setTotalWDonacion = (money) => this.setState({ total_w_donacion: money });

  componentDidMount = () => {

    const evento_url = this.props.match.params.id;

    new EventoModel().get_eventoby_url(evento_url)
      .then(evento => {
        if (evento === "error" || evento === undefined) { this.props.history.push('/404'); return; }
        if (evento.estatus === "borrador" || evento.estatus === "pasado") { this.props.history.push('/404'); return; }
        this.setState({ evento: evento });
      })
  }

  complete = (tipo, datos) => { //tipo, data{}
    this.setState({ finish: { is: true, tipo: tipo, datos: datos }, carrito: [] });
  }

  scrollToBottomOrder = () => {
    this.orderRef.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    return (
      <div className="container-fluid evento-container">
        {this.state.evento.id ?
          <Row className="flex-column m-0 p-0" style={{ minHeight: "100vh" }}>
            <Row className="m-0 p-0">
              <Col md="12" className="m-0 p-0"><Header className="header-white" /></Col>
            </Row>

            <Row className="m-0  p-0" >
              <Col md="12" className="m-0 p-0">
                <Row className="m-0 p-0">
                  <Col md="8" xs="12" className="py-4" >
                    <p className="text-right d-sm-none"><u><b onClick={this.scrollToBottomOrder} >Ver orden</b></u> </p>
                    <Row style={{ height: "100%" }}>
                    {this.state.finish.is ?
                      this.state.finish.tipo === "oxxo" ?
                        <Col md="9" xs="12" className="mx-auto">
                          <OxxoTicket referencia={this.state.finish.datos.referencia} monto={this.state.finish.datos.monto} barcode={this.state.finish.datos.barcode} />
                          <Row>
                            <Col md="4" xs="12" className="ml-auto"><Button color="success" block className="ml-auto my-3" onClick={() => this.props.history.push(`/evento/${this.state.evento.url}`)} > Terminar </Button></Col>
                          </Row>
                        </Col>
                        :
                        <Col md="9" xs="12" className="mx-auto">
                          <CardDetails data={this.state.finish.datos.data} />
                          <Row>
                            <Col md="4" xs="12" className="ml-auto"><Button color="success" block className="ml-auto my-3" onClick={() => this.props.history.push(`/evento/${this.state.evento.url}`)} > Terminar </Button></Col>
                          </Row>
                        </Col>
                      :
                      <>
                        {!this.state.showContinuar ?
                          <>
                            <Col md="12" className="align-self-center">
                                <Boleto
                                  boletos={JSON.parse(this.state.evento.boletos).data}
                                  carrito={this.state.carrito}
                                  total={this.state.total}
                                  setCarrito={this.setCarrito}
                                  asistentes={this.state.evento.asistentes}
                                />
                            </Col>
                            <Col md="5" xs="12" className="mx-auto my-3" >
                              {this.state.carrito.length !== 0 ?
                                <Button disabled={this.state.carrito.length !== 0 ? false : true}
                                  color="success" block onClick={() => this.setState({ showContinuar: true })} > Continuar</Button>
                                : <></>
                              }
                            </Col></>
                          :
                          <Col md="12" className="mt-5">
                            <Datos
                              articulos={this.state.carrito}
                              total={this.state.total}
                              MONTO={this.state.total_w_donacion === 0 ? this.state.total : this.state.total_w_donacion}
                              cancel={() => this.setState({ showContinuar: false, carrito: [], total: 0, total_w_donacion: 0 })}
                              setTotal={this.setTotalWDonacion}
                              evento={this.state.evento.id}
                              setCompletado={this.complete}
                              url={this.state.evento.url}
                              history={this.props.history}
                            />
                          </Col>
                        }
                      </>
                    }
                  </Row>
                  </Col>

                  <Col md="4" xs="12" className="shadow bg-white" style={{ minHeight: "85vh" }}>
                    
                    <Orden
                      carrito={this.state.carrito}
                      total={this.state.total_w_donacion === 0 ? this.state.total : this.state.total_w_donacion}
                      datos={{ evento: this.state.evento.id, titulo: this.state.evento.nombre, fecha_ini: this.state.evento.fecha_hora_inicio, fecha_fin: this.state.evento.fecha_hora_fin, img: this.state.evento.imagen, descripcion: this.state.evento.resumen }}
                      url={this.state.evento.url}
                    />
                    
                  </Col>
                </Row>
                <span ref={el =>{this.orderRef = el}} ></span>
              </Col>
            </Row>

            <Row className="m-0 p-0 mt-auto">
              <Col md="12" className="m-0 p-0"><Footer /></Col>
            </Row>
          </Row>
          : <Load />
        }

      </div>
    );
  }
}

export default Registro;
/*
<Header className="header-white" />

<Row className="mx-0 px-0" style={{ backgroundColor: "rgba(254,254,254,0.9)" }}>
  <Col md="12">
    <Row style={{ height: "100%" }}>
      <Col md="8" xs="12" className="py-md-5 py-xs-1" style={{ height: "100%" }}>

        <Row className="d-flex" style={{ height: "100%" }} >

          {this.state.finish.is ?

            this.state.finish.tipo === "oxxo" ?
              <Col md="9" xs="12" className="mx-auto">
                <OxxoTicket referencia={this.state.finish.datos.referencia} monto={this.state.finish.datos.monto} barcode={this.state.finish.datos.barcode} />
                <Row>
                  <Col md="4" xs="12" className="ml-auto"><Button color="success" block className="ml-auto my-3" onClick={() => this.props.history.push(`/evento/${this.state.evento.url}`)} > Terminar </Button></Col>
                </Row>
              </Col>
              :
              <Col md="9" xs="12" className="mx-auto">
                <CardDetails data={this.state.finish.datos.data} />
                <Row>
                  <Col md="4" xs="12" className="ml-auto"><Button color="success" block className="ml-auto my-3" onClick={() => this.props.history.push(`/evento/${this.state.evento.url}`)} > Terminar </Button></Col>
                </Row>
              </Col>
            :
            <>

              {/* <span className="m-0" ref={el => { this.orderRef = el }}></span>
              {!this.state.showContinuar ?
                <>
                  <Col md="12" className="align-self-center">

                    <Suspense fallback={<Load />}>
                      <Boleto
                        boletos={JSON.parse(this.state.evento.boletos).data}
                        carrito={this.state.carrito}
                        total={this.state.total}
                        setCarrito={this.setCarrito}
                        asistentes={this.state.evento.asistentes}
                      />
                    </Suspense>
                  </Col>
                  <Col md="5" xs="12" className="mx-auto my-3" >
                    {this.state.carrito.length !== 0 ?
                      <Button disabled={this.state.carrito.length !== 0 ? false : true}
                        color="success" block onClick={() => this.setState({ showContinuar: true })} > Continuar</Button>
                      : <></>
                    }
                  </Col></>
                :
                <Col md="12" className="mt-5">
                  <Datos
                    articulos={this.state.carrito}
                    total={this.state.total}
                    MONTO={this.state.total_w_donacion === 0 ? this.state.total : this.state.total_w_donacion}
                    cancel={() => this.setState({ showContinuar: false, carrito: [], total: 0, total_w_donacion: 0 })}
                    setTotal={this.setTotalWDonacion}
                    evento={this.state.evento.id}
                    setCompletado={this.complete}
                    url={this.state.evento.url}
                    history={this.props.history}
                  />
                </Col>
              }
            </>
          }

        </Row>
      </Col>

      <Col md="4" xs="12" style={{ height: "100%", backgroundColor: "white" }} className="shadow-lg">

        <Suspense fallback={<Load />}>
          <Orden
            carrito={this.state.carrito}
            total={this.state.total_w_donacion === 0 ? this.state.total : this.state.total_w_donacion}
            datos={{ evento: this.state.evento.id, titulo: this.state.evento.nombre, fecha_ini: this.state.evento.fecha_hora_inicio, fecha_fin: this.state.evento.fecha_hora_fin, img: this.state.evento.imagen, descripcion: this.state.evento.resumen }}
            url={this.state.evento.url}
          />
        </Suspense>

      </Col>

    </Row>

  </Col>
</Row>

<Footer />
 */