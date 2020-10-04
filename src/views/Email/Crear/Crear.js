import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';
//import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

import DatosIniciales from './Hooks/DatosPrincipales';
import Plantillas from './Hooks/Plantillas';
import Boletin from './Hooks/Boletin';
import Grupos from './Hooks/Grupos';

import Model_Email from '../../../models/EmailMarketing';
import Model_Contactos from '../../../models/Contactos';
import Variables from '../../../variables/global';
import URLs from '../../../models/urls';



class Boletines extends Component {

  state = {
    plantilla: '',

    datosIniciales: '',
    grupos: '',
    boletin: '',
  }

  setPlantilla = plantilla => this.setState({ plantilla: plantilla });
  setDatosIniciales = datos => this.setState({ datosIniciales: { ...this.state.datosIniciales, ...datos } });
  setGrupos = grupos => this.setState({ grupos: grupos });
  setBoletin = contenido => this.setState({ boletin: contenido });

  validar = () => {
    if (this.state.datosIniciales === '' || this.state.grupos === '' || this.state.boletin === '' || this.state.grupos.length === 0) return undefined;
    if (!this.state.datosIniciales.programacion) return undefined;
    if (this.state.datosIniciales.programacion === 'programar') {
      if (!this.state.datosIniciales.fecha || !this.state.datosIniciales.hora) return undefined;
    }
    return true;
  }

