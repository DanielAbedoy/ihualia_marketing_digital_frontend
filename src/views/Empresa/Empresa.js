import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import Edit from './Hooks/Edit';

import Modelo from '../../models/Marketing.js';
import { SessionContext } from '../../sessionContext';

class Empresa extends Component {

  static contextType = SessionContext;

  state = {
    openEdit: false,
    datos:{razon_social:"", dominio:"",direccion:"",telefono:"", giro:"", id:""}
  }

  componentDidMount = () => {

    const validar = async () => {
      const info = await this.context.user();
      if (info.tipo.toLowerCase() !== "administrador") this.props.history.push("/inicio")
      else this.getInfo();
    }
    validar();
    
  }

  getInfo = () => {
    new Modelo().get_empresa(this.context.cliente)
      .then(info => this.setState({ datos: info }))
  }

  render() {
    const i = this.state.datos;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader style={{ backgroundColor: "#333333" }}>
                <p className=" text-white h3 p-2"><i className="fa fa-cubes"></i> Empresa</p>
              </CardHeader>
              <CardBody>

                <Row className="mt-4">
                  <Col md="9" xl="8" xs="12" className="rounded mx-auto p-2 shadow-h-hov" >

                    <Row className="m-0 p-0">
                      <div className="mx-3 p-5 rounded-circle shadow"></div>
                      <div className="d-flex flex-column">
                        <p className="h5 mt-auto mb-0"><b>{i.razon_social}</b></p>
                        <p className="mb-0 h6"><b>{i.dominio}</b></p>
                      </div>
                    </Row>
                    <Row className="my-2 border mx-0 p-0"></Row>
                    <Row className="px-4 py-3 flex-column">

                      <p className="m-0 h6">{i.direccion}</p>
                      <p className="m-0 h6">{i.giro}</p>
                      <p className="m-0 h6">{i.telefono}</p>

                    </Row>

                  </Col>
                </Row>

                {!this.state.openEdit &&
                  <Row className="mt-3">
                    <Col md="9" xl="8" xs="12" className="mx-auto" >
                      <Row  >
                        <div onClick={() => this.setState({ openEdit: !this.state.openEdit })} className="ml-auto px-3 btn-h bg-h-primary text-white">
                          <i className="fa fa-pencil"></i> Editar
                      </div>
                      </Row>
                    </Col>
                  </Row>
                }
                <Row className="mt-4">
                  <Col md="9" xl="8" xs="12" className="mx-auto" >
                    <Edit open={this.state.openEdit} setOpen={() => this.setState({ openEdit: !this.state.openEdit })}
                      datos={this.state.datos} setDatos={(d, v) => this.setState({ datos: { ...i, [d]: v } })} cancel={()=>this.getInfo()}
                    />
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
export default Empresa;
