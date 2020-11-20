import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Row, Col, CardFooter, Input } from 'reactstrap';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import EventoModel from '../../../../../models/Eventos';

const Boleto = ({ boletos, carrito, total, setCarrito }) => {

  const [bolets, setBolets] = useState([])

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

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
    getCantidadesBoletos()
  }, [boletos])

  const getCantidadesBoletos = async () => {

    let arr_bolets = [];
    boletos.forEach(b => arr_bolets.push(`${b.id}`));

    const vendidos = await new EventoModel().get_cantidad_boletos_vendidos(arr_bolets);
    if (vendidos.statusText !== "OK") return;

    boletos.forEach(boleto => {
      let cantidad_total = parseInt(boleto.cantida_total);
      let cantidad_maxima = parseInt(boleto.cantidad_maxima);
      let cantidad = vendidos.data.find(v => v.boleto == boleto.id).vendidos;

      const cantidad_gnrl = cantidad_total - cantidad;
      let cantidad_a_mostrar = 0;
      if (cantidad_gnrl < cantidad_maxima) cantidad_a_mostrar = cantidad_gnrl;
      else cantidad_a_mostrar = cantidad_maxima;
      boleto.cantidad_a_mostrar = cantidad_a_mostrar;

    });
    setBolets(boletos);
  }

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={false}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={false}
      autoPlay={false}
      containerClass="carousel-container zIndxHigh"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      slidesToSlide={1}
    >
      {bolets.map((boleto, i) => {
        return (
          <div key={i} className="px-4" style={{ height: "64vh" }}>
            <Card className="card-boleto-h" style={{ height: "100%" }}>
              <CardHeader className="bg-info p-1">
                <p className="text-center m-0 text-white">{boleto.nombre}</p>
              </CardHeader>
              <CardHeader className="bg-primary">
                <p className="text-center h3 text-white">{format_corrency.format(boleto.precio)}</p>
                <p className="text-center text-white mt-2 mb-0" ><b>Aquierelo: {boleto.canal_ventas}</b></p>
              </CardHeader>
              <CardBody className="px-3 d-flex align-items-center flex-column">
                <p className="text-center" ><b>{boleto.descripcion}</b></p>
                <hr />

                {boleto.cantidad_a_mostrar === 0 ?
                  <p className="text-center h4 m-0"><b>AGOTADO</b></p>
                  :<>
                  <p className="text-center text-muted m-0">Agrega tus Boletos</p>
                  <Input type="select" className="mt-1 mx-auto" style={{ width: "50%" }}
                    onChange={(e) => changeCarrito(e.target.value, boleto)}
                  >
                    <option>0</option>
                    {optionsValues(boleto.cantidad_minima, boleto.cantidad_a_mostrar)}
                  </Input></>
                }

              </CardBody>
              <CardFooter className="bg-primary p-0 m-0">
                <p className="text-center m-0 p-0" ><b>Boleto de tipo: {boleto.tipo.toUpperCase()}</b></p>
              </CardFooter>
            </Card>
          </div>
        );
      })}

    </Carousel>
  );

}

export default Boleto;