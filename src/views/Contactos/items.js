import React from 'react';

//Vistas de Contacto
const ListaContactos = React.lazy(() => import('./Listas/ListaContactos'));
const CrearContactos = React.lazy(() => import('./Crear/Crear'));
const AdministrarContactos = React.lazy(() => import('./Administrar/Administrar'));
const ExportarContactos = React.lazy(()=> import('./Exportar/Exportar'));

const items = [
    { name: "Listas", path: "/contactos/listas", img:require('../../assets/img/fondos/contactos/listas.jpg'),component: ListaContactos, name:"Listas de Contactos" },
    { name:"Crear" , path:"/contactos/crear", img:require('../../assets/img/fondos/contactos/crear.jpeg'),component: CrearContactos, name:"Crear" },
    { name:"Administrar" , path:"/contactos/administrar", img:require('../../assets/img/fondos/contactos/administracion.jpg'),component: AdministrarContactos, name:"Administrar" },
    { name:"Exportar e Iportar" , path:"/contactos/exportar-importar", img:require('../../assets/img/fondos/contactos/export-import.jpg'),component:ExportarContactos, name:"Exportar e importar"  },
]

export default items;