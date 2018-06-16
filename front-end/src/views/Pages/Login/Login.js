import React, { Component } from 'react';
import { Button, Card, Row, CardHeader, CardBody, CardGroup, Col, Container, Input, Modal, ModalBody, ModalFooter, ModalHeader, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import  { Redirect, Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login-component';
import Axios from 'axios';
import fondo from '../../../assets/img/imagenInicio.jpg';
class Login extends Component {

   constructor (props, context) {
    super(props, context);
      this.state ={
        token:"",
        mail:"",//
        user:"",
        correo:"",
        info: false,
        warning: false,
      };
    this.responseGoogle = this.responseGoogle.bind(this);
    this.getMail= this.getMail.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.toggleWarning = this.toggleWarning.bind(this);
    this.filtrarMail = this.filtrarMail.bind(this);
    this.comprobarMail = this.comprobarMail.bind(this);
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
          console.log("lala");
            console.log(Response);
        }
        ).catch(function(error){
            console.log(error);
        });
    };

  comprobarMail(){
    Axios.get('http://localhost:8082/user') //mails
        .then(response=>{
          var respuesta = response.data.result;
          var validador = false;
          for (var usuario in respuesta) {
            if (usuario.mail == this.state.mail) {
              validador = true;
            }
            
          }
          return validador; 
        })

        .catch(function(error){
            console.log(error);
        });
  };


  responseGoogle (googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var googleId = googleUser.getId();


    this.setState({
        token:id_token
    });

    this.getMail();
    //console.log({ googleId });
    //console.log({accessToken: id_token});
    console.log(googleUser);
    var mailUsuario = googleUser.w3.U3;
    var nombreUsuario = googleUser.w3.ig;
    this.setState({
      mail:mailUsuario,
      user:nombreUsuario
    });
    this.filtrarMail();
  }     

  filtrarMail(){

    var mailUsuario = this.state.mail;
    var temp;
    var validador = this.comprobarMail();
    for (var i = 0; i< this.state.mail.length; i++){
      if (mailUsuario[i] == "@") {
        temp = mailUsuario.slice(i,mailUsuario.length);
        if (temp=="@usach.cl") {

          this.toggleInfo();
          /*if (validador) {
            
            this.toggleInfo();
          }else{
            alert('mail no registrado')
          }*/

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
    console.log(temp);
  }


  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            
              <Col md="10">
              <CardGroup>
              ​ <Card className="text-white bg-primary d-md-down-none">
                <img src={fondo} className="img-fluid" alt="..." style={{height:"100%"}}/>
                </Card>
                <Card className="text-white bg-info p-3"  >
                  <CardHeader>
                    <h2 style={{textAlign: "center" }}>Bienvenido a la plataforma</h2>
                  </CardHeader>
                  <CardBody>
                  <br />
                  <br />
                  <br />
                    <div style={{textAlign:"center"}}>
                    
                    <GoogleLogin socialId="171991856415-96dr3egj16vhs32dg4hr2fhbns24bhh3.apps.googleusercontent.com"
                                className="google-login btn-lg btn-dark "
                                scope="profile"
                                fetchBasicProfile={true}
                                style={{size:"lg"}}  
                                responseHandler={this.responseGoogle}
                                buttonText="Ingresar"
                                />

                    </div>

                    <br />
                    <br />
                    <br />

                    <Modal isOpen={this.state.info} toggle={this.toggleInfo}
                                  className={'modal-info ' + this.props.className}>
                      <ModalHeader toggle={this.toggleInfo}>Inicio de sesión</ModalHeader>
                      <ModalBody>
                        Bienvenid@ <strong> {this.state.user}</strong>, su inicio de sesión fue exitoso.
                      </ModalBody>
                      <ModalFooter>
                          <Link to={{
                          pathname: '/dashboard',
                          //state: {  this.props. }
                          }}>
                          <Button color="primary" onClick={this.toggleInfo}>Continuar</Button>
                        </Link>
                      </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.warning} toggle={this.toggleWarning}
                        className={'modal-warning ' + this.props.className}>
                      <ModalHeader toggle={this.toggleWarning}>Inicio de sesión</ModalHeader>
                      <ModalBody>
                        Error en el inicio de seción, utilice correo institucional.
                      </ModalBody>
                      <ModalFooter>
                        <Link to={{
                            pathname: '/Login',
                            //state: {this,props. }
                            }}>
                            <Button color="warning" onClick={this.toggleWarning}>Reintentar</Button>
                          </Link>
                        
                      </ModalFooter>
                    </Modal>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;

