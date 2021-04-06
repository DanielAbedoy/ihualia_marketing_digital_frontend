import React, {createContext} from 'react';
import auth from './auth';

export const valueContext = () => {
  
  return {
    user: () => new auth().getUserInfo(),
    cuenta: new auth().getCuenta(),
    setCuenta: (cuenta) => new auth().saveCuenta(cuenta),
    cliente: new auth().getCliente(),
  };
}

export const SessionContext = createContext(valueContext);

