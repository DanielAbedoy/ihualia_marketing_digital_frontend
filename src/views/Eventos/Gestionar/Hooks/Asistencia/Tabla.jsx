import React, { useState, useEffect } from 'react';
import { Row, Col, Badge } from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const Tabla = ({ open, setOpen, asistentes, boletos }) => {

  const useStyles = makeStyles({
    container: {
      maxHeight: 540,
      boxShadow: "0px 5px 15px -6px rgba(0,0,0,0.75)"
    },
    head: {
      backgroundColor: "red"
    }
  });
  const classes = useStyles();

  const [bols, setBols] = useState({});

  useEffect(() => {
    let b = boletos.reduce((acc, el) => acc = { ...acc, [el.id]: el }, {});
    setBols(b);
  }, [boletos])

  const Row_Table = ({ asistente, boletos }) => {

    const [open, setOpen] = useState(false);

    return (
      <React.Fragment >
        <TableRow style={open ? { boxShadow: "0px -4px 13px -4px rgba(0,0,0,0.75)" } : {}} hover >
          <TableCell component="th" scope="row">{asistente.nombre}</TableCell>
          <TableCell align="center">{asistente.correo}</TableCell>
          <TableCell align="center">{asistente.telefono}</TableCell>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>

        <TableRow style={open ? { boxShadow: "0px 9px 13px -4px rgba(0,0,0,0.75)" } : {}}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10000}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Row className="pt-3 ">
                <Col md="10" xs="12" className="mx-auto py-3 border-bottom">
                  <p className="text-center m-0"><b>Nombre: {asistente.nombre}</b></p>
                  <p className="text-center m-0"><b>Correo: {asistente.correo}</b></p>
                  <p className="text-center m-0"><b>Telefono: {asistente.telefono}</b></p>
                  <p className="text-center m-0"><b>Fecha de Regitro: {asistente.fecha_agregado}</b></p>
                  {asistente.estatus_pago !== "" ?
                    <p className="text-center m-0"><b>Estatus: </b> {asistente.estatus_pago === "pagado" ? <Badge color="success">PAGADO</Badge> : <Badge color="danger">PENDIENTE</Badge>}</p> : <></>}
                </Col>
              </Row>
              <Row className="px-2 mt-3">
                <Col md="12" xl="9" xs="12" className="mx-auto">
                  <Row>
                  <Col md="4" xs="12">
                  <Row className="justify-content-center d-flex flex-column" >
                    <Col md="12" className="my-2 shadoy bg-events-light rounded px-3 py-2 d-flex">
                      <p className="m-0 text-white"><span className="h1 mr-2"><i className="fa fa-usd"></i></span>
                        <span className=""><b>Monto</b></span>
                        <span className="ml-2 h2"><b>{(asistente.monto_total * 1) === 0 ? "-" : `$ ${asistente.monto_total}`}</b></span>
                      </p>

                    </Col>
                    <Col md="12" className="my-2 shadoy bg-events-light rounded p-3">
                      <p className="m-0 text-white"><span className="h1 mr-2"><i className="fa fa-money"></i></span>
                        <span className=""><b>Donación</b></span>
                        <span className="ml-2 h2"><b>{asistente.donacion === "" ? "-" : `$ ${asistente.donacion}`}</b></span>
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col md="8" xs="12" className="p-3">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Boleto </th>
                        <th scope="col">Cantidad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {JSON.parse(asistente.boletos).data.map((b, i) => {
                        return (
                          <tr key={i}>
                            <td className="m-0 p-1"><b>{boletos[b.id] ? boletos[b.id].nombre : b.id}</b></td>
                            <td className="m-0 p-1">{b.cantidad}</td>
                          </tr>
                        );
                      })}

                    </tbody>
                  </table>
                </Col>
                </Row>
                </Col>
              </Row>

              {asistente.detalles !== "" ?
                <Row className="my-3">
                  <Col md="10" xs="12" className="mx-auto border-top">
                    <p className="text-cetner h5 text-center pt-3"><b>Detalles de Pago</b></p>
                    <p className="text-center m-0"><b>Tipo: {asistente.metodo_pago}</b></p>
                    {asistente.metodo_pago === "card" ?
                      <>
                        <p className="text-center m-0"><b>ID Pago: {JSON.parse(asistente.detalles).id_pago}</b></p>
                        <p className="text-center m-0"><b>ID Orden: {JSON.parse(asistente.detalles).id_orden}</b></p>
                      </>
                      :
                      <>
                        <p className="text-center m-0"><b>ID Pago: {JSON.parse(asistente.detalles).id}</b></p>
                        <p className="text-center m-0"><b>ID Orden: {JSON.parse(asistente.detalles).order_id}</b></p>
                        <p className="text-center m-0"><b>Número de Referencia: {JSON.parse(asistente.detalles).referencia}</b></p>
                        
                      </>
                    }
                  </Col>
                </Row>
                : ""
              }
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }


  return (
    <Row>
      <Col md="12">
        <TableContainer className={classes.container} >
          <Table>
            <TableHead >
              <TableRow>
                <TableCell className="text-white" style={{ backgroundColor: "#21f0779c" }} align="center"><b>Nombre</b></TableCell>
                <TableCell className="text-white" style={{ backgroundColor: "#21f0779c" }} align="center"><b>Correo</b></TableCell>
                <TableCell className="text-white" style={{ backgroundColor: "#21f0779c" }} align="center"><b>Telefono{/*  */}</b></TableCell>
                <TableCell className="text-white" style={{ backgroundColor: "#21f0779c" }} align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {asistentes.map((asistente, i) => {
                return <Row_Table key={i} asistente={asistente} boletos={bols} />
              })}

            </TableBody>
          </Table>
        </TableContainer>
      </Col>

    </Row>
  );
}

export default Tabla;