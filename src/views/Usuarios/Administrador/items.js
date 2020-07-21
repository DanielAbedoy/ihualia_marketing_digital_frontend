import React from 'react';

const Crear = React.lazy(() => import("./Crear/CrearUsuario"));
const Listado = React.lazy(() => import("./Listado/ListadoUsuario"));
const Administrar = React.lazy(()=>import("./Administrar/Administrar"));

const items = [
  
  { name:'Listado', path:'/usuarios/listado', exact:true , component: Listado, visible:true},
  { name: 'Crear', path: '/usuarios/crear', exact: true, component: Crear, visible:true },
  { name: 'Adminstrar', path: '/usuarios/administrar', exact: true, component: Administrar, visible:false }
]

export default items;