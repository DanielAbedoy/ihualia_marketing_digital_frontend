import React from 'react';

const Crear = React.lazy(() => import('./Crear/Crear'));
const Listado = React.lazy(() => import('./Listado/Listado'));
const Gestionar = React.lazy(() => import('./Gestionar/Gestionar'));

const items = [
  { name: "Crear", path: "/encuestas/crear", component: Crear, authCount: true },
  { name: "Listado", path: "/encuestas/listado", component: Listado, authCount: true },
  { name: "Gestionar", path: "/encuestas/gestionar", component: Gestionar, authCount: true },
];

export default items;
