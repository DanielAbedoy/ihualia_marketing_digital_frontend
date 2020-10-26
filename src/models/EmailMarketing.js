import axios from 'axios';
import URLs from './urls';

class EmailMarketing{


  post_imagen_boletin = async (data) => {
    const peticion = () => {
      return axios.post(`${new URLs().supporserver()}/email/upload-image`, data)
        .then(r => r.data)
        .catch(r => "error");
    }
    return await peticion();
  }

  add_links = async(links,id_boletin) => {
    const peticion = () => {
      return links.map((link) => {
        return axios.post(`${new URLs().getUrlPrincipal()}/api/link-boletin/`, { link: link, id_boletin:id_boletin })
          .then(r => r.data)
          .catch(e => "error")  
      });
    }
    return await peticion();
  }

  send_email = async (email, html, asunto) => {
    const peticion = () => {
      return axios.post(`${new URLs().supporserver()}/email/send-email`, { email: email, html: html,asunto:asunto }, {
        headers: { "Content-Type": "application/json" }
      })
        .then(r=> r.data)
        .catch(e => "error") 
    }
    return await peticion();
  }

  add_boletin = async (asunto,tipo_publicacion, contenido,estatus,id_cuenta) => {
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/boletin/`, { asunto:asunto, tipo_publicacion: tipo_publicacion, contenido:contenido, estatus: estatus,id_cuenta:id_cuenta })
          .then(r => r.data)
          .catch(e => "error")  
    }
    return await peticion();
  }

  add_programacion_boletin = async (fecha,hora,id_boletin,ids_grupos) => {
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/fecha-publicacion-boletin/`,
        { fecha:fecha, hora:hora, id_boletin:id_boletin,ids_grupos:ids_grupos})
          .then(r => r.data)
          .catch(e => "error")  
    }
    return await peticion();
  }

  add_envios_boletines = async (ids_contactos,ids_grupos,id_boletin) => {
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/envio-boletin-exitoso/`, { ids_contactos: ids_contactos, id_boletin: id_boletin, ids_grupos:ids_grupos })
        .then(r => r.statusText)
        .catch(e => "error")
    }
    return await peticion();
  }

  get_boletines_fecha_cuenta = (fecha_start, fecha_end, id_cuenta) => {
    const peticion = () => {
      return axios.get(`${new URLs().getUrlPrincipal()}/api/boletin/?fecha_start=${fecha_start}&fecha_end=${fecha_end}&id_cuenta=${id_cuenta}`)
        .then(r => r.data)
        .catch(err=> "error")
    }
    return peticion();
  }

  get_envios_boletin = (id_boletin) => {
    return axios.get(`${new URLs().getUrlPrincipal()}/api/envio-boletin-exitoso/?id_boletin=${id_boletin}`)
        .then(r => r.data)
        .catch(err=> "error")
  }

  get_seenBoletin = (id_boletin) => {
    return axios.get(`${new URLs().getUrlPrincipal()}/api/seen-contacto-boletin/?id_boletin=${id_boletin}`)
      .then(r => r.data)
      .catch(err => "error");
  }

  get_links = (id_boletin) => {
    return axios.get(`${new URLs().getUrlPrincipal()}/api/link-boletin/?id_boletin=${id_boletin}`)
    .then(r => r.data)
    .catch(err => "error");
  }

  get_seenLinks = id_link => {
    return axios.get(`${new URLs().getUrlPrincipal()}/api/seen-contacto-link/?id_link=${id_link}`)
    .then(r => r.data)
    .catch(err => "error");
  }

  update_boletin = (id, data) => {
    return axios.put(`${new URLs().getUrlPrincipal()}/api/boletin/${id}/`, data)
      .then(r => r.data)
      .catch(err => "error");
  }

  delete_boletin = (id) => {
    return axios.delete(`${new URLs().getUrlPrincipal()}/api/boletin/${id}/`)
      .then(r => r.statusText)
      .catch(err => err.response.data);
  }
}

export default EmailMarketing;