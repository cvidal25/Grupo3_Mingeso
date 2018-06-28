import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';





class DefaultLayout extends Component {
   constructor () {
    super();
    this.state = {
      links: navigation,
      usuario:'',
    };
    this.setUsuario=this.setUsuario.bind(this);
  }

  componentDidMount(){
   this.filtrarLinks(this.props.infoUsuarios.userType);
  }
  

  // Al ejecutar esta funcion desaparecer y aparecen links que
  // el usuario indicado puede acceder.
  filtrarLinks(tipoUsuario){
    let items = navigation.items.filter(function(link){


      if(!link.hasOwnProperty("tipoUsuario")) return true;

      if(link["tipoUsuario"] == tipoUsuario) return true;

      return false;

    });

    this.setState({
      links: { items: items }
    });
  }

  setUsuario(usuario){
    this.setState({
      usuario:usuario
    });
    this.filtrarLinks(usuario.userType);
  }

  render() {
    
    return (
      <div className="app">
        <AppHeader fixed >
          <DefaultHeader setUsuario={this.setUsuario}/>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            
            <AppSidebarNav navConfig={this.state.links}{...this.props} />
            
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                    return route.component ? 
                    (<Route key={idx}
                      path={route.path} 
                      exact={route.exact} 
                      name={route.name} 
                      render={props => (<route.component {...props} /> )} />)
                      : (null);
                  },
                )}
                <Redirect from="/" to="/Login" />

              </Switch>
            </Container>
          </main>
          

        </div>
      
      </div>
    );
  }
}
const mapStateToProps = state =>{
  return{
    infoUsuarios: state.infoUsuarios
  };
};

export default connect(mapStateToProps)(DefaultLayout);
