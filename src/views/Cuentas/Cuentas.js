import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

import TableHook from './Hooks/Table';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';
import Nueva from './Hooks/Nueva.jsx';
import { SessionContext } from '../../sessionContext';
import ModelMarketing from '../../models/Marketing';

class Cuentas extends Component {

  static contextType = SessionContext;
  state = {
    crear: false,
    cuentas:[]
  }

  componentDidMount = () => {
    const validar = async () => {
      const info = await this.context.user();
      if (info.tipo.toLowerCase() !== "administrador") this.props.history.push("/inicio")
      else this.getCuentas();
    }
    validar();
    
  }

  getCuentas = () => {
    new ModelMarketing().get_cuentas_cliente(this.context.cliente)
      .then(cuentas => this.setState({ cuentas }))
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader style={{ backgroundColor: "#333333" }}>
                <p className="h3 p-2 text-white"><i className="fa fa-users"></i> Cuentas |</p>
              </CardHeader>
              <CardBody>
                <p className="h4 mb-0"><b>Cuentas de la empresa</b></p>
                <p className="h6 text-muted">Todas las cuentas de la empresa listas para administrar</p>
                <hr />

                {!this.state.crear ?
                  <>
                    <Row>
                      <Col md="9" xs="12" className="mx-auto my-2 d-flex p-0">
                        <div onClick={()=>this.setState({crear:true})} className="ml-auto btn-h bg-h-primary px-3 py-1 text-white">
                          <i className="fa fa-plus"></i> <b>Nueva</b>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="9" xs="12" className="mx-auto my-2">
                        <TableHook history={this.props.history} cuentas={this.state.cuentas} />
                      </Col>
                    </Row>
                  </>
                  :
                  <Row>
                    <Col md="9" xs="12" className="mx-auto my-2">
                      <Nueva close={()=>{this.setState({crear:false}); this.getCuentas()}} cliente={this.context.cliente} />
                    </Col>
                  </Row>
                }

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

}
export default Cuentas;
