import React from 'react';

const Crear = React.lazy(() => import('./Crear/Crear'));
const Listado = React.lazy(() => import('./Listado/Listado'));
const Gestionar = React.lazy(() => import('./Gestionar/Gestionar'));

const items = [

  {name:'Listado', path:'/eventos/listado', component:Listado,visible:true, img:require('../../assets/img/fondos/eventos/fondo-listado.png'), authCount:true},
  {name:'Gestionar', path:'/eventos/gestionar', component:Gestionar, visible:false,  authCount:true},
  {name:'Crear', path:'/eventos/crear', component:Crear,visible:true, img:require('../../assets/img/fondos/eventos/fondo-crear.png'),  authCount:true},
  

]

export default items;