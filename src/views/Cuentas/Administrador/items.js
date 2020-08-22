import React from 'react';

const Administrar = React.lazy(() => import("./Administrar/Administrar.js"));
const Listado = React.lazy(() => import("./Listado/Listado.js"));
const Crear = React.lazy(()=>import("./Crear/Crear.js"))
const MisCuentas = React.lazy(()=>import("../MisCuentas/MisCuentas.js"))

const items = [
  { name:'Mis Cuentas', path:'/cuentas', exact:true , component:MisCuentas, visible:true },
  { name:'Listado', path:'/cuentas/listado', exact:true , component:Listado, visible:true},
  { name:'Crear', path:'/cuentas/crear', exact:true , component:Crear, visible:true},
  { name:'Administrar', path:'/cuentas/administrar', exact:true , component:Administrar },
  
]

export default items;