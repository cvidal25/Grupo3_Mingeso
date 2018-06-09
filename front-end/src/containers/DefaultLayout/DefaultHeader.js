import React, { Component } from 'react';
import  { Redirect, Link } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Row, Col, Input, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { GoogleLogout } from 'react-google-login';
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import {connect} from 'react-redux'
import salirCuenta from '../../actionCreators';
import store from '../../store';

const propTypes = {
  children: PropTypes.node,

};

const defaultProps = {};
const responseGoogle = (response) => {
  console.log(response);
};

class DefaultHeader extends Component {
  render() {
    const { children,  ...attributes } = this.props;
     console.log("potoo");
    console.log(this.props);
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
              <Nav className="d-md-down-none" navbar>
                {/*<NavItem className="px-3">
                  <NavLink href="/">Dashboard</NavLink>
                </NavItem>
                <NavItem className="px-3">
                  <NavLink href="#">Users</NavLink>
                </NavItem>
                <NavItem className="px-3">
                  <NavLink href="#">Settings</NavLink>
                </NavItem>*/}
              </Nav>
             
              <Nav className="ml-auto" navbar>



              <div className="ml-auto text-center" >
                
                 <strong>{this.props.infoUsuarios.nombre}</strong>
              </div>
              <div className="ml-auto text-center" ></div>
                {/*<NavItem className="d-md-down-none">
                  <NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
                </NavItem>
                <NavItem className="d-md-down-none">
                  <NavLink href="#"><i className="icon-list"></i></NavLink>
                </NavItem>
                <NavItem className="d-md-down-none">
                  <NavLink href="#"><i className="icon-location-pin"></i></NavLink>
                </NavItem>*/}
                <AppHeaderDropdown direction="down">
                  <DropdownToggle nav>
                    <span className="navbar-toggler-icon"/> 
                  </DropdownToggle>
                  <DropdownMenu right style={{ right: 'auto' }}>
                   <DropdownItem header tag="div" className="text-center"><strong>Cuenta</strong></DropdownItem>
                   <Link to={{
                      pathname: '/Login',
                      //state: {this.props. }
                    }}>
                       <DropdownItem  className="text-center" onClick={()=> this.props.salirCuenta(this.props.infoUsuario)}>
                        <i className="fa fa-lock"></i> Salir
                        </DropdownItem>
                    </Link>
                   
                   
                  </DropdownMenu>
                </AppHeaderDropdown>
              </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = state =>{
  return{
    infoUsuarios: state.infoUsuarios
  };
};

const mapDispatchToProps = dispatch => {
  return{
    salirCuenta(infoUsuario){
    store.dispatch({
        type:"lOG_OUT",
        infoUsuario: infoUsuario,
    });
}
  };
};



export default connect(mapStateToProps,mapDispatchToProps)(DefaultHeader);
