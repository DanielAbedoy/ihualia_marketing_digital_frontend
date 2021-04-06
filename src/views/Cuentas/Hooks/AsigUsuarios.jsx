import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Input } from 'reactstrap';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import ModelMarketing from '../../../models/Marketing';
import { SessionContext } from '../../../sessionContext';

const AsigUsuarios = ({ setUsuarios, filter }) => {

  const context = useContext(SessionContext);
  const [usuarios, setUsuariosH] = useState([]);

  const useStyles = makeStyles({
    container: { maxHeight: 540, boxShadow: "0px 5px 15px -6px rgba(0,0,0,0.75)" },
    chekMain: { color: "#ffffff", '&$checked': { color: "#15ff00" } },
    chek: { color: "#333333", '&$checked': { color: "#15ff00" } },
    checked: {},
  });
  const classes = useStyles();

  useEffect(() => {
    if (filter) return;
    new ModelMarketing().get_usuarios_cliente(context.cliente)
      .then(users => {
        users.forEach(u => u["selected"] = false);
        setUsuariosH([...users]);
      })
      .catch(err => err)
  }, [])

  useEffect(() => {
    
    if (!filter) return;
    let aux = [];
    new ModelMarketing().get_usuarios_cliente(context.cliente)
      .then(users => {
        users.forEach(u => {
          if (!filter.find(f => JSON.parse(JSON.parse(f).usuario).correo == u.correo)) {
            aux.push(u);
          }
        });

        aux.forEach(u => u["selected"] = false);
        setUsuariosH([...aux])
      })    
    
  },[filter])

  useEffect(() => {
    let aux = [];
    usuarios.forEach(u => { if (u["selected"] === true) aux.push({ usuario: u.id, cargo: u.cargo }) });
    setUsuarios(aux)
  }, [usuarios])

  const selectAll = (value) => {
    usuarios.forEach(u => { u["selected"] = value; u["cargo"] = "" });
    setUsuariosH([...usuarios]);
  }

  const selected = (value, usuario) => {
    usuarios.forEach(u => { if (u.correo === usuario) { u["selected"] = value; u["cargo"] = "" } });
    setUsuariosH([...usuarios]);
  }

  const setCargo = (value, usuario) => {
    usuarios.forEach(u => { if (u.correo === usuario) u["cargo"] = value });
    setUsuariosH([...usuarios]);
  }

  const RowTable = ({ usuario }) => {

    return (
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            checked={usuario.selected}
            onChange={e => selected(e.target.checked, usuario.correo)}
            classes={{ root: classes.chek, checked: classes.checked, }}
          />

        </TableCell>
        <TableCell >{usuario.nombre}</TableCell>
        <TableCell >{usuario.correo}</TableCell>
        <TableCell align="right">
          <Input disabled={!usuario.selected} value={usuario.cargo} onChange={e=>setCargo(e.target.value, usuario.correo)} type="select">
            <option value=""></option>
            <option value="responsable">Responsable</option>
            <option value="apoyo">Apoyo</option>
          </Input>

        </TableCell>
      </TableRow>
    );

  }

  return (
    <Row className="px-3 my-2">
      <TableContainer className={classes.container} >
        <Table stickyHeader>
          <TableHead >
            <TableRow>
              <TableCell padding="checkbox" className="text-white" style={{ backgroundColor: "#333333" }}>
                <Checkbox
                  onChange={e => selectAll(e.target.checked)}
                  classes={{ root: classes.chekMain, checked: classes.checked, }}
                />
              </TableCell>
              <TableCell className="text-white" style={{ backgroundColor: "#333333" }} align="center"><b>Nombre</b> </TableCell>
              <TableCell className="text-white" style={{ backgroundColor: "#333333" }} align="center">Correo </TableCell>
              <TableCell className="text-white" style={{ backgroundColor: "#333333" }} align="center">Cargo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((u, i) => <RowTable key={i} usuario={u} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </Row>
  );
}

export default AsigUsuarios;