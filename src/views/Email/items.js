import React from 'react';
import { Redirect } from 'react-router-dom';

const Boletines = React.lazy(() => import('./Boletines/Boletines'));
const Crear = React.lazy(() => import('./Crear/Crear'));
const Gestionar = React.lazy(() => import('./Gestionar/Gestionar'));

const items = [

  {
    name: "Boletines",
    path: "/emailmarketing/boletines",
    visible: true, component: Boletines,
    img: require('../../assets/img/fondos/emailmarketing/consultar.jpg'),
    authCount: true,
    description:"Observa los boletines que haz creado",
    button: "Entrar",
    btn_fn: {
      navigate: "/emailmarketing/boletines",
      fn: null
    }
    
  },
  {
    name: "Crear Boletin",
    path: "/emailmarketing/crear", visible: true, component: Crear,
    img: require('../../assets/img/fondos/emailmarketing/crear.png'), authCount: true,
    description:"Crea y envia un nuevo boletin a tus contactos",
    button: "Crea un boletin",
    btn_fn: {
      navigate: "/emailmarketing/crear",
      fn:null
    }
  },
  {
    name: "Gestionar", path: "/emailmarketing/gestionar",
    visible: false, component: Gestionar,
    img: require('../../assets/img/fondos/emailmarketing/gestionar.png'), authCount: true,
    description:"¿Quién ha visto tu voletin? Gestiona tus boletines",
    button: "Crear uno ahora",
    btn_fn: {
      navigate: "/emailmarketing/crear",
      fn: null
    }
  },
];

export default items;