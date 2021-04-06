import store from 'store';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import Settings from './settings';
import user_images from './components/UserImages';
//same of django (SETTINGS)
class Auth {

  login = (user, password) => {
    //Guardar el token en el storag
    return axios.post(`${Settings.BACKENDURL}/newsletter-auth`, { usuario: user, password: password }, { withCredentials: true })
      .then(r => {
        console.log(r)
        store.set('session-auth', r.data.access_token);
        return true;
      })
      .catch(err => ({ error: true, message: err.response.data.detail }))
/*     return fetch(`${Settings.BACKENDURL}/newsletter-auth`, {
      headers: { "Content-Type": 'application/json' },
      credentials:"include",
      body:{ usuario: user, password: password }
    })
      .then()
      .catch(console.log) */
  }



  isAuthLogin = () => {
    //Token descomprimir y verificar si es el correcto;
    try {
      jwt.verify(store.get('session-auth'), Settings.KEYSECRET, { algorithms: 'HS256' });
      //Generar un vnuevo token con otros 10 minutos
      axios.defaults.xsrfCookieName = 'csrftoken'
      axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
      axios.post(`${Settings.BACKENDURL}/newsletter-refresh-auth`, null, { withCredentials: true })
        .then(r => { store.set('session-auth', r.data.access_token) })
        .catch(err => {
          store.remove("session-auth");
          store.remove("session-preferencess");
        })
        
      return true;
    } catch (error) {
      store.remove("session-auth");
      store.remove("session-preferencess");
      return false;
    }
  }

  isAuthUseCuenta = () => {
    //Token descomprimir y verificar si es el correcto;
    try {
      jwt.verify(store.get('session-preferencess'), Settings.KEYSECRET, { algorithm: "ES512" });
      return true;
    } catch (error) {
      return false;
    }
  }

  saveCuenta = (cuenta) => {
    try {
      const token = jwt.sign({ cuenta: cuenta }, Settings.KEYSECRET, { algorithm: "HS256" });
      store.set('session-preferencess', token);
      return true;
    } catch (e) {
      return false;
    }
  }

  getCuenta = () => {
    try {
      const info = jwt.verify(store.get('session-preferencess'), Settings.KEYSECRET, { algorithm: "HS256" });
      return info.cuenta;
    } catch (e) {
      return false;
    }
  }

  getUser = () => {
    try {
      const info = jwt.verify(store.get('session-auth'), Settings.KEYSECRET, { algorithms: 'HS256' })
      return info.clave;
    } catch (error) {
      //SESION HA EXPIRADO
      alert("la sesion ha expirado");
      store.remove("session-auth");
      store.remove("session-preferencess");
      return false;
    }
  }


  getUserInfo = () => {
    return axios.get(`${Settings.BACKENDURL}/api/usuario/${this.getUser()}/info/`)
      .then(r => {
        let datos = r.data;
        user_images.forEach((imagen) => { if (imagen.nombre === datos.imagen) datos.imagen = imagen.direccion; })
        return datos;
      })
  }

  getCliente = () => {
    try {
      const info = jwt.verify(store.get('session-auth'), Settings.KEYSECRET, { algorithms: 'HS256' })
      return info.cliente;
    } catch (error) {
      //SESION HA EXPIRADO
      alert("la sesion ha expirado");
      store.remove("session-auth");
      store.remove("session-preferencess");
      return false;
    }
  }
}

export default Auth;