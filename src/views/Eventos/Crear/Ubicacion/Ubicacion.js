import React, { Component } from 'react';
import { Row, Col, Input, Collapse, FormGroup, CustomInput } from 'reactstrap';

import AutocompleteInput from './Autocomplete.js';
import Mapa from './Mapa.js';

class Ubicacion extends Component {

  state = {
    toggle_ubucaion: false,
    tipo_evento: '',
    placeholder: '',
    show_inputs: false,
    find_manual: true,
    looking: false,
    lat: 0,
    lng: 0,

  }

  select_place = lugar_json => {

    this.setState({ ubicacion: lugar_json, show_inputs: true, looking: true }, () => {
      let direccion = "";
      if (lugar_json.calle) direccion += `Calle ${lugar_json.calle} `;
      if (lugar_json.numero) direccion += `#${lugar_json.numero} `;
      if (lugar_json.colonia) direccion += `Col. ${lugar_json.colonia} `;

      if (direccion !== "") document.getElementById("direccion-1").value = direccion;
      else {
        document.getElementById("direccion-1").placeholder = ""
        document.getElementById("direccion-2").placeholder = ""

      };

      if (lugar_json.ciudad) document.getElementById("ciudad").value = lugar_json.ciudad;
      else document.getElementById("ciudad").placeholder = "";

      if (lugar_json.estado) document.getElementById("estado").value = lugar_json.estado;
      else document.getElementById("estado").placeholder = "";

      if (lugar_json.codigo_postal) document.getElementById("codigo-postal").value = lugar_json.codigo_postal;
      else document.getElementById("codigo-postal").placeholder = "";

      if (lugar_json.pais) document.getElementById("pais").value = lugar_json.pais;
      else document.getElementById("pais").placeholder = "";


      this.setState({ lat: lugar_json.latitud, lng: lugar_json.longitud });
    })

  }


  validar = (d1, d2, c, e, p, cp) => {

    if (d1 === '' || c === '' || e === '' || p === '' || cp === '') {
      alert("Debe llenar todos los campos de ubicación(los campos con * son obligatorios)");
      return false;
    }
    return true;

  }

  get_datos = () => {

    if (this.state.tipo_evento === '') {
      alert("Debe seleccionar un tipo de ubicación");
      return undefined;
    }

    if (this.state.tipo_evento === 'lugar') {
      //validacion    

      try {
        const direccion1 = document.getElementById("direccion-1").value;
        let direccion2 = document.getElementById("direccion-2").value;
        if (direccion2 === '') direccion2 = "-";
        const ciudad = document.getElementById("ciudad").value;
        const estado = document.getElementById("estado").value;
        const pais = document.getElementById("pais").value;
        const codigo_postal = document.getElementById("codigo-postal").value;

        if (!this.validar(direccion1, direccion2, ciudad, estado, pais, codigo_postal)) {
          return undefined;
        }


        return {
          direccion1: direccion1,
          direccion2: direccion2,
          ciudad: ciudad,
          estado: estado,
          pais: pais,
          codigo_postal: codigo_postal,
          latitud: this.state.lat,
          longitud: this.state.lng,
          tipo_ubicacion: this.state.tipo_evento,
        }
      } catch (e) {
        alert("Debe buscar una ubicación");
        return undefined;
      }


    } else {

      const link = document.getElementById("link").value;
      if (link === '') {
        alert("Debes agregar un link del evento online");
        return undefined;
      }
      return {
        tipo_ubicacion: this.state.tipo_evento,
        link: link
      }

    }
  }

  reiniciar = () => {
    try {
      document.getElementById("direccion-1").value = "";
      document.getElementById("direccion-2").value = "";
      document.getElementById("ciudad").value = "";
      document.getElementById("estado").value = "";
      document.getElementById("pais").value = "";
      document.getElementById("codigo-postal").value = "";
      document.getElementById("exampleCustomSwitch").checked = false;
    } catch (e) {
      try {
        document.getElementById("link").value = "";
        document.getElementById("exampleCustomSwitch2").checked = false;
      } catch (er) {
        document.getElementById("exampleCustomSwitch").checked = false;
        document.getElementById("exampleCustomSwitch2").checked = false;
      }
    }

    this.setState({
      toggle_ubucaion: false,
      tipo_evento: '',
      placeholder: '',
      show_inputs: false,
      find_manual: true,
      looking: false,
      lat: 0,
      lng: 0,
    })
  }

