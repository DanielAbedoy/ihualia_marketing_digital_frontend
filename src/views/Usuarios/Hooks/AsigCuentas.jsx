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

const AsigCuentas = ({ setCuentas, filter }) => {

  const [cuentasH, setCuentasH] = useState([])
  const context = useContext(SessionContext);

  const useStyles = makeStyles({
    container: { maxHeight: 540, boxShadow: "0px 5px 15px -6px rgba(0,0,0,0.75)" },
    chekMain: { color: "#ffffff", '&$checked': { color: "#15ff00" } },
    checked: {},
  });
  const classes = useStyles();

  useEffect(() => {
    if (filter) return;
    new ModelMarketing().get_cuentas_cliente(context.cliente)
      .then(cuentas => {
        cuentas.forEach(c => c["selected"] = false);
        setCuentasH([...cuentas]);
      })
      .catch(e=>"error")
  },[])

  useEffect(() => {
    if (!filter) return;

    let aux = [];
    new ModelMarketing().get_cuentas_cliente(context.cliente)
      .then(cuentas => {
        cuentas.forEach(c => {
          if (!filter.find(f => JSON.parse(JSON.parse(f).cuenta).id == c.id)) {
            aux.push(c);
          }
        });

        aux.forEach(c => c["selected"] = false);
        setCuentasH([...aux])
      })    
    
  },[filter])

  useEffect(() => {
    let aux = [];
    cuentasH.forEach(c => { if (c.selected === true) aux.push({ cuenta: c.id, cargo: c.cargo }) });
    setCuentas(aux);
  },[cuentasH])

  const selectAll = (value) => {
    cuentasH.forEach(c => { c["selected"] = value; c["cargo"] = "" });
    setCuentasH([...cuentasH]);
  }

  const setSelected = (value, cuenta) => {
    cuentasH.forEach(c => { if (c.id === cuenta) { c["selected"] = value; c["cargo"] = "" } });
    setCuentasH([...cuentasH]);
  }

  const setCargo = (value, cuenta) => {
    cuentasH.forEach(c => { if (c.id === cuenta) c["cargo"] = value });
    setCuentasH([...cuentasH]);
  }

  const RowTable = ({ cuenta }) => {

    const useStyles = makeStyles({
      chekM: { color: "#333333", '&$checked': { color: "#15ff00" } },
      checked: {},
    })
    const classeM = useStyles();
  
    return (
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            checked={cuenta.selected} onChange={(e)=> setSelected(e.target.checked, cuenta.id)}
            classes={{ root: classeM.chekM, checked: classeM.checked }}
          />
        </TableCell>
        <TableCell >{cuenta.nombre}</TableCell>
        <TableCell >{cuenta.estatus}</TableCell>
        <TableCell align="right">
          <Input disabled={!cuenta.selected} value={cuenta.cargo} onChange={(e)=>setCargo(e.target.value, cuenta.id)} type="select">
            <option value=""></option>
            <option value="Responsable">Responsable</option>
            <option value="Apoyo">Apoyo</option>
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
                  onChange={(e) => selectAll(e.target.checked)}
                  classes={{ root: classes.chekMain, checked: classes.checked }}
                />
              </TableCell>
              <TableCell className="text-white" style={{ backgroundColor: "#333333" }} align="center"><b>Nombre</b> </TableCell>
              <TableCell className="text-white" style={{ backgroundColor: "#333333" }} align="center">Estatus </TableCell>
              <TableCell className="text-white" style={{ backgroundColor: "#333333" }} align="center">Cargo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cuentasH.map((cuenta,i) => <RowTable key={i} cuenta={cuenta} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </Row>
  );
}

export default AsigCuentas;