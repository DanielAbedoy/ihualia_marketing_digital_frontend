import React from 'react';

const Administrar = React.lazy(()=> import("./Administrar/Administrar.js"));

const items = [
  { name:'Listado', path:'/cuentas/administrar', exact:true , component:Administrar },
]

export default items;