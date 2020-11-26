import React from 'react';
import { Row, Col } from 'reactstrap';
import Boleto from './Boleto';

const Main = ({ boletos, carrito, total, setCarrito, asistentes }) => {



  return (
    <Row>
      <Boleto
        boletos={boletos}
        carrito={carrito}
        total={total}
        setCarrito={setCarrito}
        asistentes={asistentes}
      />
    </Row>
  );
}

export default Main;