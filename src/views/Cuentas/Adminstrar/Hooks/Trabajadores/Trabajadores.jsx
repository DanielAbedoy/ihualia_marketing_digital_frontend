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


const Trabajadores = ({ usuarios,cuenta, restart }) => {

  const [_users, setUsers] = useState([]);
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
    if (usuarios.length === 0) return;
    let aux = [];
    usuarios.forEach(u => {
      let us = JSON.parse(u);
      aux.push({ ...JSON.parse(us.usuario), cargo: us.tipo })
    })
    setUsers([...aux]);
  }, [usuarios])

  const cargar_again = () => {
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
                            <TableCell className="text-white" style={{ backgroundColor: "#333333" }} align="center"><b>Usuario</b> </TableCell>
                            <TableCell className="text-white" style={{ backgroundColor: "#333333" }} align="right">Correo </TableCell>
                            <TableCell className="text-white" style={{ backgroundColor: "#333333" }} align="right">Estatus </TableCell>
                            <TableCell className="text-white" style={{ backgroundColor: "#333333" }} align="right">Cargo </TableCell>
                            <TableCell style={{ backgroundColor: "#333333" }}></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {_users.map((u, i) => {
                            return (
                              <TableRow key={i}>
                                <TableCell>{u.nombre}</TableCell>
                                <TableCell>{u.usuario}</TableCell>
                                <TableCell>{u.correo}</TableCell>
                                <TableCell>{u.estatus}</TableCell>
                                <TableCell>{u.cargo}</TableCell>
                                <TableCell align="center">
                                  <Options usuario={u} cuenta={cuenta} restart={()=>cargar_again()} />
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
                <Asignar cancel={()=>setOpenAsignar(!openAsignar)} usuarios={usuarios} cuenta={cuenta} restart={()=>cargar_again()} />
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
          <p className="h1 text-center"><b><i className="fa fa-male"></i></b></p>
          <p className="text-center"><b>Trabajadores</b></p>
        </Row>
      </Col>

      <ModalShow />
    </>

  );
}

export default Trabajadores;