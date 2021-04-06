import React, { useEffect, useState } from 'react';

import { Row, Col, Modal, ModalBody, ModalHeader } from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';
import Options from './Options';
import Asignar from './Asignar';


const Trabajadores = ({ cuentas,usuario, restart }) => {

  const [_cuentas, setCuentas] = useState([]);
  const [open, setOpen] = useState(false);

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

  useEffect(() => {
    if (cuentas.length === 0) return;
    let aux = [];
    cuentas.forEach(u => {
      let us = JSON.parse(u);
      aux.push({ ...JSON.parse(us.cuenta), cargo: us.tipo })
    })
    setCuentas([...aux]);
  }, [cuentas])

  const reload = () => {
    setOpen(!open);
    restart();
  }

  const ModalShow = ({ }) => {

    const [openAsignar, setOpenAsignar] = useState(false)

    return (
      <Modal size="xl" isOpen={open} toggle={() => setOpen(!open)}>
        <ModalHeader toggle={() => setOpen(!open)} style={{ backgroundColor: "#333333" }}>
          <p className="m-0 h5 text-white"><b>Trabajadores</b></p>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="10" xs="12" className="mx-auto">

              {!openAsignar ?
                <>
                  <p className="text-center mt-2"><b className="h4">Usuarios asignados</b> <span className="cursor-p ml-1 p-1 rounded bg-h-success text-white" onClick={() => setOpenAsignar(!openAsignar)}><i className="fa fa-plus "></i> Agregar</span> </p>
                  <Row>
                    <TableContainer className={classes.container} >
                      <Table stickyHeader>
                        <TableHead >
                          <TableRow>
                            <TableCell className="text-white" style={{ backgroundColor: "#333333" }}><b>Nombre</b></TableCell>
                            <TableCell className="text-white" style={{ backgroundColor: "#333333" }} align="center"><b>Estatus</b> </TableCell>
                            <TableCell className="text-white" style={{ backgroundColor: "#333333" }} align="right">Cargo </TableCell>
                            <TableCell style={{ backgroundColor: "#333333" }}></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {_cuentas.map((c, i) => {
                            return (
                              <TableRow key={i}>
                                <TableCell>{c.nombre}</TableCell>
                                <TableCell>{c.estatus}</TableCell>
                                <TableCell>{c.cargo}</TableCell>
                                <TableCell align="center">
                                  <Options usuario={usuario} cuenta={c} restart={()=>reload()} />
                                </TableCell>
                              </TableRow>
                            );
                          })}

                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Row>
                </>
                :
                <Asignar cancel={()=>setOpenAsignar(!openAsignar)} usuario={usuario} cuentas={cuentas} restart={()=>reload()} />
              }
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    );


  }

  return (
    <>
      <Col md="3" xs="12" className="p-3 m-0" >
        <Row onClick={() => setOpen(!open)} className="text-white m-0 px-0 py-3 shadow-h flex-column justyfy-content center cursor-p rounded" style={{ backgroundColor: "#333333" }} >
          <p className="h1 text-center"><b><i className="fa fa-briefcase"></i></b></p>
          <p className="text-center"><b>Cuentas</b></p>
        </Row>
      </Col>

      <ModalShow />
    </>

  );
}

export default Trabajadores;