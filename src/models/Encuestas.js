import axios from 'axios';
import URLs from './urls';

class Encuestas{

  upload_image = (encuesta, file) => {
    let bodyFromData = new FormData();
    bodyFromData.append('encuesta', encuesta);
    bodyFromData.append('file', file, file.name);

    return axios.post(`${new URLs().supporserver()}/encuestas/upload-img`, bodyFromData)
      .then(r => r.data)
      .catch(e => e)
  }

  add_encuesta = (data) => {
    return axios.post(`${new URLs().getUrlPrincipal()}/api/encuesta/`, data)
      .then(r => ({ statusText: r.statusText, data: r.data }))
      .catch(e => e.request)
  }

  modificar_encuesta = (encuesta, data) => {
    return axios.patch(`${new URLs().getUrlPrincipal()}/api/encuesta/${encuesta}/`, data)
      .then(r => ({ statusText: r.statusText, data: r.data }))
      .catch(e => e.request)
  }

  get_encuestas_info = (cuenta) => {
    return axios.get(`${new URLs().getUrlPrincipal()}/api/encuesta/getinfo/?cuenta=${cuenta}`)
      .then(r => r.data)
      .catch(e => e.request)
  }

  get_encuestaby_url = (url) => {
    return axios.get(`${new URLs().getUrlPrincipal()}/api/encuesta/getinfotoshow/?url=${url}`)
      .then(r => r.data)
      .catch(e => "error")
  }

  add_encuestado = (datos) => {
    return axios.post(`${new URLs().getUrlPrincipal()}/api/encuestado/`, datos)
      .then(r => ({ statusText: r.statusText, data: r.data }))
      .catch(e => "error")
  }
  
  eliminar_encuesta = (encuesta) => {
    return axios.delete(`${new URLs().getUrlPrincipal()}/api/encuesta/${encuesta}/`)
      .then(r => r.statusText)
      .catch(e => e.request)
  }

  get_encuesta = (encuesta) => {
    return axios.get(`${new URLs().getUrlPrincipal()}/api/encuesta/${encuesta}/`)
      .then(r => r.data)
      .catch(e => "error")
  }
}

export default Encuestas;

