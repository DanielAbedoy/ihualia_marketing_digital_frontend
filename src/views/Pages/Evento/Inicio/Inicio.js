import React, { Component } from 'react';
import { Row, Col, Button, Badge } from 'reactstrap';


import Header from '../../../../containers/EventoLayout/Header';
import Footer from '../../../../containers/EventoLayout/Footer';
import EventoModel from '../../../../models/Eventos';

import Load from '../../../../components/Load';
import ImageContent from './components/ImageContent'
import SidePrincipal from './components/SidePrincipal'
import SideInfo from './components/SideInfo'
import InfoContent from './components/InfoContent'
import FixedPlugin from './components/FixedPlugin'

import urls from '../../../../models/urls';



class Inicio extends Component {

  state = {
    evento: {},
  }

  componentDidMount = () => {

    const evento_url = this.props.match.params.id;

    new EventoModel().get_eventoby_url(evento_url)
      .then(evento => {
        if (evento === "error" || evento === undefined) { this.props.history.push('/404'); return; }
        if (evento.estatus === "borrador" || evento.estatus === "pasado") { this.props.history.push('/404'); return; }
        this.setState({ evento: evento});
      })
  }

  render() {
    return (

      <div className="evento-container">

        {this.state.evento.id ?
          <>
            <Header
            />
            {/* <SideBar /> */}
            <div className="main-event">
              <Row className="m-0 p-0">
                <Col md="12" style={{ overflow: "hidden" }}>

                  <Row style={{ overflow: "hidden" }} className="px-0 py-5 m-0">
                    <img src={`${new urls().supporserver()}/ev/getimg/?imagen=${this.state.evento.imagen}&evento=${this.state.evento.id}`}
                      width="100%" style={{ position: "absolute", filter: "blur(6px)", transform: "scale(1.3)" }}
                    />
                    <Col md="11" xs="12" className="mx-auto mt-5">
                      <Row >
                        <Col md="6" xs="12" className="mx-auto" >
                          <ImageContent
                            src={`${new urls().supporserver()}/ev/getimg/?imagen=${this.state.evento.imagen}&evento=${this.state.evento.id}`}
                          />
                        </Col>
                        <Col md="5" xs="12" className="py-3">
                          <SidePrincipal
                            titulo={this.state.evento.nombre}
                            organizador={this.state.evento.id_cuenta}
                            resumen={this.state.evento.resumen}
                          />
                        </Col>
                      </Row>
                    </Col>

                  </Row>
                </Col>
              </Row>
              <span id="out"></span>
              <Row className="p-0 m-0">
                <Col md="12" xs="12">
                  <FixedPlugin
                    url_share={this.state.evento.url}
                  />
                </Col>

                <Col md="8" xs="12">
                  <InfoContent
                    evento={this.state.evento.id}
                    etiquetas={JSON.parse(this.state.evento.etiquetas).data}
                    componentes={JSON.parse(this.state.evento.componentes).data}
                    id_cuenta={this.state.evento.id_cuenta}
                  />
                </Col>

                <Col md="4" xs="12" className="">
                  <SideInfo
                    evento={this.state.evento}
                  />
                </Col>

              </Row>
            </div>
            <Footer />
          </>
          :
          <>
            <Load />
          </>
        }
      </div>
    );
  }
}

export default Inicio;