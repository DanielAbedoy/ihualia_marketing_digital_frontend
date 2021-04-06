import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';

import logo from '../../assets/img/brand/ihualia.gif'
import sygnet from '../../assets/img/brand/ihualia.gif'
import user_images from '../../components/UserImages.js';
import { SessionContext } from '../../sessionContext';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  static contextType = SessionContext;

  state = {
    datosUser: {},
    cuenta_en_uso: {
      nombre:""
    }    
  }

  componentDidMount() { 
    this.getUserData();
  }

  //Obtnener datos del User
  getUserData = async () => {
    let datos = await this.context.user();
    this.setState({ datosUser: datos });
  }

  get_cuenta_en_uso = () => {    
    let cuenta = this.context.cuenta;
    if (cuenta !== undefined && cuenta !== false ) this.setState({ cuenta_en_uso: cuenta });
  }

  navigate = (ruta, n) => {

    if (this.state.datosUser.tipo.toLowerCase() === "administrador") {
      this.props.history.push(`/${ruta}`)  
    } else {
      this.props.history.push({
        pathname: `/perfil`,
        state:{ventana:n}
      })
    }
    

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
            {/* <strong>Cuenta:</strong> {this.state.cuenta_en_uso.nombre} <Badge href="#/cuentas" className="ml-1" color="warning">{this.state.cuenta_en_uso.nombre == "" ? "Seleccionar" : "Cambiar"}</Badge> */}
            <strong>Cuenta:</strong> {this.props.cuenta.nombre} <Badge href="#/cuentas" className="ml-1" color="warning">{this.props.cuenta === false ? "Seleccionar" : "Cambiar"}</Badge>
          </NavItem>
        </Nav>

        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <span>{this.props.user.nombre}</span>
              <img src={this.props.user.imagen} className="img-avatar" title={this.props.user.correo} alt={this.props.user.correo} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>{this.props.user.usuario}</strong></DropdownItem>
              <DropdownItem onClick={e => this.navigate("perfil",0)}><i className="fa fa-user-o"></i> Mi Perfil</DropdownItem>
              <DropdownItem onClick={e => this.navigate("empresa",3)}><i className="fa fa-cubes"></i> Empresa</DropdownItem>
              <DropdownItem onClick={e => this.navigate("cuentas",1)}><i className="icon-briefcase"></i> Cuentas</DropdownItem>
              <DropdownItem onClick={e => this.navigate("usuarios",2)}><i className="icon-people"></i> Usuarios</DropdownItem>
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
