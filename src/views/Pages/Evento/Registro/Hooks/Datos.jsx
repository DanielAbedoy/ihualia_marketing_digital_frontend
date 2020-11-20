import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Input, CustomInput, Form } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';


import Personales from './Datos/Personales';
import CreditCard from './Datos/CreditCard';
import SelectMethodPay from './Datos/SelectMethodPay';

import EventoModel from '../../../../../models/Eventos';

const Datos = ({ articulos, total, cancel, setTotal, evento, setCompletado }) => {

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

    sendData();
  }

  const sendData = () => {
    if (total === 0 && !areDonaciones) completado(datosPerson, false)
    else if (pay_method === "card") completado(datosPerson, { pay_method: "card", datosCard: datosCard, donacion: areDonaciones, montos: { total: total, wDonacion: moneyData } });
    else if (pay_method === "oxxo") completado(datosPerson, { pay_method: "oxxo", donacion: areDonaciones, montos: { total: total, wDonacion: moneyData } });
  }

  const completado = async (datosPersonales, datosPago) => {
    //Verificar si noy hay pagos 
    //Saber si hay donacion
    let donacion = { are: false };
    let TOTAL = 0;
    if (datosPago && !datosPago.donacion) TOTAL = datosPago.montos.total;
    if (datosPago && datosPago.donacion) { donacion = { are: true, monto: datosPago.montos.wDonacion.donacion }; TOTAL = datosPago.montos.wDonacion.total_money };
    //Agregando los boletos
    let bolets = [];
    articulos.forEach(a => bolets.push({ id: a.id, cantidad: a.cantidad, }));


    if (!datosPago) { //No hay quepagar nada

      const resp = await new EventoModel().add_asistente(
        { evento: evento, correo: datosPersonales.correo, nombre: datosPersonales.nombre, telefono: datosPersonales.telefono, metodo_pago: "no", monto_total: "no", estatus_pago: "pagado" },
        bolets, donacion, { are: false }
      )
      if (resp.statusText === "OK") return alert("Credo correcatamente");
      else return alert("Algo salio mal");

    } else if (datosPago.pay_method === "oxxo") {

      pagarOxxo(
        { evento: evento, correo: datosPersonales.correo, nombre: datosPersonales.nombre, telefono: datosPersonales.telefono, metodo_pago: "oxxo", monto_total: TOTAL, estatus_pago: "por pagar" },
        bolets, donacion
      );

    } else if (datosPago.pay_method === "card") {
      pagarCard(
        { evento: evento, correo: datosPersonales.correo, nombre: datosPersonales.nombre, telefono: datosPersonales.telefono, metodo_pago: "card", monto_total: TOTAL, estatus_pago: "pagado" },
        datosPago.datosCard, bolets, donacion
      );
    }
    //verificar si hay donaciones
    //generar token
  }

  const pagarOxxo = async (dataPrin, boletos, donacion) => {
    let items_names = '';
    articulos.forEach(a => items_names += `(id:${a.id}) ` + a.title + "; ");

    const datos = { nombre: dataPrin.nombre, phone: dataPrin.telefono, email: dataPrin.correo, items_name: items_names, unit_price: (dataPrin.monto_total * 100), token_id: "" }

    const cargos = await new EventoModel().post_oxxo_pay(datos);
    if (cargos.charges.data) {

      const resp = await new EventoModel().add_asistente(
        dataPrin, boletos, donacion, { are: true, data: { tipo: "oxxo", referencia: cargos.charges.data[0].payment_method.reference } }
      )
      if (resp.statusText === "OK") {
        const referencia = cargos.charges.data[0].payment_method.reference;
        const barcode = cargos.charges.data[0].payment_method.barcode_url;
        const monto = (cargos.amount / 100)
        setCompletado("oxxo", { referencia, barcode, monto });
      }
      else return alert("Algo salio mal");
    }
  }

  const pagarCard = async (dataPrin,datosCard, boletos, donacion) => {

    let items_names = '';
    articulos.forEach(a => items_names += `(id:${a.id}) ` + a.title + "; ");

    const conekta = window.Conekta;
    conekta.setPublicKey("key_eYvWV7gSDkNYXsmr");
    conekta.setLanguage("es");
    const tokenParams = { "card": { "number": "4242424242424242", "name": "Fulanito Pérez", "exp_year": "2020", "exp_month": "12", "cvc": "123" } };

    //Creadno el token
    conekta.Token.create(tokenParams, async (token) => {
      const datos = { nombre: dataPrin.nombre, phone: dataPrin.telefono, email: dataPrin.correo, items_name: items_names, unit_price: (dataPrin.monto_total * 100), token_id: token.id }
      const cargos = await new EventoModel().post_card_pay(datos);

      if (cargos.charges.data) {
        const resp = await new EventoModel().add_asistente(
          dataPrin, boletos, donacion,
          { are: true, data: { tipo: "card", id_pago: cargos.charges.data[0].id, id_orden: cargos.charges.data[0].order_id} }
        )
        if (resp.statusText === "OK") {
          setCompletado("card", { data:cargos.charges.data[0] });
        }
        else return alert("Algo salio mal");
      }

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