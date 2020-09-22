import EventoModel from '../../models/Eventos';
import MarketingModel from '../../models/Marketing';

class Borrador {

  constructor() {
    this.data = {
      informacion_basica: {},
      ubicacion: {},
      horas: {},
      detalles: { componentes: [] },
      boletos: {}
    }
  }



  get_info_event = async (id_evento) => {

    const peticion = () => {
      return new EventoModel().get_info_basica(id_evento)
        .then(r => r.data)
        .then(r => {
          const id_evento = r.id;
          let date_ini = r.fecha_hora_inicio.split("T");
          let fecha_ini = r.fecha_hora_inicio.split("T")[0];
          let hora_ini = date_ini[1].split("-")[0];

          let date_fin = r.fecha_hora_fin.split("T");
          let fecha_fin = r.fecha_hora_fin.split("T")[0];
          let hora_fin = date_fin[1].split("-")[0];
          /*         
                    this.setState({
                      id_evento: id_evento,
                      nombre_imagen: r.nombre_imagen, nombre: r.nombre, resumen: r.resumen, tipo_ubicacion: r.tipo_ubicacion,
                      fecha_inicio: fecha_ini, fecha_fin: fecha_fin, hora_inicio: hora_ini, hora_fin: hora_fin,
                      found: true
                    }) */

          this.data.informacion_basica.id = id_evento;
          this.data.informacion_basica.nombre = r.nombre;
          this.data.informacion_basica.tipo = r.tipo;
          this.data.informacion_basica.categoria = r.categoria;
          this.data.informacion_basica.sub_categoria = r.sub_categoria;

          this.data.horas.fecha_inicial = fecha_ini;
          this.data.horas.fecha_final = fecha_fin;
          this.data.horas.hora_inicial = hora_ini;
          this.data.horas.hora_final = hora_fin;
          this.data.horas.zona_horaria = r.zona_horaria;

          this.data.detalles.resumen = r.resumen;
          this.data.detalles.imagen_principal = r.nombre_imagen;


          //Datos Hoganizador
          return this.get_nombre_organizador(r.id_cuenta)
            .then(organizador => {

              //Etiquetas
              return this.get_etiquetas(id_evento)
                .then(etiquetas => {
                  //Lugar del evento
                  if (r.tipo_ubicacion === 'lugar') {
                    return this.get_lugar(id_evento)
                      .then(lugar => {
                        return this.get_parrafos(id_evento)
                          .then(p => {
                            return this.get_imagenes(id_evento)
                              .then(i => {
                                return this.get_videos(id_evento)
                                  .then(v => {
                                    return this.get_boletos(id_evento)
                                      .then(b => {
                                        return this.data;
                                      })
                                  })
                              })
                          })
                      })
                  }
                  else if (r.tipo_ubicacion === "online") {
                    return this.get_link(id_evento)
                      .then(lugar => {
                        return this.get_parrafos(id_evento)
                          .then(p => {
                            return this.get_imagenes(id_evento)
                              .then(i => {
                                return this.get_videos(id_evento)
                                  .then(v => {
                                    return this.get_boletos(id_evento)
                                      .then(b => {
                                        return this.data;
                                      })
                                  })
                              })
                          })
                      })
                  } else {
                    this.data.ubicacion.tipo_ubicacion = "no";
                    return this.get_parrafos(id_evento)
                      .then(p => {
                        return this.get_imagenes(id_evento)
                          .then(i => {
                            return this.get_videos(id_evento)
                              .then(v => {
                                return this.get_boletos(id_evento)
                                  .then(b => {
                                    return this.data;
                                  })
                              })
                          })
                      })
                  }



                })

            })








          //this.get_boletos(id_evento); 

        }).catch(e => "error")
    }
    return await peticion();

  }

  get_nombre_organizador = async (id_cuenta) => {
    const peticion = () => {
      return new MarketingModel().get_cuenta(id_cuenta)
        .then(r => {
          this.data.informacion_basica.id_organizador = r.data.id;
          this.data.informacion_basica.nombre_organizador = r.data.nombre;
          return true;
        })
        //.then(datos => this.setState({ id_cliente: datos.id_cliente, organizador: datos.nombre, id_cuenta: datos.id }))
        .catch(e => "error")
    }
    return await peticion();
  }

  get_etiquetas = async (id_evento) => {
    const peticion = () => {
      return new EventoModel().get_tags_evento(id_evento)
        .then(etiquetas => {
          this.data.informacion_basica.etiquetas = etiquetas;
          return true;
        })
    }
    return await peticion();
  }

  get_lugar = async (id_evento) => {
    const peticion = () => {
      return new EventoModel().get_lugar_evento(id_evento)
        .then(l => {
          //this.setState({ direccion1: l[0].direccion1, direccion2: l[0].direccion2, codigo_postal: l[0].codigo_postal, ciudad: l[0].ciudad, estado: l[0].estado, pais: l[0].pais, latitud: l[0].latitud, longitud: l[0].longitud })
          this.data.ubicacion.tipo_ubicacion = "lugar";
          this.data.ubicacion.direccion1 = l[0].direccion1;
          this.data.ubicacion.direccion2 = l[0].direccion2;
          this.data.ubicacion.codigo_postal = l[0].codigo_postal;
          this.data.ubicacion.ciudad = l[0].ciudad;
          this.data.ubicacion.estado = l[0].estado;
          this.data.ubicacion.pais = l[0].pais;
          this.data.ubicacion.latitud = l[0].latitud;
          this.data.ubicacion.longitud = l[0].longitud;
          return true;

        })
    }
    return await peticion();
  }

  get_link = async (id_evento) => {
    const peticion = () => {
      return new EventoModel().get_online_evento(id_evento)
        .then(lugar => {
          //this.setState({ link: lugar[0].link })
          this.data.ubicacion.tipo_ubicacion = "online";
          this.data.ubicacion.link = lugar[0].link;
          return true;
        })
    }
    return await peticion();
  }

  get_parrafos = async (id_evento) => {
    const peticion = () => {
      return new EventoModel().get_parrafos_evento(id_evento)
        .then(parrafos => {
          if(parrafos.length !== 0) this.data.detalles.componentes = [...this.data.detalles.componentes, parrafos];
          return true;
        })
    }
    return await peticion();
  }
  get_imagenes = async (id_evento) => {
    const peticion = () => {
      return new EventoModel().get_imagenes_evento(id_evento)
        .then(imagenes => {
          if(imagenes.length !== 0) this.data.detalles.componentes = [...this.data.detalles.componentes, imagenes];
          return true;
        })
    }
    return await peticion();
  }
  get_videos = async (id_evento) => {
    const peticion = () => {
      return new EventoModel().get_videos_evento(id_evento)
        .then(videos => {
          if(videos.length !== 0) this.data.detalles.componentes = [...this.data.detalles.componentes, videos];
          return true;
        })
    }
    return await peticion();
  }

  get_boletos = async (id_evento) => {
    const peticion = () => {
      return new EventoModel().get_boletos_evento(id_evento)
        .then(boletos => {
          //boletos.forEach(boleto => this.get_cantidades_boletos(boleto));
          this.data.boletos = boletos;
          return true;

        })
    }
    return await peticion();
  }

}

export default Borrador;