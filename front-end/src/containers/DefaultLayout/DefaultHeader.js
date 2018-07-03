import React, { Component } from 'react';
import  {  Link } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Row, Col, Input, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { GoogleLogout } from 'react-google-login';
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import {connect} from 'react-redux'
import salirCuenta from '../../actionCreators';
import store from '../../store';
import jwt from 'jsonwebtoken';
import '../../scss/spinner.css';

const propTypes = {
  children: PropTypes.node,

};

const defaultProps = {};
const responseGoogle = (response) => {
  //console.log(response);
};

class DefaultHeader extends Component {
     constructor () {
    super();
    this.state = {
    infoUsuario: "",
    obtenerUsuario:"",
    espera:false,
    exist:false,
    exist2:false,

    };
    this.notUser=this.notUser.bind(this);
    this.showName = this.showName.bind(this);
    this.obtener=this.obtener.bind(this);
    this.agregarUsuario = this.agregarUsuario.bind(this);
    this.comprobarUsuario = this.comprobarUsuario.bind(this);
    this.guardarDatos = this.guardarDatos.bind(this);
    this.respaldo = this.respaldo.bind(this);
  }

  componentWillMount(){
    this.comprobarUsuario(this.props.infoUsuarios);
    this.respaldo();
    this.setState({ 
      espera:false,
    })
  }
  respaldo(){
    if(this.props.infoUsuarios !== null || this.props.infoUsuarios !== '' ){
      var aux=this.obtener();
      this.setState({
          obtenerUsuario:aux
      });
      this.agregarUsuario(aux);
      
    }
  };
  guardarDatos(){
    //console.log("guarde");
    //console.log(this.props.infoUsuarios,"INF");
    var token=jwt.sign(this.props.infoUsuarios,'secret');
    sessionStorage.setItem("AlumnoRespaldo",token);
    //this.obtener();
  };

  comprobarUsuario(tipoUsuario){
    if((tipoUsuario==='') || (tipoUsuario=== null )|| (tipoUsuario=== undefined )){
      var result = this.obtener();
      if((result ==='') || (result === null )|| (result === undefined )){
        this.notUser(this.props.infoUsuarios);
      }
      else{
        this.props.setUsuario(result);
        this.agregarUsuario(result);
      }
    }
    else{
      this.setState({ 
        espera:false,
      })
      this.guardarDatos();
    }

  };

  notUser(tipoUsuario){
    if((tipoUsuario==='') || (tipoUsuario=== null )){
      if((window.location.href == 'http://localhost:3000/Login')||(window.location.href == 'http://localhost:3000/Login/')||(window.location.href == 'http://localhost:3000/#/Login')||(window.location.href =='http://localhost:3000/Login#/')||(window.location.href =='http://localhost:3000/#/')){

      }
      else{
        window.location.replace('/#/Login');
      }
    }
  };
  obtener(){
    //console.log("obtener");
    //console.log(jwt.decode(sessionStorage.getItem("AlumnoRespaldo")),"buenaaaa");
    return(jwt.decode(sessionStorage.getItem("AlumnoRespaldo")));
  };






  showName(props){
    if(props.infoUsuarios==null){
      if((window.location.href == 'http://localhost:3000/Login')||(window.location.href == 'http://localhost:3000/Login/')||(window.location.href == 'http://localhost:3000/#/Login')||(window.location.href =='http://localhost:3000/Login#/')||(window.location.href =='http://localhost:3000/#/')){

      }
      else{
        window.location.replace('/#/Login');
      }
    }
    else{
      return <strong>{this.props.infoUsuarios.userName}</strong>
    }
  }
  
  render() {
    const { children,  ...attributes } = this.props;
    return (
      (this.state.espera)?<div  className='defaultSpinner'></div>
      :<React.Fragment>
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
                {this.showName(this.props)}
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
  agregarUsuario(infoUsuario){
    //console.log(infoUsuario);
      store.dispatch({
      type:"LOG_IN",
      infoUsuario: infoUsuario,
  });  
    
  this.setState({ 
    espera:false,
  })
  
    
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
