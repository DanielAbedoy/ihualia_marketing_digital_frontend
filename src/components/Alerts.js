import React, { Component } from 'react';
import { useAlert, positions } from 'react-alert';

class Alerts extends Component {

    constructor(position) {
        this.alert = useAlert();

        this.position = positions.MIDDLE;
        if (position) this.alert.position = position;
    }

    styles = {
        textAlign: "center", width: "100%"
    }

    info = (mensaje, tiempo) => { this.alert.info(<div style={this.styles}>{mensaje}</div>, { timeout: tiempo, position: this.position }); this.alert.remove(this.alert) };
    error = (mensaje, tiempo) => { this.alert.error(mensaje, { timeout: tiempo, position: this.position }); this.alert.remove(this.alert) };
    show = (mensaje, tiempo) => { this.alert.show(<div style={this.styles}>{mensaje}</div>, { timeout: tiempo, position: this.position }); this.alert.remove(this.alert) };
    success = (mensaje, tiempo) => { this.alert.success(<div style={this.styles}>{mensaje}</div>, { timeout: tiempo, position: this.position }); this.alert.remove(this.alert) };

}

export default Alerts;