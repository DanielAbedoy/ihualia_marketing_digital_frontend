import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Input, CustomInput, Form } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';
import { confirmAlert } from 'react-confirm-alert';
import d from '../../../../../assets/css/alert-confirm.css';

import Personales from './Datos/Personales';
import CreditCard from './Datos/CreditCard';
import SelectMethodPay from './Datos/SelectMethodPay';

import EventoModel from '../../../../../models/Eventos';

const Datos = ({ articulos, total, cancel, setTotal, evento, setCompletado, history, url, MONTO }) => {

  const { addToast } = useToasts();
  const [areDonaciones, setAreDonaciones] = useState(false);
  const [moneyData, setMoneyData] = useState({ total_money: 0, donacion: 0 });;
  const [pay_method, setPayMethod] = useState('');
  const [focus, setFocus] = useState('');
  const [datosCard, setDatosCard] = useState({ cvc: "", expiry: "", name: "", number: "" });
  const [datosPerson, setDatosPerson] = useState({ correo: "", nombre: "", telefono: "" });

  useEffect(() => {
    setMoneyData({ ...moneyData, total_money: total });
    let f = false;
    articulos.forEach(a => { if (a.tipo === 'donacion') f = true; })
    setAreDonaciones(f)
  }, [])


  const handleInputFocus = (e) => {
    setFocus(e.target.name)
  }

  const add_donacion = e => {
    if (e.target.value === '') {
      setMoneyData({ total_money: total, donacion: 0 });
      setTotal(0);
    }
    else {
      let d = total + parseInt(e.target.value, 10);
      setMoneyData({ total_money: d, donacion: parseInt(e.target.value, 10) });
      setTotal(d);
    }
  }

  const validar = () => {
    let exp_reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (datosPerson.nombre === '' || datosPerson.telefono === '') {
      addToast("Debes agregar toda la información", { appearance: "info", autoDismiss: true });
      return;
    }
    if (!exp_reg.test(datosPerson.correo)) {
      addToast("Debes agregar un correo real", { appearance: "info", autoDismiss: true });
      return;
    }
    if (moneyData.total_money !== 0) {
      if (pay_method === 'card') {
        if (datosCard.number === '' || datosCard.name === '' || datosCard.expiry === '' || datosCard.cvc === '') {
          addToast("Debes agregar todos los datos de la targeta", { appearance: "info", autoDismiss: true });
          return;
        }
      }
    }
    if (areDonaciones && (moneyData.donacion === 0 || moneyData.donacion === "")) {
      addToast("Debes agregar una donacion", { appearance: "info", autoDismiss: true });
      return;
    }

    completar();
  }

  const error = () => {
    confirmAlert({ title: "Error", message: "Lamentablemente algo salio mal", buttons: [{ label: "Continuar", onClick: () => history.push(`/evento/${url}`) }] });
  }

  const completar =async () => {
    let bolets = [];
    articulos.forEach(a => bolets.push({ id: a.id, cantidad: a.cantidad, }));
    const datosToSave = { "correo": datosPerson.correo,telefono:datosPerson.telefono, "nombre": datosPerson.nombre, "boletos": JSON.stringify({ data: bolets }), "id_evento": evento };

    if (!areDonaciones && total === 0) { 
      const resp =await  new EventoModel().add_asistente(datosToSave)
      if (resp.statusText === "Created") {
        confirmAlert({ title: "Exito", message: "Todo salio correctamente", buttons: [{ label: "Continuar", onClick: () => history.push(`/evento/${url}`) }] });
      }
      else error();
    }
    else if (pay_method === "oxxo") pagarOxxo(datosToSave);
    else if (pay_method === "card") pagarCard(datosToSave);
    
  }
  
  const pagarOxxo = async (data) => {
    let items_names = '';
    articulos.forEach(a => items_names += `(id:${a.id}) ` + a.title + "; ");

    const datos = {
      nombre: datosPerson.nombre, phone: datosPerson.telefono, email: datosPerson.correo,
      items_name: items_names, unit_price: MONTO*100, token_id: ""
    }

    const cargos = await new EventoModel().post_oxxo_pay(datos);
    if (cargos.charges) {

      //{ are: true, data: { tipo: "oxxo",} }
      const resp = await new EventoModel().add_asistente({
        ...data, donacion: areDonaciones ? moneyData.donacion : "", metodo_pago: "oxxo", monto_total: MONTO,
        estatus_pago: "pendiente",
        detalles: JSON.stringify({ referencia: cargos.charges.data[0].payment_method.reference, id: cargos.charges.data[0].id, order_id: cargos.charges.data[0].order_id })
      })
      if (resp.statusText === "Created") {
        const referencia = cargos.charges.data[0].payment_method.reference;
        const barcode = cargos.charges.data[0].payment_method.barcode_url;
        const monto = (cargos.amount / 100)
        setCompletado("oxxo", { referencia, barcode, monto });
      }
      else error();
    } 
  }
  

  const pagarCard = async (data) => {

    let items_names = '';
    articulos.forEach(a => items_names += `(id:${a.id}) ` + a.title + "; ");

    const conekta = window.Conekta;
    conekta.setPublicKey("key_eYvWV7gSDkNYXsmr");
    conekta.setLanguage("es");
    const tokenParams ={ "card": { "number": "4242424242424242", "name": "Fulanito Pérez", "exp_year": "2020", "exp_month": "12", "cvc": "123" } };

    //Creadno el token
    conekta.Token.create(tokenParams, async (token) => {
      const datos = {
        nombre: datosPerson.nombre, phone: datosPerson.telefono, email: datosPerson.correo,
        items_name: items_names, unit_price: MONTO*100, token_id: token.id
      }

      const cargos = await new EventoModel().post_card_pay(datos);
      if (cargos.charges) {
        const resp = await new EventoModel().add_asistente({
          ...data, donacion: areDonaciones ? moneyData.donacion : "", metodo_pago: "card", monto_total: MONTO,
          estatus_pago: "pagado",
          detalles: JSON.stringify({ id_pago: cargos.charges.data[0].id, id_orden: cargos.charges.data[0].order_id})
        })
        if (resp.statusText === "Created") setCompletado("card", { data: cargos.charges.data[0] });
        else error();
      }else error();
    })

  }



  return (
    <Row>
      <Col xl="8" lg="10" md="12" className="border-bottom mt-2 ml-auto mr-auto">
        <p className="h4 m-0"><span className="h3"></span> Datos</p>
        <p>Para finalizar llena la siguiente información</p>
      </Col>

      <Personales areDonaciones={areDonaciones} add_donacion={add_donacion} setDatosPerson={setDatosPerson} datosPerson={datosPerson} />


      {(total !== 0 || moneyData.donacion != 0) ?
        <>
          <SelectMethodPay setPayMethod={setPayMethod} />

          {pay_method === 'card' ?
            <CreditCard datosCard={datosCard} handleInputFocus={handleInputFocus} focus={focus} setDatosCard={setDatosCard} />
            : <>
              {pay_method === 'oxxo' ?
                <Col md="10" xs="12" className="mx-auto border-top mt-3" >
                  <p className="h6 mt-3 text-center"><b>Al finalizar se genera una ficha digital para realizar el pago, contiene un numero de referencia único</b></p>
                </Col>
                : <></>
              }
            </>
          }
        </>
        : <></>
      }

      {pay_method !== "" || (total === 0 && !areDonaciones) ?
        <Col md="12" className="my-3">
          <Row className="mt-3" >
            <Col md="3" xs="6" className="ml-auto"><Button color="success" block onClick={validar}>Finalizar</Button></Col>
            <Col md="3" xs="6"><Button color="danger" block onClick={() => cancel()}>Cancelar</Button></Col>
          </Row>
        </Col>
        :
        <Col md="12" className="my-3">
          <Row className="mt-3" >
            <Col className="ml-auto" md="3" xs="6"><Button color="danger" block onClick={() => cancel()}>Cancelar</Button></Col>
          </Row>
        </Col>
      }
    </Row>
  );
}

export default Datos;