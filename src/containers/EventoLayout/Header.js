import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

class Header extends Component{

  render() {
    return (
      <header className={this.props.className}>
        <a href="https://ihualia.com.mx" >
          <img src={require('../../assets/img/brand/logo-no-fondo-balck.png')} />
        </a>
        <div className="social-buttons">
          <a className="fb"><i className="fa fa-facebook-official"></i></a>
          <a className="twt"><i className="fa fa-twitter"></i></a>
          <a className="goo"><i className="fa fa-google-plus-official"></i></a>
        </div>
      </header>
    );
  }

}

export default Header;