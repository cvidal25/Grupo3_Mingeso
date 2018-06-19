import React, { Component } from 'react';
import { Button, Card, Row, CardHeader, CardBody, CardGroup, Col, Container, Input, Modal, ModalBody, ModalFooter, ModalHeader, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import  { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login-component';
import Axios from 'axios';
import fondo from '../../../assets/img/imgI3.jpg'; 
import connect from 'react-redux'
import store from '../../../store';



var sectionStyle = {
    width: "100%",
    height: "100%",
    position: "fixed",
    backgroundRepeat: "no-repeat",
    opacity: "0.8",
    backgroundImage: "url(" + fondo + ")"
  };

class Login extends Component {

   constructor (props, context) {
    super(props, context);
      this.state ={
        token:"",
        mail:"",//
        nombreUsuario:"", 
        infoUsuario:{"userID":3,"userName":"Jorge Paredes","userType":3,"userMail":"jorge.paredes@usach.cl","userCareer":"Ingeniería Ejecución en Informática","userCoordination":"A-1"},
        correo:"",
        info: false,
        warning: false,
        tipoUsuario: 1,
      };
    this.responseGoogle = this.responseGoogle.bind(this);
    this.getMail= this.getMail.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.toggleWarning = this.toggleWarning.bind(this);
    this.filtrarMail = this.filtrarMail.bind(this);
    this.comprobarMail = this.comprobarMail.bind(this);
    this.agregarUsuario = this.agregarUsuario.bind(this);
  }


  toggleInfo() {
    this.setState({
      info: !this.state.info,
    });
  }
  toggleWarning() {
    this.setState({
      warning: !this.state.warning,
    });
  }

  getMail(){  
    Axios.get('https://www.googleapis.com/gmail/v1/users/'+this.state.token+'/profile')
        .then(Response =>{
          //console.log("lala");
            console.log(Response);
        }
        ).catch(function(error){
            console.log(error);
        });
    };

  

  responseGoogle (googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var googleId = googleUser.getId();


    this.setState({
        token:id_token
    });

    //this.getMail();
    //console.log({ googleId });
    //console.log({accessToken: id_token});
    //console.log(googleUser);
    var mailUsuario = googleUser.w3.U3;
    var nombreUsuarios = googleUser.w3.ig;
    this.setState({
      mail:mailUsuario,
      nombreUsuario:nombreUsuarios
    });
    this.filtrarMail();
  }     

  filtrarMail(){

    var mailUsuario = this.state.mail;
    var temp;
    for (var i = 0; i< this.state.mail.length; i++){
      if (mailUsuario[i] == "@") {
        temp = mailUsuario.slice(i,mailUsuario.length);
        if (temp=="@usach.cl") {
          this.toggleInfo();

           //var validador = this.comprobarMail();
           /*if(validador){
            this.toggleInfo();

           }
           else{
              this.setState({
                mail:'',
                token:'',
                user:'',
              });
              this.toggleWarning();
            }*/


        //  this.agregarUsuario(this.state.infoUsuario);
         // console.log(this.state.infoUsuario);
          //console.log("yoooooooooooooooooooooo");
         //window.location.replace('http://localhost:3000/dashboard');
        }else{
          this.setState({
            mail:'',
            token:'',
            user:'',
          });
          this.toggleWarning();
          
        }

      }
    }
    //console.log(temp);
  }

  comprobarMail(){
    Axios.get('http://localhost:8082/user/email/'+this.state.mail) //mails
        .then(response=>{
          var respuesta = response.data;
          var validador = false;
          if(respuesta != null ){
            validador= true;
            this.setState({
              infoUsuario:respuesta,
            });
          }
          return validador; 
        })

        .catch(function(error){
            console.log(error);
        });
  };

  render() {
   // console.log(this.state.infoUsuario)
    return (
      <section style={ sectionStyle }>     
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="10">
              <span className="display-3 text-white " style={{textAlign: "center" }} > Bienvenido a la plataforma</span>
              <br />
              <h3 className="text-white " style={{textAlign: "center" }}>Un lugar donde puedes practicar y progresar día a día </h3>
                  <br /><br /><br />
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col md="3">
                <div style={{textAlign:"center"}}>
                      <GoogleLogin socialId="171991856415-96dr3egj16vhs32dg4hr2fhbns24bhh3.apps.googleusercontent.com"
                                   className="google-login btn-lg btn-success btn-block btn-pill  "
                                   scope="profile"
                                   fetchBasicProfile={true}
                                   style={{size:"lg"}}  
                                   responseHandler={this.responseGoogle}
                                   buttonText="Ingresar"
                      />
                </div>
              </Col>
            </Row>
          </Container>


          <Modal isOpen={this.state.info} toggle={this.toggleInfo}
                   className={'modal-info ' + this.props.className}>

            <ModalHeader toggle={this.toggleInfo}>Inicio de sesión</ModalHeader>
            <ModalBody>
              Bienvenid@ <strong> {this.state.nombreUsuario}</strong>, su inicio de sesión fue exitoso.
            </ModalBody>
            <ModalFooter>
              <Link to={{
                pathname: '/dashboard',
                //state: {  this.props. }
              }}>
                <Button color="primary"  onClick={this.toggleInfo}  onClick={() => this.agregarUsuario(this.state.infoUsuario)} 
                >Continuar</Button>
              </Link>
            </ModalFooter>
          </Modal>




          <Modal isOpen={this.state.warning} toggle={this.toggleWarning}
                className={'modal-warning ' + this.props.className}>
            <ModalHeader toggle={this.toggleWarning}>Inicio de sesión</ModalHeader>
            <ModalBody>
              Error en el inicio de sesión, utilice correo institucional.
            </ModalBody>
            <ModalFooter>
              <Link to={{
                pathname: '/Login',
                //state: {this.props. }
              }}>
                <Button color="warning" onClick={this.toggleWarning}>Reintentar</Button>
              </Link>
            </ModalFooter>
          </Modal>
        </div>
      </section>
    );
  }
  agregarUsuario(infoUsuario){
    //console.log(infoUsuario);
      store.dispatch({
      type:"LOG_IN",
      infoUsuario: infoUsuario,
  });
  }
}


export default Login;

