import React, { useState } from 'react';
import { Row, Col, Collapse, Navbar, NavbarToggler, Nav, NavItem,NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';

//Items
import items from '../items';

const NavBar = (props) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
       <Row>
        <Col md="12" xs="12">
          <Navbar color="light" light expand="md">
            <NavbarBrand><p className="h3"><i className="fa fa-envelope-o"></i> EmailMarketing |</p></NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav navbar>
                {items.map((item, indx) => {
                  if (item.visible === false) return;
                  return (
                      <NavItem className="h5 ml-3 mr-3" key={indx}>
                        <Link to={item.path}>{item.name}</Link>
                      </NavItem>
                  );
                })}
              </Nav>
            </Collapse>
          </Navbar>
        </Col>
      </Row>

    </div>
  );
}

export default NavBar;


