import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import './ficha_styles.css';

const OxxoTicket = ({monto, referencia, barcode}) => {

  
  const format_currency = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2

  });

  return (
    <div className="opps">
			<div className="opps-header">
				<div className="opps-reminder">Ficha digital. No es necesario imprimir.</div>
				<div className="opps-info">
					<div className="opps-brand"><img src={require('../../../../../../../assets/img/fondos/oxxopay_brand.png')} alt="OXXOPay" /></div>
					<div className="opps-ammount">
						<h3>Monto a pagar</h3>
						<h2>{format_currency.format(monto)} <sup>MXN</sup></h2>
						<p className="mb-0 ">OXXO cobrará una comisión adicional al momento de realizar el pago.</p>
						<p className="m-0 p-0">Esta ficha expira en 30 días.</p>
					</div>
				</div>
				<div className="opps-reference">
					<h3>Referencia</h3>
					<p className="p-h1 h1">{referencia}</p>
				</div>
			</div>
			<Row>
					<Col md="5" xs="5" className="mx-auto p-0 mt-1">
						<img width="100%" src={barcode} alt="OXXOPay" />
				</Col>
				</Row>
			<div className="opps-instructions">
				<h3>Instrucciones</h3>
				<ol>
					<li>Acude a la tienda OXXO más cercana. <a href="https://www.google.com.mx/maps/search/oxxo/" target="_blank">Encuéntrala aquí</a>.</li>
					<li>Indica en caja que quieres realizar un pago de <strong>OXXOPay</strong>.</li>
					<li>Dicta al cajero el número de referencia en esta ficha para que tecleé directamete en la pantalla de venta.</li>
					<li>Realiza el pago correspondiente con dinero en efectivo.</li>
					<li>Al confirmar tu pago, el cajero te entregará un comprobante impreso. <strong>En el podrás verificar que se haya realizado correctamente.</strong> Conserva este comprobante de pago.</li>
				</ol>
				<div className="opps-footnote">Al completar estos pasos recibirás un correo del organizador confirmando tu pago.</div>
			</div>
		</div>
  );
}

export default OxxoTicket;
