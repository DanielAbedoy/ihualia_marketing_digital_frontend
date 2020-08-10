import axios from 'axios';
import URLs from './urls';


class Eventos{

  upluad_image_principal = async (id_cliente,id_cuenta,file) => {

    let bodyFromData = new FormData();
    bodyFromData.append('cliente',id_cliente);
    bodyFromData.append('cuenta', id_cuenta);
    bodyFromData.append('file', file, file.name);

    const peticion = () => {
      return axios.post(`${new URLs().supporserver()}/eventos/upload-image`, bodyFromData)
        .then(r =>  r.data )
        .catch(e => e)
    }
    return await peticion();
  }

  crear_evento = async (datos) => {
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/evento/`,datos)
        .then(r=>r)
        .catch(e => e)
    }
    return await peticion();
  }

  add_etiqueta_evento = async (palabra, id_evento) => {
    const datos ={palabra:palabra, id_evento:id_evento}
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/tags-evento/`,datos)
        .then(r=>r)
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
      return axios.post(`${new URLs().getUrlPrincipal()}/api/lugar-evento/`,datos)
        .then(r=>r)
        .catch(e => e)
    }
    return await peticion();
  }

  add_ubicacion_link_evento = async (id_evento,link) => {
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/online-evento/`,{id_evento:id_evento,link:link})
        .then(r=>r)
        .catch(e => e)
    }
    return await peticion();
  }

  add_boleto_evento = async (id_evento,tipo,nombre,cantidad_total,precio,descripcion,cantidad_min,cantidad_max,canal) => {
    const datos = {
      tipo: tipo, nombre: nombre, cantida_total: cantidad_total, precio: precio, descripcion: descripcion, cantidad_minima: cantidad_min,
      cantidad_maxima: cantidad_max, canal_ventas: canal, id_evento: id_evento
    }
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/boleto-evento/`,datos)
        .then(r=>r)
        .catch(e => e)
    }
    return await peticion();
  }

  upluad_image_extra = async (id_cliente,id_cuenta,id_evento,file) => {

    let bodyFromData = new FormData();
    bodyFromData.append('cliente',id_cliente);
    bodyFromData.append('cuenta', id_cuenta);
    bodyFromData.append('evento', id_evento);
    bodyFromData.append('file', file, file.name);

    const peticion = () => {
      return axios.post(`${new URLs().supporserver()}/eventos/upload-image`, bodyFromData)
        .then(r =>  r.data )
        .catch(e => e)
    }
    return await peticion();
  }

  add_parrafo_evento = async (id_evento,parrafo) => {
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/parrafo-evento/`,{id_evento:id_evento,parrafo:parrafo})
        .then(r=>r)
        .catch(e => e)
    }
    return await peticion();
  }

  add_imagen_evento = async (id_evento,directorio,nombre) => {
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/imagen-evento/`,{id_evento:id_evento,directorio_imagen:directorio,nombre_imagen:nombre})
        .then(r=>r)
        .catch(e => e)
    }
    return await peticion();
  }

  add_video_evento = async (id_evento,link) => {
    const peticion = () => {
      return axios.post(`${new URLs().getUrlPrincipal()}/api/video-evento/`,{id_evento:id_evento,link:link})
        .then(r=>r)
        .catch(e => e)
    }
    return await peticion();
  }

}

export default Eventos;