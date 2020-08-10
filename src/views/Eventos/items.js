import React from 'react';

const Crear = React.lazy(() => import('./Crear/Crear'));
const Listado = React.lazy(() => import('./Listado/Listado'));
const Gestionar = React.lazy(() => import('./Gestionar/Gestionar'));

const items = [

  {name:'Listado', path:'/eventos/listado', component:Listado, img:''},
  {name:'Gestionar', path:'/eventos/gestionar', component:Gestionar, img:''},
  {name:'Crear', path:'/eventos/crear', component:Crear, img:''},
  

]

export default items;