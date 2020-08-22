import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button } from 'reactstrap';
import axios from 'axios';

import Evento_Model from '../../../models/Eventos.js'


import NavBar from '../components/NavBar.js';
import InformacionBasica from './InformacionBasica/InformacionBasica.js'
import Ubicacion from './Ubicacion/Ubicacion.js'
import Fechas from './Horario/Fecha_Hora.js'
import Detalles from './Detalles/Detalles.js'
import Boletos from './Boletos/Boletos.js'

class Crear extends Component {


  componentDidMount = () => window.onbeforeunload = () => '';
  

  componentWillUnmount = () => window.onbeforeunload = () => { };

  validar = e => {
    e.preventDefault();

    const datos_basicos = this.InformacionBasica.get_datos();
    if (datos_basicos !== undefined) {
      const datos_ubicacion = this.ubicacion.get_datos();
      if (datos_ubicacion !== undefined) {
        const datos_horas = this.fecha_hora.get_datos();
        if (datos_horas !== undefined) {
          const datos_detalles = this.detalles.get_datos();
          if (datos_detalles !== undefined) {
            const boletos = this.boletos.get_boletos();
            if (boletos !== undefined) {
              this.crear_evento(datos_basicos, datos_ubicacion, datos_horas, datos_detalles, boletos);  
            } 
          }
        }
      }
    }
  }

  crear_evento = (datos_basicos, datos_ubicacion, datos_horas, datos_detalles,boletos) => {

    const id_cliente = require('store').get('usuario_guardado').id_cliente;
    const id_cuenta = require('store').get('cuenta_en_uso').id;
    //Subir la imagen del evento en el servidor
    new Evento_Model().upluad_image_principal(id_cliente,id_cuenta,datos_detalles.imagen)
      .then(r => {
        //Crear info básica(nombre, tipo, categoria, sub_categoria, tipo_ubicacion,fecha_hora_inicio,fecha_hora_fin,zona_horaria,imagen,resumen,cuenta)
        return {
          nombre: datos_basicos.nombre, tipo: datos_basicos.tipo, categoria: datos_basicos.categoria, sub_categoria: datos_basicos.sub_categoria,
          tipo_ubicacion: datos_ubicacion.tipo_ubicacion,
          fecha_hora_inicio: datos_horas.fecha_hora_inicio, fecha_hora_fin: datos_horas.fecha_hora_fin,
          zona_horaria: datos_horas.zona_horaria,
          directorio_imagen: r.directorio, nombre_imagen: r.nombre,
          resumen: datos_detalles.resumen, id_cuenta: id_cuenta
        }
      })
      .then(datos => new Evento_Model().crear_evento(datos))
      .then(r => r.data)
      .then(evento => {

        //Verificar si existen etiquetas
        this.agregar_etiquetas(datos_basicos, evento.id);

        //Crear la ubicacion Lugar() Online()
        if (datos_ubicacion.tipo_ubicacion === 'lugar') {
          new Evento_Model().add_lugar_evento(
            evento.id, datos_ubicacion.direccion1, datos_ubicacion.direccion2, datos_ubicacion.ciudad,
            datos_ubicacion.estado, datos_ubicacion.codigo_postal, datos_ubicacion.pais,
            datos_ubicacion.latitud, datos_ubicacion.longitud
          ).then(r => this.ubicacion.reiniciar())
        } else {
          new Evento_Model().add_ubicacion_link_evento(evento.id,datos_ubicacion.link).then(r=>this.ubicacion.reiniciar())
        }

        //Comprovar si existen items imagenes, parrafos, videos
        const len = datos_detalles.componentes.length -1;
        if(datos_detalles.componentes.length === 0) this.detalles.reiniciar();
        datos_detalles.componentes.forEach((c,i) => {
          if (c.valor !== '') {
          
            if (c.tipo_component === "parrafo") {//Parrafo
              new Evento_Model().add_parrafo_evento(evento.id, c.valor,c.posicion).then(r => {
                if (i === len) this.detalles.reiniciar();
              });
            } else if (c.tipo_component === "imagen") {//Imagen
              new Evento_Model().upluad_image_extra(id_cliente, id_cuenta, evento.id, c.valor)
                .then(res => {
                  new Evento_Model().add_imagen_evento(evento.id, res.directorio, res.nombre,c.posicion).then(r => {
                    if (i === len) this.detalles.reiniciar();
                  });
                })

            } else if (c.tipo_component === "video") {//Video
              new Evento_Model().add_video_evento(evento.id, c.valor,c.posicion).then(r => {
                if (i === len) this.detalles.reiniciar();
              });
            }
          }
        });


        //Guardar los boletos que existan boleto()

        boletos.forEach((b, i) => {
          new Evento_Model().add_boleto_evento(
            evento.id, b.tipo_boleto, b.nombre, b.cantidad, b.precio, b.descripcion, b.cantidad_minima,
            b.cantidad_maxima, b.canal_de_ventas
          )
            .then(r => {
              if (i === (boletos.length - 1)) this.boletos.reiniciar();
            })
        })
        alert("Agregado correctamente");
        window.scrollTo(0, 0);
        this.InformacionBasica.reiniciar();
        this.fecha_hora.reiniciar();

      })
      .catch(console.log)

  }

  agregar_etiquetas = (datos_basicos,id_evento) => {
    datos_basicos.etiquetas.forEach(etiqueta => {
      new Evento_Model().add_etiqueta_evento(etiqueta, id_evento).then(r=>r);
    });
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
                <Row>

                  {/* //Informacion Basica */}
                  <InformacionBasica
                    ref={element => { this.InformacionBasica = element }}
                  />

                </Row>
                <hr />
                <Row>
                  {/* Ubicacion */}
                  <Ubicacion
                    ref={element => { this.ubicacion = element }}
                  />
                </Row>

                <hr />
                <Row>
                  {/* FechaHora */}
                  <Fechas
                    ref={element => { this.fecha_hora = element }}
                  />
                </Row>

                <hr />
                <Row>
                  {/* Detalles */}
                  <Detalles
                    ref={element => { this.detalles = element }}
                  />
                </Row>

                <hr />
                <Row>
                  {/* Boletos */}
                  <Boletos
                    ref={element => { this.boletos = element }}
                  />
                </Row>
                <hr />
                <br />

                <Row>
                  <Col md="5" xs="12" className="mx-auto p-0">
                    <Button block color="success"
                      type="button"
                      onClick={this.validar}
                    > Crear Evento </Button>
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

export default Crear;