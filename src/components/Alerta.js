import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const Alerta = (props) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

    return (
      
        <Alert color={this.props.color} isOpen={visible} toggle={onDismiss}>
            {this.props.texto}
        </Alert>
    );
}

export default Alerta;