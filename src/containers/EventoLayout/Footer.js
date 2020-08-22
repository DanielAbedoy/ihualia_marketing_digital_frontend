import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

class Footer extends Component{

  render() {
    return (
      <footer>
        <span><a href="https://ihualia.com.mx">Ihualia</a> &copy; 2020 Ihualia Software, S.A. de C.V.</span><br/>
        <span className="powered">Powered by <a href="https://ihualia.com.mx">Equipo Dual TESE Sistemas</a></span>
      </footer>
    );
  }

}

export default Footer;