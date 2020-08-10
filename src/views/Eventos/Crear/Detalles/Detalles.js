import React, { Component } from 'react';
import { Row, Col, Input, Collapse, Button } from 'reactstrap';

import ImageUploader from '../components/ImageUploader.jsx';
import RTE from '../components/RTE.js';
import VideoThumbnail from '../components/Thumbnail';

class Detalles extends Component {


  constructor(props) {
    super(props);

    this.n = 1;
    this.valores = [];

    this.state = {
      toggle_detalles: false,

      resumen: '',
      componentes: [],
    }
  }

  add_parrafo = e => {
    e.preventDefault();
    let arr = this.state.componentes.slice();
    arr.push(<>< RTE
      indx={this.n}
      valores = {this.valores}
    /> </>);
    this.n++;
    this.setState({ componentes: arr });
  }

  add_imagen = e => {
    e.preventDefault();
    let arr = this.state.componentes.slice();
    arr.push(<>< ImageUploader
      indx={this.n}
      valores = {this.valores}
    /> </>);
    this.n++;
    this.setState({ componentes: arr });
  }

  add_video = e => {
    e.preventDefault();
    let arr = this.state.componentes.slice();
    arr.push(<>< VideoThumbnail
      indx={this.n}
      valores = {this.valores}
    /> </>);
    this.n++;
    this.setState({ componentes: arr });
  }

  quitar_componente = e => {
    e.preventDefault();
    this.state.componentes.splice(e.target.id, 1)
    this.setState({componentes:this.state.componentes});
  }


  validar = imagen => {
    if (imagen === '' || this.state.resumen === '') {
      alert("Debe agregar los detalles obligatorios");
      return false;
    }
    return true;
  }

  get_datos = () => {
    
    const imagen = this.image_prin.get_imagefile();

    if (!this.validar(imagen)) {
      return undefined;
    }

    return {
      imagen: imagen,
      resumen: this.state.resumen,
      componentes: this.valores
    }

  }

  reiniciar = () => {
    this.n = 1;
    this.valores = [];

    this.setState({
      toggle_detalles: false,
      resumen: '',
      componentes: [],
    }, () => {
        
        document.getElementById("resumen").value = "";
        this.image_prin.reiniciar();
    })
  }

  render() {
    return (
      <Col md="9" xs="12" className="mx-auto">
        <p className="h3 mb-4"><b><i className="fa fa-asterisk"></i> Detalles</b>
          <i
            className={`fa fa-${this.state.toggle_detalles === false ? "chevron-down" : "chevron-up"} float-right p-1`}
            style={{ cursor: "pointer" }}
            onClick={e => this.setState({ toggle_detalles: !this.state.toggle_detalles })}
          ></i>
        </p>
        <Collapse isOpen={this.state.toggle_detalles}>
          <Row>
            <Col md="11" xs="12" className="mx-auto">
              <span className="h5">Imagen Principal*</span><br />
              <br />
              <ImageUploader
                ref={element => { this.image_prin = element }}
              />
              <br />
              <span className="h5">Resumen del evento*</span>
              <Input
                id="resumen"
                onChange={e => this.setState({ resumen: e.target.value })}
                className="mt-2" style={{ height: "80px" }} type="textarea" placeholder="describe de que tratara el evento" /><br />

              <span className="h5">Incluye mas textos imagenes o videos (opcional)</span><br /><br />

              {this.state.componentes.map((component, i) => {
                return (
                  <div  key={i}>
                    <Row>
                      <Col md="12">
                        {component}<br />
                        <Col md="5" xs="8" className="rounded mx-auto">
                          <Button id={i}
                            onClick={this.quitar_componente}
                            block color="danger" ><i className="fa fa-trash"></i> Quitar Componente</Button>
                        </Col>
                      </Col>
                    </Row>
                    <hr />
                  </div>
                );
              })}
              <Row>
                <Col className="mx-auto p-2">
                  <Button onClick={this.add_parrafo} block color="primary" className="h6 border "> <i className="fa fa-paragraph"></i> Añade un Parrafo</Button>
                </Col>
                <Col className="mx-auto p-2">
                  <Button onClick={this.add_imagen} block color="primary" className="h6"> <i className="fa fa-picture-o"></i> Añade una Imagen</Button>
                </Col>
                <Col className="mx-auto p-2">
                  <Button onClick={this.add_video} block color="primary" className="h6"> <i className="fa fa-video-camera"></i> Añade un Video</Button>
                </Col>
              </Row>




            </Col>
          </Row>
        </Collapse>
      </Col>
    );
  }
}

export default Detalles;