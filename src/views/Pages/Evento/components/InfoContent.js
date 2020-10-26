import React, { Component } from 'react';
import { Col, Row, Badge } from 'reactstrap';
import YouTube from 'react-youtube';

import Parser from 'html-react-parser';

class InfoContent extends Component {

  state = {
    componentes: []
  }

  acodar_componentes = () => {
    let componentes = [...this.props.parrafos, ...this.props.imagenes, ...this.props.videos];

    let arr = [];
    const len = componentes.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if ((i + 1) === componentes[j].posicion) {
          arr.push(componentes[j]);
          break;
        }
      }
    }

    this.setState({ componentes: arr });
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  render() {
    return (
      <Row>
        <Col md="12" className="pl-5 pt-2 pr-5">
          <hr />
          <p className="h5">Sobre este evento</p>
          <hr /><br />

          {this.state.componentes.map((componente, i) => {
            if (componente.parrafo) {

              return (
                <div key={i}>
                  {Parser(componente.parrafo)}
                  <br />
                </div>
              );
            } else if (componente.nombre_imagen) {
              return (
                <Row key={i} className="mb-4">
                  <Col md="8" sm="9" xs="12" className="mx-auto">
                    <img
                      style={{ width: "100%" }}
                      //src={process.env.PUBLIC_URL + `/eventos/${this.props.id_cliente}/${this.props.id_cuenta}/${componente.id_evento}/${componente.nombre_imagen}`}
                      src={`http://localhost:7777/ev/getimg/?imagen=${componente.nombre_imagen}&evento=${this.props.evento}`}
                    />
                  </Col>
                </Row>
              );
            } else if (componente.link) {
              try {
                let video_id = componente.link.split('v=')[1];
                let ampersandPosition = video_id.indexOf('&');
                if (ampersandPosition != -1) {
                  video_id = video_id.substring(0, ampersandPosition);
                  this.setState({ id: video_id });
                }
                return (
                  <div key={i}>
                    <Row key={i} className="mb-4">
                      <Col md="8" sm="9" xs="12" className="mx-auto">
                        <YouTube containerClassName="mx-auto d-block" videoId={video_id} opts={{ height: '240px', width: '100%', playerVars: { autoplay: 1, } }} onReady={this._onReady} />
                      </Col>
                    </Row>
                  </div>
                );
              } catch (error) {
                return (
                  <div key={i}>
                    <Row key={i} className="mb-4">
                      <Col md="8" sm="9" xs="12" className="mx-auto text-center">
                        <span className="h5" ><b>Link de Video:</b> {componente.link}</span>
                      </Col>
                    </Row>
                  </div>
                );
              }
            }
          })}

          <br /><hr />
          <p className="h5">Etiquetas</p>
          <hr />

          <Row>
            <Col md="12">
              <Row className="">
                {this.props.etiquetas.map((e, i) => {
                  return (
                    <Col key={i} className=" m-2 mx-auto">
                      <Badge style={{ fontSize: "12px" }} color="white" className=" border border-primary p-2">#{e.palabra} </Badge>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row><br />


        </Col>
      </Row>
    );
  }

}

export default InfoContent;