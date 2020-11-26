import axios from 'axios';
import URLs from './urls';


class Eventos {

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

  add_imagen_evento = async (id_evento, nombre, posicion) => {
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/imagen-evento/`, { id_evento: id_evento, nombre_imagen: nombre, posicion: posicion })
        .then(r => r)
        .catch(e => e)
    }
    return await peticion();
  }

  
  post_card_pay = async (datos) => {
    const peticion = () => {
      return axios.post(`${new URLs().supporserver()}/ev/pago-card`, datos, {
        headers: { "Content-Type": "application/json" }
      })
        .then(r => r.data.result)
        .catch(e => e)
    }
    return await peticion();
  }


  add_asistente_evento = async (correo, nombre, tel, metodo_pago, monto, estatus, id_evento) => {
    if (metodo_pago === '') metodo_pago = "ninguno";
    const datos = { correo: correo, nombre: nombre, telefono: tel, metodo_pago: metodo_pago, monto_total: monto, estatus_pago: estatus, id_evento: id_evento }
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/asistente-evento/`, datos)
        .then(r => r.data)
        .catch(e => e)
    }
    return await peticion();
  }

  add_boleto_asistente_evento = async (id_asistencia, id_boleto, cantidad) => {
    const datos = { id_asistencia: id_asistencia, id_boleto: id_boleto, cantidad: cantidad }
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/boleto-asistente-evento/`, datos)
        .then(r => r.data)
        .catch(e => e)
    }
    return await peticion();
  }

  add_detalles_oxxo_evento = async (id_asistencia, referencia) => {
    const datos = { id_asistencia: id_asistencia, numero_referencia: referencia }
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/detalles-oxxo-pay-evento/`, datos)
        .then(r => r.data)
        .catch(e => e)
    }
    return await peticion();
  }

  add_detalles_card_evento = async (id_asistencia, id_pago, id_orden) => {
    const datos = { id_asistencia: id_asistencia, id_pago: id_pago, id_orden: id_orden }
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/detalles-card-pay-evento/`, datos)
        .then(r => r.data)
        .catch(e => e)
    }
    return await peticion();
  }

  add_donacion_evento = async (id_asistencia, monto) => {
    const datos = { id_asistencia: id_asistencia, monto: monto }
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/donacion_evento/`, datos)
        .then(r => r.data)
        .catch(e => e)
    }
    return await peticion();
  }

  get_boleto = async (id_boleto) => {
    const peticion = () => {
      return axios.get(`${new URLs().getUrlPrincipal()}/api/boleto-evento/${id_boleto}/`)
        .then(r => r.data)
        .catch(e => e)
    }
    return await peticion();
  }

 

  //Nuevos Cambios



  get_asistente_evento = async (id_aistente_vento) => {
    const peticion = () => {
      return axios.get(`${new URLs().getUrlPrincipal()}/api/asistente-evento/${id_aistente_vento}/`)
        .then(r => r.data)
        .catch(e => "error")
    }
    return await peticion();
  }

  get_asistentes_evento = async (id_evento) => {
    const peticion = () => {
      return axios.get(`${new URLs().getUrlPrincipal()}/api/asistente-evento/?id_evento=${id_evento}`)
        .then(r => r.data)
        .catch(e => "error")
    }
    return await peticion();
  }

  get_boleto_asistente_evento = async (id_asistencia) => {
    const peticion = () => {
      return axios.get(`${new URLs().getUrlPrincipal()}/api/boleto-asistente-evento/?id_asistencia=${id_asistencia}`)
        .then(r => r.data)
        .catch(e => "error")
    }
    return await peticion();
  }

  //Nuevosd 


  
  upluad_image = async (id_evento, file) => {

    let bodyFromData = new FormData();
    bodyFromData.append('evento', id_evento);
    bodyFromData.append('file', file, file.name);

    return axios.post(`${new URLs().supporserver()}/ev/upload-image`, bodyFromData)
      .then(r => r.data)
      .catch(e => e)
  }


 

  get_cantidad_boletos_vendidos = (boletos) => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/boleto-asistente-evento/vendidos/`,{boletos:boletos})
      .then(r => { return { statusText: r.statusText, data: r.data } })
      .catch(e => e.response.request)
  }

  modificar_asistente = (id, data) => {
    return axios.patch(`${new URLs().getUrlPrincipal()}/api/asistente-evento/${id}/`,data)
    .then(r => { return { statusText: r.statusText, data: r.data } })
    .catch(e => e.response.request)
  }



  //ULTIMA ACTUALIZACION CUANDO MODIFICASTE TODOS LOS MODELS DE DJANGO

  
  get_evento = async evento => {
    return axios.get(`${new URLs().getUrlPrincipal()}/api/evento/${evento}/`)
      .then(r => r.data)
      .catch(e => "error");
  }

  get_evento_to_continue = async evento => {
    return axios.get(`${new URLs().getUrlPrincipal()}/api/evento/${evento}/tocontinue`)
      .then(r => r.data)
      .catch(e => "error");
  }


  get_eventos_cuenta = async (id_cuenta) => {
    return axios.get(`${new URLs().getUrlPrincipal()}/api/evento/?id_cuenta=${id_cuenta}`)
      .then(r => r.data)
      .catch(e => "error");
  }

  
  get_info_eventos_cuenta = async (id_cuenta) => {
    return axios.get(`${new URLs().getUrlPrincipal()}/api/evento/info/?cuenta=${id_cuenta}`)
      .then(r => r.data)
      .catch(e => "error");
  }

  crear_evento = async (nombre, tipo, categoria, sub_categoria, estatus,etiquetas, cuenta) => {
    return axios.post(`${new URLs().getUrlPrincipal()}/api/evento/`, {
      nombre, tipo, categoria, sub_categoria, estatus, id_cuenta: cuenta, etiquetas:etiquetas
    })
      .then(r => { return { statusText: r.statusText, data: r.data } })
      .catch(e => e.response.request)
  }

  modificar_evento = (evento, datos) => {

    return axios.patch(`${new URLs().getUrlPrincipal()}/api/evento/${evento}/`, datos)
      .then(r => { return { statusText: r.statusText, data: r.data } })
      .catch(e => e.response.request)
  }

  eliminar_evento = (evento) => {
    return axios.delete(`${new URLs().getUrlPrincipal()}/api/evento/${evento}/`)
      .then(r => r.statusText)
      .catch(e => e.response.request)
  }

  
  get_eventoby_url = (url) => {
    return axios.get(`${new URLs().getUrlPrincipal()}/api/evento/?url=${url}`)
      .then(r => r.data[0])
      .catch(e => "error");
  }

  add_asistente = (datos) => {
    return axios.post(`${new URLs().getUrlPrincipal()}/api/asistente-evento/`, datos)
      .then(r => { return { statusText: r.statusText, data: r.data } })
      .catch(e => e.response.request)
  }

  
  post_oxxo_pay = async (datos) => {
    const peticion = () => {
      return axios.post(`${new URLs().supporserver()}/ev/pago-oxxo`, datos, {
        headers: { "Content-Type": "application/json" }
      })
        .then(r => r.data.result)
        .catch(e => e)
    }
    return await peticion();
  }

}

export default Eventos;