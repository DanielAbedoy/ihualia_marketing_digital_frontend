import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';

import logo from '../../assets/img/brand/ihualia.gif'
import sygnet from '../../assets/img/brand/ihualia.gif'
import user_images from '../../components/UserImages.js';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  state = {
    datosUser: {},
    cuenta_en_uso: {
      nombre:""
    }
      
    
  }


  componentDidMount() {
    this.getUserData();
    this.get_cuenta_en_uso();
  }

  //Obtnener datos del User
  getUserData = () => {
    var store = require('store');
    let datos = store.get('usuario_guardado');
    
    user_images.forEach((imagen) => {
      if (imagen.nombre === datos.imagen) datos.imagen = imagen.direccion; 
    });

    this.setState({
      datosUser: datos
    })
  }

  get_cuenta_en_uso = () => {    
    let cuenta = require('store').get('cuenta_en_uso');
    if (cuenta !== undefined) this.setState({ cuenta_en_uso: cuenta });
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 150, height: 36, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 50, height: 11, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <strong>Cuenta:</strong> {this.state.cuenta_en_uso.nombre} <Badge href="#/cuentas" className="ml-1" color="warning">{this.state.cuenta_en_uso.nombre == "" ? "Seleccionar" : "Cambiar"}</Badge>
          </NavItem>
        </Nav>

        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <span>{this.state.datosUser.nombre}</span>
              <img src={this.state.datosUser.imagen} className="img-avatar" title={this.state.datosUser.correo} alt={this.state.datosUser.correo} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>{this.state.datosUser.usuario}</strong></DropdownItem>
              <DropdownItem onClick={e => document.location.href='#/perfil'}><i className="fa fa-user-o"></i> Mi Perfil</DropdownItem>
              <DropdownItem onClick={e => document.location.href='#/empresa'}><i className="fa fa-cubes"></i> Empresa</DropdownItem>
              <DropdownItem onClick={e => document.location.href='#/cuentas'}><i className="icon-briefcase"></i> Cuentas</DropdownItem>
              <DropdownItem onClick={e => document.location.href='#/usuarios'}><i className="icon-people"></i> Usuarios</DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Ajustes</strong></DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Parámetros</DropdownItem>
              {/*<DropdownItem><i className="fa fa-file"></i> Facturación</DropdownItem> */}
              <DropdownItem><i className="cui-calculator"></i> Plan</DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="cui-account-logout"></i> Salir</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">3</Badge></NavLink>
          </NavItem>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
