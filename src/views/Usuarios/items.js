import React from 'react';

const Administrar = React.lazy(()=>import("./Administrar/Administrar"));

const items = [
  
  { name: 'Adminstrar', path: '/usuarios/administrar', exact: true, component: Administrar, visible:false }
]

export default items;
