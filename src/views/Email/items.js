import React from 'react';

const Boletines = React.lazy(() => import('./Boletines/Boletines'));
const Crear = React.lazy(() => import('./Crear/Crear'));
const Gestionar = React.lazy(() => import('./Gestionar/Gestionar'));

const items = [

  { name: "Boletines", path:"/emailmarketing/boletines", visible:true, component: Boletines, img:''  },
  { name: "Crear Boletin", path: "/emailmarketing/crear", visible: true, component: Crear, img: '' },
  { name: "Gestionar", path:"/emailmarketing/gestionar", visible:false, component: Gestionar, img:''  },
];

export default items;