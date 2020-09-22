import React from 'react';

const Crear = React.lazy(() => import('./Crear/Crear'));
const Listado = React.lazy(() => import('./Listado/Listado'));
const Gestionar = React.lazy(() => import('./Gestionar/Gestionar'));

const items = [

  {name:'Listado', path:'/eventos/listado', component:Listado,visible:true, img:require('../../assets/img/fondos/eventos/fondo-listado.png')},
  {name:'Gestionar', path:'/eventos/gestionar', component:Gestionar, visible:false},
  {name:'Crear', path:'/eventos/crear', component:Crear,visible:true, img:require('../../assets/img/fondos/eventos/fondo-crear.png')},
  

]

export default items;