import React, { Component, Suspense } from 'react';
import { Row, Col, Button } from 'reactstrap';

import Load from '../../../../components/Load';
import Header from '../../../../containers/EventoLayout/Header';
import Footer from '../../../../containers/EventoLayout/Footer';
import EventoModel from '../../../../models/Eventos';
//import Boleto from './Hooks/Boleto';
//import Orden from '';
import Datos from './Hooks/Datos';
import OxxoTicket from './Hooks/PayDetails/Oxxo/OxxoTicket';
import CardDetails from './Hooks/PayDetails/CradDetails';

const Boleto = React.lazy(() => import('./Hooks/Boleto'));
const Orden = React.lazy(() => import('./Hooks/Orden'));

class Registro extends Component {

  state = {
    evento: { boletos: [] },
    carrito: [],
    total: 0,
    showContinuar: false,
    total_w_donacion: 0,
    finish: { is: false, datos: {} },


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

  render() {
    return (
      <div className="container-fluid evento-container">
        <Header className="header-white" />

        <Row className="mx-0 px-0" style={{ minHeight: "90vh", backgroundColor: "rgba(254,254,254,0.9)" }}>
          <Col md="12">
            <Row style={{ height: "100%" }}>
              <Col md="8" xs="12" className="py-5" style={{ height: "100%" }}>

                <Row className="d-flex" style={{ height: "100%" }} >

                  {this.state.finish.is ?

                    this.state.finish.tipo === "oxxo" ?
                      <Col md="9" xs="12" className="mx-auto">
                        <OxxoTicket referencia={this.state.finish.datos.referencia} monto={this.state.finish.datos.monto} barcode={this.state.finish.datos.barcode} />
                        <Row>
                          <Col md="4" xs="12" className="ml-auto"><Button color="success" block className="ml-auto my-3" onClick={() => this.props.history.push("/inicio")} > Terminar </Button></Col>
                        </Row>
                      </Col>
                      :
                      <Col md="9" xs="12" className="mx-auto">
                        <CardDetails data={this.state.finish.datos.data} />
                        <Row>
                          <Col md="4" xs="12" className="ml-auto"><Button color="success" block className="ml-auto my-3" onClick={() => this.props.history.push("/inicio")} > Terminar </Button></Col>
                        </Row>
                      </Col>
                    :
                    !this.state.showContinuar ?
                      <>
                        <Col md="12" className="align-self-center">
                          <Suspense fallback={<Load />}>
                            <Boleto
                              boletos={this.state.evento.boletos}
                              carrito={this.state.carrito}
                              total={this.state.total}
                              setCarrito={this.setCarrito}
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
                          cancel={() => this.setState({ showContinuar: false, carrito: [], total: 0, total_w_donacion: 0 })}
                          setTotal={this.setTotalWDonacion}
                          evento={this.state.evento.id}
                          setCompletado={this.complete}
                        />
                      </Col>

                  }

                </Row>
              </Col>

              <Col md="4" xs="12" style={{ height: "100%", backgroundColor: "white" }} className="shadow-lg">
                {this.state.evento.id ?
                  <Suspense fallback={<Load />}>
                    <Orden
                      carrito={this.state.carrito}
                      total={this.state.total_w_donacion === 0 ? this.state.total : this.state.total_w_donacion}
                      datos={{ evento: this.state.evento.id, titulo: this.state.evento.nombre, fecha_ini: this.state.evento.fecha_hora_inicio, fecha_fin: this.state.evento.fecha_hora_fin, img: this.state.evento.imagen, descripcion: this.state.evento.resumen }}
                      url={this.state.evento.url}
                    />
                  </Suspense>
                  : <></>
                }

              </Col>

            </Row>

          </Col>
        </Row>
        <Footer />
      </div>
    );
  }
}

export default Registro;