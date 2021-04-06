import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import ImagenUser from '../../components/UserImages.js';
import Load from '../../components/Load';
import { SessionContext } from '../../sessionContext.js';

const Show = React.lazy(() => import('./Hooks/Mis Datos/Show'));
const Cuentas = React.lazy(() => import('./Hooks/Cuentas'));
const Companieros = React.lazy(() => import('./Hooks/Companieros/Companieros'));
const Empresa = React.lazy(() => import('./Hooks/Empresa'));


class Perfil extends Component {

  static contextType = SessionContext;

  state = {
    ventana: "",
    info: { nombre: "", imagen: "", cargo: "", id: "", cuentas: [] }
  }

  componentDidMount = () => {
    const getInfo = async () => {
      const i = await this.context.user();
      let info = { nombre: i.nombre, imagen: i.imagen, cargo: i.tipo, id: i.id, cuentas: i.cuentas }
      this.setState({ info }, () => {
        if (this.props.location.state) this.setState({ ventana: this.props.location.state.ventana });
        else this.setState({ventana:0})
      });
    }
    getInfo();
  }

  cambiarVentana = (e, v) => this.setState({ ventana: v });

  render() {

    const TabCmp = ({ }) => {

      const useStyles = makeStyles(() => ({
        root: { color: "#000000" },
        select: { backgroundColor: "#333333" }
      }));

      const classes = useStyles();

      return (
        <Tabs
          value={this.state.ventana}
          onChange={this.cambiarVentana}
          classes={{ root: classes.root, indicator: classes.select }}
          variant="scrollable"
          style={{ width: "100%" }}
        >
          <Tab label="Mis datos" icon={<i className="fa fa-user"></i>} />
          <Tab label="Mis cuentas" icon={<i className="fa fa-briefcase"></i>} />
          <Tab label="Mis compañeros " icon={<i className="fa fa-users"></i>} />
          <Tab label="Mi empresa" icon={<i className="fa fa-building"></i>} />
        </Tabs>
      );
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader style={{ backgroundColor: "#333333" }} >
                <p className="h3 p-2 text-white"><i className="fa fa-user-o"></i> Mi Perfil</p>
              </CardHeader>
              <CardBody>

                <Row className="my-3">
                  <Col md="11" xs="12" className="mx-auto px-3 py-5 text-white" style={{ backgroundImage: `url(${require('../../assets/img/users/portada.jpg')})`, backgroundSize: "100% auto", backgroundPosition: "center center" }}>
                    <Row>
                      <div className="mx-3">
                        <img width="100%" src={this.state.info.imagen} alt="user photo" className="rounded shadow-lg" ></img>
                      </div>
                      <div className="d-flex flex-column">
                        <p className="h4 mb-1 mt-auto"><b>{this.state.info.nombre}</b></p>
                        <p className="h6 m-0"><b>{this.state.info.cargo}</b></p>
                      </div>
                      <div className="d-flex flex-column ml-auto mr-2" style={{ width: "20%" }}>
                        <div className="btn-h bg-h-danger mt-auto">SALIR</div>
                      </div>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col md="11" xs="12" className="mx-auto shadow-sm">
                    {this.state.ventana !== "" &&
                      <TabCmp />
                    }
                  </Col>
                </Row>

                <Row className="mt-2 mb-4">
                    <Col md="11" xs="12" className="mx-auto">
                      {this.state.ventana === 0 && <React.Suspense fallback={<Load />}><Show history={this.props.history} setContext={this.props.setContext} /></React.Suspense>}
                      {this.state.ventana === 1 && <React.Suspense fallback={<Load />}><Cuentas history={this.props.history} setContext={this.props.setContext} cuentas={this.state.info.cuentas} /></React.Suspense>}
                      {this.state.ventana === 2 && <React.Suspense fallback={<Load />}><Companieros cliente={this.context.cliente} myselfID={this.state.info.id} /></React.Suspense>}
                      {this.state.ventana === 3 && <React.Suspense fallback={<Load />}><Empresa /></React.Suspense>}

                    </Col>
                  
                </Row>



              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Perfil;
