import React from 'react';

const Administrar = React.lazy(() => import("./Adminstrar/Administrar"));


const items = [
  { name:'Administrar', path:'/cuentas/administrar', exact:true , component:Administrar },
]

export default items;