import store from 'store';

class Auth{

  isAuthLogin = () => {
    //Token descomprimir y verificar si es el correcto;
    if (store.get('usuario_guardado')) return true;
    else return false;
  }

  isAuthUseCuenta = () => {
    //Token descomprimir y verificar si es el correcto;
    if (store.get('cuenta_en_uso')) return true;
    else return false;
  }
}

export default Auth;