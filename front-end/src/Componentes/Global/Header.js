import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component{

    handleRefresh = event =>{
        window.location.reload();
    }

    render(){
        return(
          
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
              <a className="navbar-brand">
                  <h3 style={{color: "white"}}>
                      Try-Code
                  </h3>
              </a>
              <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                      data-target="#navbarResponsive">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                  <ul className="navbar-nav mr-auto" id="exampleAccordion">
                    <li className="nav-item" data-toggle="tooltip" data-placement="right">
                                <Link className="nav-link" to="/">
                                    <span className="nav-link-text" >Home</span>
                                </Link>
                    </li>
                      <li className="nav-item dropdown">
                          <a className="nav-link nav-link-collapse collapsed" role="button"
                             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Enunciados-Profesor
                          </a>
                          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                              <Link className="dropdown-item"  to={{pathname:'/Enunciado', state:{ padre:2}}} onClick={this.handleRefresh}>Lista de Enunciados</Link>
                              <Link className="dropdown-item" to="/NewExcercise">Agregar Enunciado</Link>
                          </div>
                      </li>
                      <li className="nav-item" data-toggle="tooltip" data-placement="right">
                            <Link className="nav-link" to={{pathname:'/Enunciado', state:{ padre:1}}} onClick={this.handleRefresh}>
                                <span className="nav-link-text">Enunciados-Alumnos</span>
                            </Link>
                    </li>
                      <li className="nav-item dropdown">
                          <a className="nav-link nav-link-collapse collapsed" role="button"
                             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Consola Libre
                          </a>
                          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                              <Link className="dropdown-item" to={{pathname:'/Console/python',state:{lenguaje:1} }}>Python</Link>
                              <Link className="dropdown-item" to={{pathname:'/Console/C',state:{lenguaje:3} }}>C</Link>
                              <Link className="dropdown-item" to={{pathname:'/Console/Java',state:{lenguaje:2} }}>Java</Link>
                          </div>
                      </li>
                  </ul>
                  <ul className="navbar-nav sidenav-toggler">
                      <li className="nav-item">
                          <a className="nav-link text-center" id="sidenavToggler">
                              <i className="fa fa-fw fa-angle-left"></i>
                          </a>
                      </li>
                  </ul>
                  <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                          <a className="nav-link" >
                              <i className="fa fa-fw fa-sign-in"></i>Login</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link">
                              <i className="fa fa-fw fa-sign-out"></i>Logout</a>
                      </li>
                  </ul>
              </div>
        </nav>

            
            
        
            
        );   
    }
}

export default Header;