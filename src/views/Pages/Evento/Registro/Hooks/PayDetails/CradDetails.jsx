import React from 'react';
import { Col } from 'reactstrap';

const CardDetails = ({ data }) => {

  const format_currency = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2

  });

  return (
    <Col md="8" xs="10" className="mx-auto mt-3 mb-3 border-top border-bottom">
      <p className="text-center h4">Aqui pueden ir algunos datos del pago</p>
      <p className="text-center h5"><b>Id: </b> {data.id}</p>
      <p className="text-center h5"><b>Orden: </b> {data.order_id}</p>
      <p className="text-center h5"><b>Monto: </b> {format_currency.format((data.amount / 100))} MXN</p>
      <p className="text-center h5"><b>Tipo de Tajeta: </b>{data.payment_method.type.toUpperCase()} / {data.payment_method.brand.toUpperCase()} /  {data.payment_method.account_type}</p>
      <p className="text-center h5"><b>Tajeta: </b> .....{data.payment_method.last4}</p>
    </Col>
  );
}

export default CardDetails;