  render() {
    return (
      <Col md="9" xs="12" className="mx-auto"><p className="h3 mb-4">
        <b><i className="fa fa-map"></i> Ubicaión</b>
        <i
          className={`fa fa-${this.state.toggle_ubucaion === false ? "chevron-down" : "chevron-up"} float-right p-1`}
          style={{ cursor: "pointer" }}
          onClick={e => this.setState({ toggle_ubucaion: !this.state.toggle_ubucaion })}
        ></i>
      </p>
        <Collapse isOpen={this.state.toggle_ubucaion}>
          <Row>
            <Col className="mx-auto" md="9" xs="12">
              <Row>
                <Col className="mx-auto" md="6" xs="6">
                  <FormGroup>
                    <div className="mx-auto">
                      <CustomInput
                        className="h5"
                        onClick={e => this.setState({ tipo_evento: "lugar", placeholder: "..." })}
                        type="radio" id="exampleCustomSwitch" name="customSwitch" label="Lugar"
                      />

                    </div>
                  </FormGroup>
                </Col>
                <Col className="mx-auto" md="6" xs="6">
                  <FormGroup>
                    <div>
                      <CustomInput
                        className="h5"
                        onClick={e => this.setState({ tipo_evento: "online", placeholder: "Enlace, pagina, link ..." })}
                        type="radio" id="exampleCustomSwitch2" name="customSwitch" label="Evento en linea"
                      />
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col className="mx-auto" md="12" xs="12">

                  {this.state.tipo_evento === 'lugar' ?
                    <>

                      {this.state.find_manual ?
                        <>
                          <AutocompleteInput
                            select_place={this.select_place}
                            isMarkerShown={false}
                          />
                          <br />
                        </>
                        :
                        <></>
                      }

                      {this.state.show_inputs ?
                        <Row>
                          <Col md="12" xs="12" className="mx-auto">
                            <span className="h5">Direccion 1*</span>
                            <Input

                              onChange={e => this.setState({ direccion1: e.target.value })}
                              id="direccion-1" className="mt-2" type="text" placeholder="Ej. Calle (#) Col."
                            /><br />
                          </Col>
                          <Col md="12" xs="12" className="mx-auto">
                            <span className="h5">Direccion 2 (Op)</span>
                            <Input
                              onChange={e => this.setState({ direccion2: e.target.value })}
                              id="direccion-2" className="mt-2" type="text" placeholder="Ej. Departamento... "
                            /><br />
                          </Col>
                          <Col md="6" xs="12" className="mx-auto">
                            <span className="h5">Ciudad*</span>
                            <Input
                              onChange={e => this.setState({ ciudad: e.target.value })}
                              id="ciudad" className="mt-2" type="text" placeholder="Ej. CDMX "
                            /><br />
                          </Col>
                          <Col md="6" xs="12" className="mx-auto">
                            <span className="h5">Estado/Provincia*</span>
                            <Input
                              onChange={e => this.setState({ estado: e.target.value })}
                              id="estado" className="mt-2" type="text" placeholder="Ej. Ciudad de México "
                            /><br />
                          </Col>
                          <Col md="6" xs="12" className="mx-auto">
                            <span className="h5">Código Postal*</span>
                            <Input
                              onChange={e => this.setState({ codigo_postal: e.target.value })}
                              id="codigo-postal" className="mt-2" type="text" placeholder="Ej. 07550 "
                            /><br />
                          </Col>
                          <Col md="6" xs="12" className="mx-auto">
                            <span className="h5">Pais*</span>
                            <Input
                              onChange={e => this.setState({ pais: e.target.value })}
                              id="pais" className="mt-2" type="text" placeholder="Ej. México "
                            /><br />
                          </Col>

                        </Row>
                        :
                        <></>
                      }

                      {!this.state.looking ?
                        <Col md="12" className="text-center">
                          <CustomInput type="switch" id="manualente-switch" name="manualente"
                            onChange={e => this.setState({ find_manual: !this.state.find_manual, show_inputs: !this.state.show_inputs })}
                            label="Sino se ecuetra la ubicacion cercana agrega los espacion manualmente" />
                        </Col>
                        :
                        <>
                          <Row>
                            <Col md="12">
                              <Mapa
                                lat={this.state.lat}
                                lng={this.state.lng}
                              />
                            </Col>
                          </Row>
                          <br />
                          <Col md="12" className="text-center">
                            <span><i>Sino se ecuetra la ubicacion cercana agrega los espacion manualmente</i></span>
                          </Col>


                        </>
                      }

                    </>
                    :
                    <Input type="url" id="link"

                      placeholder={this.state.placeholder}
                    />
                  }
                </Col>
              </Row>

            </Col>

          </Row>
        </Collapse>
      </Col>
    );
  }
}

export default Ubicacion;