  enviar = e => {
    e.preventDefault();
    if (!this.validar()) {
      alert("Debe agregart toda la informacion");
      return;
    }

    const contenido_main = this.state.boletin;
    let refs = this.state.boletin.split('href="');
    let links = [];

    //Recorrer los links y subir el link
    refs.forEach((ref, indx) => {
      if (indx !== 0) links.push(ref.split('"')[0]);
    })

    //Acomodar los id de los grupos;
    let grupos_ids = [];
    let str_grupos_ids = '';
    this.state.grupos.forEach(grupo => { grupos_ids.push(grupo.id); str_grupos_ids += `${grupo.id},` });

    //Subir el Boletin para tener su id y verificar si sera programado
    const tipo = this.state.datosIniciales.programacion === 'programar' ? "programado" : "enviado";
    const estatus = this.state.datosIniciales.programacion === 'programar' ? "por enviar" : "enviado"; //CAMBIAR PARA QUE ACTUALISE CUANDO CAMBIE
    const id_cuenta = require('store').get("cuenta_en_uso").id;
    new Model_Email().add_boletin(this.state.datosIniciales.asunto, tipo, contenido_main, estatus, id_cuenta)
      .then(boletin => {
        if (boletin === 'error') return;
        //Ver si es programada la envia 
        if (this.state.datosIniciales.programacion === 'programar') {
          let grupos_id = "";
          this.state.grupos.forEach(grupo => grupos_id += `${grupo.id},`);
          new Model_Email().add_programacion_boletin(this.state.datosIniciales.fecha, this.state.datosIniciales.hora, boletin.id, grupos_id)
            .then(resp => {
              if (resp !== "error") {
                alert("Programado con exito");
                this.props.history.push('/emailmarketing')
              }
            })

        } else {
          new Model_Email().add_links(links, boletin.id)
            .then(promises => Promise.all(promises))
            .then(links_data => {
              new Model_Contactos().getContactosDelLosGrupos(grupos_ids)
                .then(promises_contactos => Promise.all(promises_contactos))
                .then(arr => { return { links_data: links_data, grupos_contactos: arr } })
                .then(datos_json => {

                  return datos_json.grupos_contactos.map((grupo, i) => {
                    return grupo.map((contacto, j) => {
                      let html = contenido_main;
                      //verificar si hay variables globales
                      const keys = new Variables().key_words_boletin();
                      keys.forEach(key => {
                        if (key.key === '{{{remitente}}}') html = html.replace("{{{remitente}}}", contacto.contacto.nombre, "gi");
                        else html = html.replace(`${key.key}`, `${key.valor}`, "gi");
                      });

                      //Dar el link que se subio
                      datos_json.links_data.forEach(link => {
                        html = html.replace(`${link.link}`, `${new URLs().supporserver()}/email/seen-link-by/?contacto=${contacto.contacto.id}&link=${link.id}`);
                      })
                      let boletin_id = boletin.id;
                      html = html + " " + `<img src="${new URLs().supporserver()}/email/seen-boletin-by/?contacto=${contacto.contacto.id}&boletin=${boletin_id}" width="1" height="1" />`;
                      //Enviar a servidor nodemailer
                      return new Model_Email().send_email(contacto.contacto.correo, html, this.state.datosIniciales.asunto)
                        .then(respuesta => {
                          //Retornar el final
                          return { respuesta: respuesta, id_contacto: contacto.contacto.id, id_boletin: boletin.id }
                        })

                    })
                  });
                })
                .then(promises_complete => promises_complete.reduce((acc, el) => acc.concat(el), []))
                .then(completes_arr => Promise.all(completes_arr))
                .then(completes => {
                  if (completes.length > 0) {
                    let ids_contactos_enviados = "";
                    completes.forEach(respon => { if (respon.respuesta) ids_contactos_enviados += `${respon.id_contacto},`; })
                    new Model_Email().add_envios_boletines(ids_contactos_enviados,str_grupos_ids, completes[0].id_boletin)
                      .then(estatusT => {
                        if (estatusT === 'Created') {
                          alert("Enviados");
                          this.props.history.push('/emailmarketing');
                        }
                      })
                  }
                })
                .catch(console.log)
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => "error")



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
              <CardBody>
                {/* Titulo */}
                <Row>
                  <Col md="12">
                    <p className="h3 m-0"><b>Crea un nuevo boletin</b></p>
                    <p className="text-muted">Solo sigue los siguientes pasos</p>
                  </Col>
                </Row>
                <br />
                <br />
                {/* Paso 1 Seleccionar asunto */}
                <Row>
                  <Col md="12" >
                    <p className="h5"><b> <span className="h2">①</span> Agrega los datos principales </b></p>
                    <hr />
                  </Col>

                  <DatosIniciales
                    event_setDatos={this.setDatosIniciales}
                  />

                </Row>

                <br />
                {/* Paso 2 Seleccionar plantilla */}
                <Row>
                  <Col md="12" >
                    <p className="h5"><b> <span className="h2">②</span> Selecciona una plantilla </b>
                      <i className="fa fa-plus-square text-success" aria-hidden="true"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => { this.setState({ open_add_platilla: !this.state.open_add_platilla }) }}
                      ></i>
                    </p>
                    <hr />
                  </Col>


                  <Plantillas
                    plantilla={this.state.plantilla}
                    event_setPlantilla={this.setPlantilla}
                  />

                </Row>

                {/* Paso 3 Crear el boletin */}
                <Row>
                  <Col md="12" >
                    <p className="h5"><b> <span className="h2">③</span> Crea el Boletin </b></p>
                    <hr />
                  </Col>

                  <Boletin
                    plantilla={this.state.plantilla}
                    event_setPlantilla={this.setPlantilla}
                    event_setBoletin={this.setBoletin}
                  />
                </Row>

                {/* Paso 4 Seleccionar el grupo de contactos a enviar */}
                <Row>
                  <Col md="12" >
                    <p className="h5"><b> <span className="h2">④</span> Selecciona el grupo de contactos al que se le enviara el boletin</b> </p>
                    <hr />
                  </Col>

                  <Grupos
                    plantilla={this.state.plantilla}
                    event_setGrupos={this.setGrupos}
                  />
                </Row>

                {/* Paso 5 Envia el evento */}

                <Row className="mt-4">
                  <Col md="5" xs="9" className="mx-auto p-0">
                    <Button block color="primary" > Guardar </Button>
                  </Col>
                  <Col md="5" xs="9" className="mx-auto p-0">
                    <Button block color="success" onClick={this.enviar} > Enviar </Button>
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