import axios from 'axios';
import URLs from './urls';


class Eventos {

  upluad_image_principal = async (id_cliente, id_cuenta, file) => {

    let bodyFromData = new FormData();
    bodyFromData.append('cliente', id_cliente);
    bodyFromData.append('cuenta', id_cuenta);
    bodyFromData.append('file', file, file.name);



    const peticion = () => {
      if (file === '-') return "no image";
    
      return axios.post(`${new URLs().supporserver()}/ev/upload-image`, bodyFromData)
        .then(r => r.data)
        .catch(e => e)

    }
    return await peticion();
  }

  crear_evento = async (datos) => {
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/evento/`, datos)
        .then(r => r)
        .catch(e => e)
    }
    return await peticion();
  }

  add_etiqueta_evento = async (palabra, id_evento) => {
    const datos = { palabra: palabra, id_evento: id_evento }
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/tags-evento/`, datos)
        .then(r => r)
        .catch(e => e)
    }
    return await peticion();
  }

  add_lugar_evento = async (id_evento, direccion1, direccion2, ciudad, estado, cp, pais, latitud, longitud) => {
    const datos = {
      direccion1: direccion1, direccion2: direccion2, ciudad: ciudad, estado: estado, codigo_postal: cp,
      pais: pais, latitud: latitud, longitud: longitud, id_evento: id_evento
    }
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/lugar-evento/`, datos)
        .then(r => r)
        .catch(e => e)
    }
    return await peticion();
  }

  add_ubicacion_link_evento = async (id_evento, link) => {
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/online-evento/`, { id_evento: id_evento, link: link })
        .then(r => r)
        .catch(e => e)
    }
    return await peticion();
  }

  add_boleto_evento = async (id_evento, tipo, nombre, cantidad_total, precio, descripcion, cantidad_min, cantidad_max, canal) => {
    const datos = {
      tipo: tipo, nombre: nombre, cantida_total: cantidad_total, precio: precio, descripcion: descripcion, cantidad_minima: cantidad_min,
      cantidad_maxima: cantidad_max, canal_ventas: canal, id_evento: id_evento
    }
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/boleto-evento/`, datos)
        .then(r => r)
        .catch(e => e)
    }
    return await peticion();
  }

  upluad_image_extra = async (id_cliente, id_cuenta, id_evento, file) => {

    let bodyFromData = new FormData();
    bodyFromData.append('cliente', id_cliente);
    bodyFromData.append('cuenta', id_cuenta);
    bodyFromData.append('evento', id_evento);
    bodyFromData.append('file', file, file.name);

    const peticion = () => {
      return axios.post(`${new URLs().supporserver()}/ev/upload-image`, bodyFromData)
        .then(r => r.data)
        .catch(e => e)
    }
    return await peticion();
  }

  add_parrafo_evento = async (id_evento, parrafo, posicion) => {
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/parrafo-evento/`, { id_evento: id_evento, parrafo: parrafo, posicion: posicion })
        .then(r => r)
        .catch(e => e)
    }
    return await peticion();
  }

  add_imagen_evento = async (id_evento, directorio, nombre, posicion) => {
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/imagen-evento/`, { id_evento: id_evento, directorio_imagen: directorio, nombre_imagen: nombre, posicion: posicion })
        .then(r => r)
        .catch(e => e)
    }
    return await peticion();
  }

  add_video_evento = async (id_evento, link, posicion) => {
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/video-evento/`, { id_evento: id_evento, link: link, posicion: posicion })
        .then(r => r)
        .catch(e => e)
    }
    return await peticion();
  }


  get_info_basica = async (id_evento) => {
    const peticion = () => {
      return axios.get(`${new URLs().getUrlPrincipal()}/api/evento/${id_evento}/`)
        .then(r => r)
        .catch(e => "error")
    }

    return await peticion();
  }

  get_tags_evento = async (id_evento) => {
    const peticion = () => {
      return axios.get(`${new URLs().getUrlPrincipal()}/api/tags-evento/?id_evento=${id_evento}`)
        .then(r => r.data)
        .catch(e => e)
    }
    return await peticion();
  }

  get_lugar_evento = async (id_evento) => {
    const peticion = () => {
      return axios.get(`${new URLs().getUrlPrincipal()}/api/lugar-evento/?id_evento=${id_evento}`)
        .then(r => r.data)
        .catch(e => e)
    }
    return await peticion();
  }

  get_online_evento = async (id_evento) => {
    const peticion = () => {
      return axios.get(`${new URLs().getUrlPrincipal()}/api/online-evento/?id_evento=${id_evento}`)
        .then(r => r.data)
        .catch(e => e)
    }
    return await peticion();
  }
  get_parrafos_evento = async (id_evento) => {
    const peticion = () => {
      return axios.get(`${new URLs().getUrlPrincipal()}/api/parrafo-evento/?id_evento=${id_evento}`)
        .then(r => r.data)
        .catch(e => e)
    }
    return await peticion();
  }

  get_imagenes_evento = async (id_evento) => {
    const peticion = () => {
      return axios.get(`${new URLs().getUrlPrincipal()}/api/imagen-evento/?id_evento=${id_evento}`)
        .then(r => r.data)
        .catch(e => e)
    }
    return await peticion();
  }

  get_videos_evento = async (id_evento) => {
    const peticion = () => {
      return axios.get(`${new URLs().getUrlPrincipal()}/api/video-evento/?id_evento=${id_evento}`)
        .then(r => r.data)
        .catch(e => e)
    }
    return await peticion();
  }

  get_boletos_evento = async (id_evento) => {
    const peticion = () => {
      return axios.get(`${new URLs().getUrlPrincipal()}/api/boleto-evento/?id_evento=${id_evento}`)
        .then(r => r.data)
        .catch(e => e)
    }
    return await peticion();
  }


  post_oxxo_pay = async (datos) => {
    const peticion = () => {
      
      return axios.post(`${new URLs().supporserver()}/ev/pago-oxxo`, datos, {
        headers:{"Content-Type": "application/json"}
      })
        .then(r => r.data.result)
        .catch(e => e)
    }
    return await peticion();
  }

  post_card_pay = async (datos) => {
    const peticion = () => {
      return axios.post(`${new URLs().supporserver()}/ev/pago-card`,datos,{
        headers:{"Content-Type": "application/json"}
      })
        .then(r => r.data.result)
        .catch(e => e)
    }
    return await peticion();
  }


  add_asistente_evento = async (correo, nombre, tel, metodo_pago, monto, estatus, id_evento) => {
    if (metodo_pago === '') metodo_pago = "ninguno";
    const datos ={ correo:correo, nombre: nombre, telefono: tel, metodo_pago: metodo_pago, monto_total: monto, estatus_pago:estatus, id_evento:id_evento  }
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/asistente-evento/`,datos)
        .then(r => r.data)
        .catch(e => e)
    }
    return await peticion();
  }

  add_boleto_asistente_evento = async (id_asistencia, id_boleto, cantidad) => {
    const datos ={id_asistencia:id_asistencia,id_boleto:id_boleto, cantidad:cantidad }
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/boleto-asistente-evento/`,datos)
        .then(r => r.data)
        .catch(e => e)
    }
    return await peticion();
  }

  add_detalles_oxxo_evento = async (id_asistencia, referencia) => {
    const datos ={id_asistencia: id_asistencia, numero_referencia: referencia}
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/detalles-oxxo-pay-evento/`,datos)
        .then(r => r.data)
        .catch(e => e)
    }
    return await peticion();
  }

  add_detalles_card_evento = async (id_asistencia, id_pago, id_orden) => {
    const datos = { id_asistencia: id_asistencia, id_pago:id_pago, id_orden:id_orden}
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/detalles-card-pay-evento/`,datos)
        .then(r => r.data)
        .catch(e => e)
    }
    return await peticion();
  }

  add_donacion_evento = async (id_asistencia, monto) => {
    const datos ={id_asistencia: id_asistencia, monto:monto}
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/donacion_evento/`,datos)
        .then(r => r.data)
        .catch(e => e)
    }
    return await peticion();
  }

  get_boleto = async(id_boleto) => {
    const peticion = () => {
      return axios.get(`${new URLs().getUrlPrincipal()}/api/boleto-evento/${id_boleto}/`)
        .then(r => r.data)
        .catch(e => e)
    }
    return await peticion();
  }

  get_cantidad_boletos_vendidos = async(id_boleto) => {
    const peticion = () => {
      return axios.get(`${new URLs().getUrlPrincipal()}/api/boleto-asistente-evento/?id_boleto=${id_boleto}`)
        .then(r => r.data)
        .catch(e => e)
    }
    return await peticion();
  }

  //Nuevos Cambios

  get_eventos_cuenta = async(id_cuenta) => {
    const peticion = () => {
       return axios.get(`${new URLs().getUrlPrincipal()}/api/evento/?id_cuenta=${id_cuenta}`)
        .then(r => r.data)
        .catch(e=> "error");
    }
    return await peticion();
  }

  get_asistente_evento = async(id_aistente_vento)=>{
    const peticion = () => {
      return axios.get(`${new URLs().getUrlPrincipal()}/api/asistente-evento/${id_aistente_vento}/`)
        .then(r=>r.data )
        .catch(e=>"error")
    }
    return await peticion();
  }

  get_asistentes_evento = async (id_evento) => {
    const peticion = () => {
      return axios.get(`${new URLs().getUrlPrincipal()}/api/asistente-evento/?id_evento=${id_evento}`)
        .then(r=>r.data )
        .catch(e=>"error")
    }
    return await peticion();
  }

  get_boleto_asistente_evento = async(id_asistencia) => {
    const peticion = () => {
      return axios.get(`${new URLs().getUrlPrincipal()}/api/boleto-asistente-evento/?id_asistencia=${id_asistencia}`)
        .then(r=>r.data)
        .catch(e=>"error")
    }
    return await peticion();
  }

  get_donacion_asistente = async(id_asistente) => {
    const peticion = () => {
      return axios.get(`${new URLs().getUrlPrincipal()}/api/donacion_evento/?id_asistencia=${id_asistente}`)
        .then(r=>r.data)
        .catch(e=>"error")
    }
    return await peticion();
  }

  remove_evento = async(id_evento) => {
    const peticion = () => {
      return axios.delete(`${new URLs().getUrlPrincipal()}/api/evento/${id_evento}/`)
        .then(r=>r.statusText)
        .catch(e=>"error")
    }
    return await peticion();
  }
}

export default Eventos;