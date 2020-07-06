import React from 'react';

//Contactos
import routes_contactos from './views/Contactos/items';

const Inicio = React.lazy(()=> import('./views/Inicio'));
const Perfil = React.lazy(()=> import('./views/Perfil'));
const Empresa = React.lazy(()=> import('./views/Empresa'));
const Cuentas = React.lazy(()=> import('./views/Cuentas'));
const Usuarios = React.lazy(()=> import('./views/Usuarios'));
const Contactos = React.lazy(()=> import('./views/Contactos'));
const Email = React.lazy(()=> import('./views/Email'));
const Redes = React.lazy(()=> import('./views/Redes'));
const Encuestas = React.lazy(()=> import('./views/Encuestas'));
const Eventos = React.lazy(()=> import('./views/Eventos'));
const Campanas = React.lazy(()=> import('./views/Campanas'));
const Reportes = React.lazy(()=> import('./views/Reportes'));
const Soporte = React.lazy(()=> import('./views/Soporte'));


const routes_ini = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/inicio', name:'Inicio', component: Inicio},
  { path: '/perfil', name:'Mi Perfil', component: Perfil},
  { path: '/empresa', name:'Empresa', component: Empresa},
  { path: '/cuentas', name:'Cuentas', component: Cuentas},
  { path: '/usuarios', name:'Usuarios', component: Usuarios},
  { path: '/contactos', exact:true, name:'Contactos', component: Contactos},
  { path: '/emailmarketing', name:'eMail Marketing', component: Email},
  { path: '/redessociales', name:'Redes Sociales', component: Redes},
  { path: '/encuestas', name:'Redes Sociales', component: Encuestas},
  { path: '/eventos', name:'Redes Sociales', component: Eventos},
  { path: '/campanas', name:'Redes Sociales', component: Campanas},
  { path: '/reportes', name:'Redes Sociales', component: Reportes},
  { path: '/soporte', name: 'Redes Sociales', component: Soporte },
];

const routes =  [...routes_ini, ...routes_contactos];



export default routes;
