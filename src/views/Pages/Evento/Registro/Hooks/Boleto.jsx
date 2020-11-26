import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Row, Col, CardFooter, Input } from 'reactstrap';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import EventoModel from '../../../../../models/Eventos';

import ItemsCarousel from 'react-items-carousel';

const Boleto = ({ boletos, carrito, total, setCarrito, asistentes }) => {

  const [bolets, setBolets] = useState([])
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const nunCards = window.screen.width > 540 ? window.screen.width > 1024 ? 3 : 2 : 1;


  const format_corrency = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });

  const optionsValues = (min, max) => {
    let nums = [];
    if (min > max) {
      nums.push(<option key={1}>{max}</option>);
    } else {
      for (let i = min; i <= max; i++) {
        nums.push(<option key={i}>{i}</option>);
      }
    }


    return nums;
  }

  const changeCarrito = (cantidad, boleto) => {

    let out = carrito.filter(b => b.id == boleto.id);
    let car = carrito.filter(b => b.id != boleto.id);

    if (cantidad === '0') {
      let total = total - out[0].monto;
      setCarrito(car, total)
      return;
    }
    let title = `${cantidad} x - ${boleto.nombre}`;
    let monto = 0;
    if (boleto.tipo === 'pago') monto = parseFloat(boleto.precio) * parseInt(cantidad, 10);
    else monto = 0.00;
    //Agregar el nuevo monto
    car.push({ id: boleto.id, title: title, monto: monto, tipo: boleto.tipo, cantidad: cantidad })
    let total = 0;
    car.forEach(a => total += a.monto);
    //this.setState({ carrito: car, total_carrito: total })
    setCarrito(car, total)
  }

  useEffect(() => {
    getCantidadesBoletos(boletos)

  }, [boletos])


  const getCantidadesBoletos = async (boletos) => {

    let bC = {};
    boletos.forEach(b => bC = { ...bC, [b.id]: 0 });
    asistentes.forEach(a => {
      const bols = JSON.parse(a.boletos).data;
      bols.forEach(bls => bC = { ...bC, [`${bls.id}`]: bC[`${bls.id}`] + (bls.cantidad * 1) });
    })

    boletos.forEach(boleto => {
      let cantidad_total = parseInt(boleto.cantida_total);
      let cantidad_maxima = parseInt(boleto.cantidad_maxima);
      //let cantidad = vendidos.data.find(v => v.boleto == boleto.id).vendidos;
      let cantidad = bC[`${boleto.id}`];

      const cantidad_gnrl = cantidad_total - cantidad;
      let cantidad_a_mostrar = 0;
      if (cantidad_gnrl < cantidad_maxima) cantidad_a_mostrar = cantidad_gnrl;
      else cantidad_a_mostrar = cantidad_maxima;
      boleto.cantidad_a_mostrar = cantidad_a_mostrar;
    });
    setBolets(boletos);
  }

  return (
    <div style={{ padding: `0 ${40}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={nunCards}
        gutter={22}
        leftChevron={<i className="fa fa-chevron-left"></i>}
        rightChevron={<i className="fa fa-chevron-right"></i>}
        outsideChevron
        chevronWidth={40}

      >
        {bolets.map((boleto, i) => {
          return (
            <div key={i} style={{ height: "70vh" }}>
              <Row className="m-0 p-0 bg-white rounded flex-column" style={{ height: "100%" }}>

                <p className={`text-center py-2 rounded-top m-0 text-white bg-h-${boleto.tipo === "gratis" ? "success" : boleto.tipo === "pago" ? "primary" : "warning"}`}
                ><b>{boleto.nombre}</b></p>

                <p className="text-center mt-3 h1"><b>{format_corrency.format(boleto.precio)}</b></p>
                <p className="text-center mt-2 mb-0" ><b>Aquierelo: {boleto.canal_ventas}</b></p>

                <p className="text-center px-2 my-auto text-muted" ><b>{boleto.descripcion} </b></p>
              
                {boleto.cantidad_a_mostrar === 0 ?
                  <p className="text-center h4 m-0"><b>AGOTADO</b></p>
                  : <>
                    <p className="text-center text-muted m-0">Agrega tus Boletos</p>
                    <Input type="select" className="mt-1 mx-auto" style={{ width: "50%" }}
                      onChange={(e) => changeCarrito(e.target.value, boleto)}
                    >
                      <option>0</option>
                      {optionsValues(boleto.cantidad_minima, boleto.cantidad_a_mostrar)}
                    </Input></>
                }
                <p className={`text-center text-white mt-auto mb-0 py-2 bg-h-${boleto.tipo === "gratis" ? "success" : boleto.tipo === "pago" ? "primary" : "warning"}`} ><b>Boleto de tipo: {boleto.tipo.toUpperCase()}</b></p>
              </Row>
            </div>
          );
        })}

      </ItemsCarousel>
    </div>
  );

}

export default Boleto;