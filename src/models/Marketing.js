import axios from 'axios';
import URLs from './urls';
import Settings from '../settings';

class Marketing {


  constructor() {
    this.urls = new URLs();
  }

  //NUEVOS QQUE SIEMPRE SI SE OCUAPN

  get_cuentas_cliente = (id_cliente) => {
    return axios.get(`${Settings.BACKENDURL}/api/cuenta/?id_cliente=${id_cliente}`)
      .then((r) => r.data.results)
      .catch(err => err.response.request)

  }

  get_usuarios_cliente = (id_cliente) => {

    return axios.get(`${Settings.BACKENDURL}/api/usuario/bycliente/?cliente=${id_cliente}`)
      .then(r => r.data)
      .catch(console.log)
  }

  add_new_cliente = (datos_cli, datos_user) => {
    return axios.post(`${Settings.BACKENDURL}/create-cliente`, { ...datos_cli, ...datos_user })
      .then(r => ({ statusText: r.statusText, data: r.data }))
      .catch(err => err.response.request)
  }

  actualizar_user = (user, datos) => {
    return axios.patch(`${Settings.BACKENDURL}/api/usuario/${user}/actualizar/`, datos)
      .then(r => ({ estatusText: r.statusText, data: r.data }))
      .catch(err => err.response)
  }

  get_empresa = (cliente) => {
    return axios.get(`${Settings.BACKENDURL}/api/cliente/${cliente}/info/`)
      .then(r => r.data )
      .catch(err => err.response)
  }

  actualizar_empresa = (cliente, datos) => {
    return axios.patch(`${Settings.BACKENDURL}/api/cliente/${cliente}/`, datos)
      .then(r => ({ statusText: r.statusText, data: r.data }))
      .catch(err => err.response)
  }

  add_new_user = (info, cuentas=[]) => {    
    return axios.post(`${Settings.BACKENDURL}/api/usuario/createnew/`, {...info, cuentas:cuentas})
      .then(r => ({ statusText: r.statusText, data: r.data }))
      .catch(err => err.response)

  }

  add_new_cuenta = (info, usuarios) => {
    return axios.post(`${Settings.BACKENDURL}/api/cuenta/createnew/`, {...info, usuarios:usuarios})
      .then(r => ({ statusText: r.statusText, data: r.data }))
      .catch(err => err.response)
  }

  add_users_a_cuenta = (usuarios,cuenta) => {
    return axios.post(`${Settings.BACKENDURL}/api/cuentausuario/addusers/`, {cuenta:cuenta, usuarios:usuarios})
      .then(r => ({ statusText: r.statusText, data: r.data }))
      .catch(err => err.response)
  }

  delete_vinculacion = (cuenta, usuario) => {
    return axios.post(`${Settings.BACKENDURL}/api/cuentausuario/desvincular/`, {cuenta:cuenta, usuario:usuario})
    .then(r => ({ statusText: r.statusText}))
    .catch(err => err.response)
  }

  add_cuentas_a_user = (usuario,cuentas) => {
    return axios.post(`${Settings.BACKENDURL}/api/cuentausuario/addcuentas/`, {cuentas:cuentas, usuario:usuario})
      .then(r => ({ statusText: r.statusText, data: r.data }))
      .catch(err => err.response)
  }

  actualizar_cuenta = (cuenta,datos) => {
    return axios.patch(`${Settings.BACKENDURL}/api/cuenta/${cuenta}/`,datos)
      .then(r => ({ statusText: r.statusText, data: r.data }))
      .catch(err => err.response)
  }

  get_cuenta = (cuenta) => {
    return axios.get(`${Settings.BACKENDURL}/api/cuenta/${cuenta}/`)
      .then(r => r.data)
      .catch(err => err.response)
  }

  get_user = (usuario) => {
    return axios.get(`${Settings.BACKENDURL}/api/usuario/${usuario}/info/`)
      .then(r => r.data)
      .catch(err => err.response)
  }
}

export default Marketing;