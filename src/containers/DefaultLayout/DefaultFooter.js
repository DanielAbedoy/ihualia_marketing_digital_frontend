import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href="https://ihualia.com.mx">Ihualia</a> &copy; 2020 Ihualia Software, S.A. de C.V.</span>
        <span className="ml-auto">Powered by <a href="https://ihualia.com.mx">Equipo Dual TESE Informática</a></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
